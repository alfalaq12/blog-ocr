import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    metadataBase: new URL("https://ocr-pur.vercel.app"),
    title: {
        default: "OCR-PUR - API OCR Bertenaga AI untuk Ekstraksi Teks | Kementerian PUPR",
        template: "%s | OCR-PUR"
    },
    description: "OCR-PUR adalah API OCR bertenaga AI dari Kementerian PUPR. Ekstrak teks dari dokumen, struk, KTP, dan tulisan tangan dengan akurasi 99.9%. Gratis untuk developer Indonesia.",
    keywords: [
        "OCR-PUR",
        "OCR PUR",
        "ocr-pur",
        "OCR API Indonesia",
        "OCR Kementerian PUPR",
        "API OCR Gratis",
        "Ekstraksi Teks AI",
        "PaddleOCR Indonesia",
        "Optical Character Recognition",
        "OCR Dokumen Indonesia",
        "OCR KTP",
        "OCR Invoice",
        "Text Recognition API",
        "AI OCR",
        "Machine Learning OCR"
    ],
    authors: [{ name: "Alfalaq", url: "https://github.com/alfalaq12" }, { name: "Kementerian PUPR", url: "https://pu.go.id" }],
    creator: "Alfalaq - Kementerian PUPR",
    publisher: "Kementerian PUPR",
    category: "Technology",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: "/",
        languages: {
            "id-ID": "/",
            "en-US": "/",
        },
    },
    openGraph: {
        title: "OCR-PUR - API OCR Bertenaga AI | Kementerian PUPR",
        description: "Ekstrak teks dari gambar dengan akurasi 99.9%. API OCR gratis untuk developer Indonesia dari Kementerian PUPR.",
        url: "https://ocr-pur.vercel.app",
        siteName: "OCR-PUR",
        images: [
            {
                url: "/images/logo-pupr-new.png",
                width: 1200,
                height: 630,
                alt: "OCR-PUR - API OCR dari Kementerian PUPR",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "OCR-PUR - API OCR Bertenaga AI",
        description: "Ekstrak teks dari gambar dengan akurasi 99.9%. Dari Kementerian PUPR.",
        site: "@kemaborPUPR",
        creator: "@kemenpupr",
        images: ["/images/logo-pupr-new.png"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "google3896f614e89eea30",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" className="dark">
            <body className={clsx(inter.variable, "font-sans antialiased min-h-screen mesh-gradient")}>
                {children}
            </body>
        </html>
    );
}
