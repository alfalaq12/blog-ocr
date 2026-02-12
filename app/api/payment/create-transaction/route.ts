import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { PRICING, generateOrderId, MIDTRANS_CONFIG } from "@/lib/midtrans";

export async function POST(req: NextRequest) {
    try {
        const { plan, billingCycle } = await req.json();

        // Validate plan
        if (plan !== "pro") {
            return NextResponse.json(
                { error: "Invalid plan" },
                { status: 400 }
            );
        }

        // Get user from session
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "Unauthorized. Please login first." },
                { status: 401 }
            );
        }

        // Get pricing
        const pricing = billingCycle === "yearly"
            ? PRICING.pro.yearly
            : PRICING.pro.monthly;

        const orderId = generateOrderId(user.id, `${plan}-${billingCycle}`);

        // Create Midtrans transaction
        // Using dynamic import for CommonJS module
        const midtransClient = await import("midtrans-client");
        const snap = new midtransClient.Snap({
            isProduction: MIDTRANS_CONFIG.isProduction,
            serverKey: MIDTRANS_CONFIG.serverKey,
            clientKey: MIDTRANS_CONFIG.clientKey,
        });

        const transactionDetails = {
            transaction_details: {
                order_id: orderId,
                gross_amount: pricing.price,
            },
            customer_details: {
                email: user.email,
                first_name: user.user_metadata?.full_name?.split(" ")[0] || "User",
                last_name: user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "",
            },
            item_details: [
                {
                    id: `${plan}-${billingCycle}`,
                    price: pricing.price,
                    quantity: 1,
                    name: pricing.name,
                },
            ],
            callbacks: {
                finish: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ocr-pur.vercel.app"}/payment/success`,
            },
        };

        const transaction = await snap.createTransaction(transactionDetails);

        // Save payment record to database
        const { error: insertError } = await supabase.from("payments").insert({
            user_id: user.id,
            order_id: orderId,
            amount: pricing.price,
            status: "pending",
            plan: plan,
        });

        if (insertError) {
            console.error("Error saving payment:", insertError);
        }

        return NextResponse.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            order_id: orderId,
        });
    } catch (error: any) {
        console.error("Payment creation error:", error);
        return NextResponse.json(
            { error: "Failed to create transaction", details: error.message },
            { status: 500 }
        );
    }
}
