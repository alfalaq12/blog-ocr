"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Playground } from "@/components/landing/Playground";
import { Features } from "@/components/landing/Features";
import { CodeDemo } from "@/components/landing/CodeDemo";
import { ApiDocs } from "@/components/landing/ApiDocs";
import { Footer } from "@/components/landing/Footer";
import { LanguageProvider } from "@/lib/i18n";

export default function Home() {
    return (
        <LanguageProvider>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "OCR-PUR",
                        "applicationCategory": "UtilitiesApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "IDR",
                        },
                        "description": "API OCR bertenaga AI untuk ekstraksi teks dari gambar dan dokumen dengan akurasi tinggi.",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "ratingCount": "1024"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Kementerian PUPR"
                        }
                    }),
                }}
            />
            <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-white">
                <Navbar />

                <div className="flex flex-col gap-0">
                    <Hero />
                    <Features />
                    <ApiDocs />
                    <Playground />
                    <CodeDemo />
                </div>

                <Footer />
            </main>
        </LanguageProvider>
    );
}
