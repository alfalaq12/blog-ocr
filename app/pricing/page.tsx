"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { Providers } from "@/app/providers";

export default function PricingPage() {
    return (
        <Providers>
            <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-white">
                <Navbar />

                <div className="flex flex-col gap-0">
                    <Pricing />
                </div>

                <Footer />
            </main>
        </Providers>
    );
}
