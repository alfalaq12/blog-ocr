"use client";

import { Navbar } from "@/components/landing/Navbar";
import { ApiDocs } from "@/components/landing/ApiDocs";
import { CodeDemo } from "@/components/landing/CodeDemo";
import { Footer } from "@/components/landing/Footer";
import { Providers } from "@/app/providers";

export default function DocsPage() {
    return (
        <Providers>
            <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-white">
                <Navbar />

                <div className="flex flex-col gap-0">
                    <ApiDocs />
                    <CodeDemo />
                </div>

                <Footer />
            </main>
        </Providers>
    );
}
