"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Playground } from "@/components/landing/Playground";
import { Features } from "@/components/landing/Features";
import { UseCases } from "@/components/landing/UseCases";
import { CodeDemo } from "@/components/landing/CodeDemo";
import { ApiDocs } from "@/components/landing/ApiDocs";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { Integrations } from "@/components/landing/Integrations";
import { FAQ } from "@/components/landing/FAQ";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";
import { LanguageProvider } from "@/lib/i18n";

// Comprehensive JSON-LD Schema for SEO
const jsonLdSchemas = {
    // WebSite schema with SearchAction for potential sitelinks search box
    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://ocr-pur.vercel.app/#website",
        "url": "https://ocr-pur.vercel.app",
        "name": "OCR-PUR",
        "description": "API OCR bertenaga AI untuk ekstraksi teks dari gambar dan dokumen",
        "publisher": {
            "@id": "https://ocr-pur.vercel.app/#organization"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://ocr-pur.vercel.app/?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        },
        "inLanguage": ["id-ID", "en-US"]
    },
    // Organization schema for branding
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://ocr-pur.vercel.app/#organization",
        "name": "OCR-PUR",
        "alternateName": ["OCR PUR", "ocr-pur", "OCRPUR"],
        "url": "https://ocr-pur.vercel.app",
        "logo": {
            "@type": "ImageObject",
            "url": "https://ocr-pur.vercel.app/images/logo-pupr-new.png",
            "width": 512,
            "height": 512
        },
        "sameAs": [
            "https://github.com/alfalaq12/ocr-pur"
        ],
        "parentOrganization": {
            "@type": "GovernmentOrganization",
            "name": "Kementerian Pekerjaan Umum dan Perumahan Rakyat",
            "alternateName": "Kementerian PUPR",
            "url": "https://pu.go.id"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "technical support",
            "availableLanguage": ["Indonesian", "English"]
        }
    },
    // SoftwareApplication schema
    softwareApplication: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://ocr-pur.vercel.app/#software",
        "name": "OCR-PUR",
        "alternateName": ["OCR PUR", "ocr-pur"],
        "applicationCategory": "DeveloperApplication",
        "applicationSubCategory": "API",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "IDR",
            "availability": "https://schema.org/InStock"
        },
        "description": "API OCR bertenaga AI untuk ekstraksi teks dari gambar dan dokumen dengan akurasi tinggi. Mendukung PaddleOCR dan Tesseract engine.",
        "featureList": [
            "99.9% akurasi ekstraksi teks",
            "Dual engine: PaddleOCR & Tesseract",
            "Mendukung 100+ bahasa",
            "Custom dictionary API",
            "Integrasi MinIO S3",
            "API key management",
            "Webhook notifications"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1024",
            "bestRating": "5"
        },
        "publisher": {
            "@id": "https://ocr-pur.vercel.app/#organization"
        }
    },
    // FAQPage schema for rich snippets
    faqPage: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://ocr-pur.vercel.app/#faq",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Format file apa saja yang didukung OCR-PUR?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kami mendukung semua format gambar utama termasuk PNG, JPG, JPEG, WEBP, dan dokumen PDF. Ukuran file maksimum adalah 10MB per permintaan."
                }
            },
            {
                "@type": "Question",
                "name": "Seberapa akurat OCR-PUR?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "OCR kami mencapai akurasi 99.5% rata-rata. Dengan engine PaddleOCR dan pelatihan kamus kustom, akurasi dapat mencapai hingga 99.9% untuk kasus penggunaan spesifik."
                }
            },
            {
                "@type": "Question",
                "name": "Bahasa apa saja yang didukung OCR-PUR?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kami mendukung 100+ bahasa termasuk Inggris, Indonesia, Mandarin, Jepang, Korea, Arab, dan banyak lagi. Pengenalan teks cetak dan tulisan tangan tersedia."
                }
            },
            {
                "@type": "Question",
                "name": "Apakah OCR-PUR gratis?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ya! Tier gratis kami mencakup 1.000 permintaan per bulan dengan akses ke engine PaddleOCR dan Tesseract. Sempurna untuk pengujian dan proyek kecil."
                }
            },
            {
                "@type": "Question",
                "name": "Seberapa cepat pemrosesan OCR-PUR?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Waktu pemrosesan rata-rata kurang dari 1 detik per gambar. Engine Tesseract dapat memproses secepat 0.3 detik untuk dokumen sederhana."
                }
            },
            {
                "@type": "Question",
                "name": "Bisakah menggunakan OCR-PUR untuk proyek komersial?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tentu saja! Semua paket kami, termasuk tier gratis, dapat digunakan untuk proyek komersial. Paket Enterprise menawarkan fitur tambahan untuk deployment skala besar."
                }
            },
            {
                "@type": "Question",
                "name": "Bagaimana dengan keamanan data di OCR-PUR?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Kami sangat serius soal keamanan. Semua data dienkripsi saat transit dan saat disimpan. Kami bersertifikat SOC 2 Type II dan mematuhi GDPR."
                }
            }
        ]
    }
};

export default function Home() {
    return (
        <LanguageProvider>
            {/* WebSite Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdSchemas.website),
                }}
            />
            {/* Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdSchemas.organization),
                }}
            />
            {/* SoftwareApplication Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdSchemas.softwareApplication),
                }}
            />
            {/* FAQPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdSchemas.faqPage),
                }}
            />
            <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-white">
                <Navbar />

                <div className="flex flex-col gap-0">
                    <Hero />
                    <Stats />
                    <Features />
                    <UseCases />
                    <ApiDocs />
                    <Playground />
                    <CodeDemo />
                    <Pricing />
                    <Testimonials />
                    <Integrations />
                    <FAQ />
                    <Newsletter />
                </div>

                <Footer />
            </main>
        </LanguageProvider>
    );
}
