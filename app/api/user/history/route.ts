import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const OCR_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user profile with API key
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("ocr_api_key, subscription_tier")
            .eq("id", user.id)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        if (profile.subscription_tier !== "pro" || !profile.ocr_api_key) {
            return NextResponse.json({
                history: [],
                message: "No active subscription or API key"
            });
        }

        // Fetch request history from OCR backend
        const historyResponse = await fetch(`${OCR_API_BASE_URL}/api/ocr/history`, {
            headers: {
                "X-API-Key": profile.ocr_api_key
            }
        });

        if (!historyResponse.ok) {
            return NextResponse.json({
                history: [],
                message: "Could not fetch history from OCR API"
            });
        }

        const history = await historyResponse.json();

        return NextResponse.json({
            history,
            message: "History fetched successfully"
        });

    } catch (error: any) {
        console.error("Fetch history error:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}
