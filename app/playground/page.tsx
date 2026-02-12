"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Playground } from "@/components/landing/Playground";
import { Footer } from "@/components/landing/Footer";
import { Providers } from "@/app/providers";

export default function PlaygroundPage() {
    return (
        <Providers>
            <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-white">
                <Navbar />

                <div className="flex flex-col gap-0">
                    <Playground />
                </div>

                <Footer />
            </main>
        </Providers>
    );
}
