import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { PRICING } from "@/lib/midtrans";
import crypto from "crypto";

// Verify Midtrans signature
function verifySignature(orderId: string, statusCode: string, grossAmount: string, serverKey: string, signatureKey: string): boolean {
    const payload = orderId + statusCode + grossAmount + serverKey;
    const expectedSignature = crypto.createHash("sha512").update(payload).digest("hex");
    return expectedSignature === signatureKey;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            order_id,
            status_code,
            gross_amount,
            signature_key,
            transaction_status,
            fraud_status,
            payment_type,
            transaction_id,
        } = body;

        // Verify signature
        const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
        const isValid = verifySignature(order_id, status_code, gross_amount, serverKey, signature_key);

        if (!isValid) {
            console.error("Invalid Midtrans signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
        }

        const supabase = await createClient();

        // Get payment record
        const { data: payment, error: fetchError } = await supabase
            .from("payments")
            .select("*")
            .eq("order_id", order_id)
            .single();

        if (fetchError || !payment) {
            console.error("Payment not found:", order_id);
            return NextResponse.json({ error: "Payment not found" }, { status: 404 });
        }

        // Determine new status based on transaction_status
        let newStatus = "pending";
        let shouldActivateSubscription = false;

        if (transaction_status === "capture" || transaction_status === "settlement") {
            if (fraud_status === "accept" || !fraud_status) {
                newStatus = "success";
                shouldActivateSubscription = true;
            }
        } else if (transaction_status === "pending") {
            newStatus = "pending";
        } else if (
            transaction_status === "deny" ||
            transaction_status === "cancel" ||
            transaction_status === "expire"
        ) {
            newStatus = "failed";
        } else if (transaction_status === "refund" || transaction_status === "partial_refund") {
            newStatus = "refunded";
        }

        // Update payment record
        const { error: updatePaymentError } = await supabase
            .from("payments")
            .update({
                status: newStatus,
                midtrans_transaction_id: transaction_id,
                payment_type: payment_type,
                updated_at: new Date().toISOString(),
            })
            .eq("order_id", order_id);

        if (updatePaymentError) {
            console.error("Error updating payment:", updatePaymentError);
        }

        // Activate subscription if payment successful
        if (shouldActivateSubscription) {
            // Determine subscription duration based on plan
            const isYearly = order_id.includes("YEARLY");
            const duration = isYearly ? PRICING.pro.yearly.duration : PRICING.pro.monthly.duration;

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + duration);

            // Get user profile for API key generation
            const { data: profile } = await supabase
                .from("profiles")
                .select("email, full_name, ocr_api_key")
                .eq("id", payment.user_id)
                .single();

            // Generate API key via OCR backend if user doesn't have one
            let ocrApiKey = profile?.ocr_api_key;
            let ocrApiKeyId = null;

            if (!ocrApiKey) {
                const OCR_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
                const ADMIN_MASTER_KEY = process.env.ADMIN_MASTER_KEY;

                if (ADMIN_MASTER_KEY && OCR_API_BASE_URL) {
                    try {
                        const keyName = profile?.full_name || profile?.email || `user_${payment.user_id.substring(0, 8)}`;

                        const ocrResponse = await fetch(`${OCR_API_BASE_URL}/api/admin/keys`, {
                            method: "POST",
                            headers: {
                                "X-Admin-Key": ADMIN_MASTER_KEY,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name: keyName,
                                is_admin: false
                            })
                        });

                        if (ocrResponse.ok) {
                            const keyData = await ocrResponse.json();
                            ocrApiKey = keyData.api_key;
                            ocrApiKeyId = keyData.id;
                            console.log("API key generated for user:", payment.user_id);
                        } else {
                            console.error("Failed to generate API key from OCR backend");
                        }
                    } catch (apiKeyError) {
                        console.error("Error generating API key:", apiKeyError);
                    }
                } else {
                    console.warn("ADMIN_MASTER_KEY or OCR_API_BASE_URL not configured");
                }
            }

            const { error: updateProfileError } = await supabase
                .from("profiles")
                .update({
                    subscription_tier: "pro",
                    subscription_expires_at: expiresAt.toISOString(),
                    scan_count: 0, // Reset scan count
                    ocr_api_key: ocrApiKey,
                    ocr_api_key_id: ocrApiKeyId,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", payment.user_id);

            if (updateProfileError) {
                console.error("Error updating profile:", updateProfileError);
            }
        }

        return NextResponse.json({ success: true, status: newStatus });
    } catch (error: any) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed", details: error.message },
            { status: 500 }
        );
    }
}
