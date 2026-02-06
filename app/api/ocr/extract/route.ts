
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://117.53.44.215:8000";

        const response = await fetch(`${backendUrl}/api/ocr/extract`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            { error: "Failed to connect to backend", details: error.message },
            { status: 500 }
        );
    }
}
