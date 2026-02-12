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
                stats: null,
                message: "No active subscription or API key"
            });
        }

        // Fetch stats from OCR backend
        const statsResponse = await fetch(`${OCR_API_BASE_URL}/api/ocr/stats`, {
            headers: {
                "X-API-Key": profile.ocr_api_key
            }
        });

        if (!statsResponse.ok) {
            // Return empty stats if fetch fails
            return NextResponse.json({
                stats: {
                    total_requests: 0,
                    successful_requests: 0,
                    failed_requests: 0,
                    total_pages_processed: 0,
                    avg_processing_time_ms: 0
                },
                message: "Could not fetch stats from OCR API"
            });
        }

        const stats = await statsResponse.json();

        return NextResponse.json({
            stats,
            message: "Stats fetched successfully"
        });

    } catch (error: any) {
        console.error("Fetch stats error:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}
