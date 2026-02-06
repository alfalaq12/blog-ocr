"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

type Translations = {
    nav: {
        features: string;
        api: string;
        pricing: string;
        signIn: string;
        star: string;
    };
    hero: {
        badge: string;
        headline: string;
        headlineHighlight: string;
        subhead: string;
        getStarted: string;
        viewDemo: string;
        trustedBy: string;
    };
    playground: {
        title: string;
        description: string;
        uploadTitle: string;
        uploadDesc: string;
        select: string;
        analyzing: string;
        analyzed: string;
        waiting: string;
    };
    features: {
        badge: string;
        title: string;
        description: string;
        learningTitle: string;
        learningDesc: string;
        engineTitle: string;
        engineDesc: string;
        minioTitle: string;
        minioDesc: string;
        securityTitle: string;
        securityDesc: string;
    };
    code: {
        title: string;
        description: string;
        features: string[];
        comments: {
            init: string;
            extract: string;
        };
    };
    footer: {
        privacy: string;
        terms: string;
        rights: string;
    };
};

const translations: Record<Language, Translations> = {
    en: {
        nav: {
            features: "Features",
            api: "API Docs",
            pricing: "Pricing",
            signIn: "Sign In",
            star: "Star on GitHub",
        },
        hero: {
            badge: "v2.0 is now live",
            headline: "Extract Intelligence",
            headlineHighlight: "from Any Image",
            subhead: "The developer-first OCR API. Turn documents, receipts, and handwritten notes into structured data with 99.9% accuracy and sub-second latency.",
            getStarted: "Get Started",
            viewDemo: "View Demo",
            trustedBy: "Trusted by:",
        },
        playground: {
            title: "Try it yourself",
            description: "Drag and drop an image to see the API in action.",
            uploadTitle: "Upload an image",
            uploadDesc: "PNG, JPG up to 10MB",
            select: "Select Image",
            analyzing: "Analyzing...",
            analyzed: "Analyzed",
            waiting: "Waiting for input...",
        },
        features: {
            badge: "Capabilities",
            title: "Designed for Developers",
            description: "Powerful features extracted directly from our core engine.",
            learningTitle: "Smart Learning System",
            learningDesc: "Self-improving OCR that learns from your corrections using our custom dictionary API. The accuracy grows with your data.",
            engineTitle: "Hybrid Engine Architecture",
            engineDesc: "Choose the right tool for the job. Switch between PaddleOCR for maximum accuracy or Tesseract for ultra-low latency.",
            minioTitle: "MinIO Integration",
            minioDesc: "Process documents directly from your MinIO S3 buckets without file upload overhead.",
            securityTitle: "Enterprise Security",
            securityDesc: "Role-based API key management and granular usage tracking built-in.",
        },
        code: {
            title: "Integrated in minutes",
            description: "Our libraries are designed to be intuitive and easy to use. Get started with just a few lines of code.",
            features: ["99.9% Uptime SLA", "SOC 2 Type II Certified", "Volume Discounts", "24/7 Support"],
            comments: {
                init: "// Initialize client",
                extract: "// Extract text from image",
            },
        },
        footer: {
            privacy: "Privacy",
            terms: "Terms",
            rights: "All rights reserved.",
        },
    },
    id: {
        nav: {
            features: "Fitur",
            api: "Dokumentasi API",
            pricing: "Harga",
            signIn: "Masuk",
            star: "Bintang di GitHub",
        },
        hero: {
            badge: "v2.0 kini tersedia",
            headline: "Ekstrak Intelegensi",
            headlineHighlight: "dari Gambar Apapun",
            subhead: "API OCR untuk developer. Ubah dokumen, struk, dan tulisan tangan menjadi data terstruktur dengan akurasi 99.9% dan latensi ultra-rendah.",
            getStarted: "Mulai Sekarang",
            viewDemo: "Lihat Demo",
            trustedBy: "Dipercaya oleh:",
        },
        playground: {
            title: "Coba sendiri",
            description: "Unggah gambar untuk melihat cara kerja API.",
            uploadTitle: "Unggah gambar",
            uploadDesc: "PNG, JPG hingga 10MB",
            select: "Pilih Gambar",
            analyzing: "Menganalisis...",
            analyzed: "Selesai",
            waiting: "Menunggu masukan...",
        },
        features: {
            badge: "Kapabilitas",
            title: "Didesain untuk Developer",
            description: "Fitur canggih yang diekstrak langsung dari core engine kami.",
            learningTitle: "Sistem Belajar Cerdas",
            learningDesc: "OCR yang belajar mandiri dari koreksi Anda menggunakan custom dictionary API. Akurasi meningkat seiring penggunaan data.",
            engineTitle: "Arsitektur Hybrid Engine",
            engineDesc: "Pilih alat yang tepat. Gunakan PaddleOCR untuk akurasi maksimal atau Tesseract untuk latensi super rendah.",
            minioTitle: "Integrasi MinIO",
            minioDesc: "Proses dokumen langsung dari bucket MinIO S3 Anda tanpa perlu upload file manual.",
            securityTitle: "Keamanan Enterprise",
            securityDesc: "Manajemen API key berbasis role dan pelacakan penggunaan yang terintegrasi.",
        },
        code: {
            title: "Integrasi dalam hitungan menit",
            description: "Library kami dirancang agar intuitif dan mudah digunakan. Mulai hanya dengan beberapa baris kode.",
            features: ["SLA Uptime 99.9%", "Sertifikasi SOC 2 Tipe II", "Diskon Volume", "Dukungan 24/7"],
            comments: {
                init: "// Inisialisasi klien",
                extract: "// Ekstrak teks dari gambar",
            },
        },
        footer: {
            privacy: "Privasi",
            terms: "Ketentuan",
            rights: "Hak cipta dilindungi.",
        },
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translations[language],
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
