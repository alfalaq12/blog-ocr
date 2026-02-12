import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const OCR_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ADMIN_MASTER_KEY = process.env.ADMIN_MASTER_KEY;

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is pro subscriber
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("subscription_tier, ocr_api_key, email, full_name")
            .eq("id", user.id)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        if (profile.subscription_tier !== "pro") {
            return NextResponse.json({ error: "Pro subscription required" }, { status: 403 });
        }

        // If user already has API key, return it
        if (profile.ocr_api_key) {
            return NextResponse.json({
                api_key: profile.ocr_api_key,
                message: "API key already exists"
            });
        }

        // Generate new API key via OCR backend
        if (!ADMIN_MASTER_KEY) {
            console.error("ADMIN_MASTER_KEY not configured");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const keyName = profile.full_name || profile.email || `user_${user.id.substring(0, 8)}`;

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

        if (!ocrResponse.ok) {
            const errorData = await ocrResponse.json();
            console.error("OCR API error:", errorData);
            return NextResponse.json({ error: "Failed to generate API key" }, { status: 500 });
        }

        const keyData = await ocrResponse.json();

        // Store API key in profiles
        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                ocr_api_key: keyData.api_key,
                ocr_api_key_id: keyData.id,
                updated_at: new Date().toISOString()
            })
            .eq("id", user.id);

        if (updateError) {
            console.error("Error storing API key:", updateError);
            return NextResponse.json({ error: "Failed to store API key" }, { status: 500 });
        }

        return NextResponse.json({
            api_key: keyData.api_key,
            message: "API key generated successfully"
        });

    } catch (error: any) {
        console.error("Generate API key error:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}
