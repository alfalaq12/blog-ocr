import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: {
        default: "OCR-PUR - Extract Intelligence from Any Image | Kementerian PUPR",
        template: "%s | OCR-PUR"
    },
    description: "The developer-first OCR API trusted by Kementerian PUPR. Turn documents, receipts, and handwritten notes into structured data with 99.9% accuracy.",
    keywords: ["OCR", "PUPR", "OCR-PUR", "Kementerian PUPR", "OCR API", "Optical Character Recognition", "Indonesia", "AI Text Extraction"],
    authors: [{ name: "Alfalaq" }, { name: "Kementerian PUPR" }],
    creator: "Alfalaq",
    publisher: "Kementerian PUPR",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "OCR-PUR - Extract Intelligence from Any Image",
        description: "The developer-first OCR API. Turn documents, receipts, and handwritten notes into structured data.",
        url: "https://ocr-pur.vercel.app",
        siteName: "OCR-PUR",
        images: [
            {
                url: "/og-image.jpg", // We should probably add an OG image task later or use a placeholder
                width: 1200,
                height: 630,
                alt: "OCR-PUR Dashboard",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "OCR-PUR - AI Powered OCR",
        description: "Extract intelligence from any image. Trusted by Kementerian PUPR.",
        creator: "@kemenpupr", // Assuming handle
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={clsx(inter.variable, "font-sans antialiased min-h-screen mesh-gradient")}>
                {children}
            </body>
        </html>
    );
}
