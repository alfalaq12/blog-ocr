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
    stats: {
        accuracy: string;
        speed: string;
        users: string;
        uptime: string;
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
    useCases: {
        title: string;
        description: string;
        items: Array<{
            icon: string;
            title: string;
            description: string;
            iconColor: string;
            iconBg: string;
            iconBorder: string;
        }>;
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
    pricing: {
        title: string;
        description: string;
        free: {
            name: string;
            price: string;
            period: string;
            description: string;
            features: string[];
            cta: string;
        };
        pro: {
            name: string;
            price: string;
            period: string;
            description: string;
            features: string[];
            cta: string;
        };
        enterprise: {
            name: string;
            price: string;
            period: string;
            description: string;
            features: string[];
            cta: string;
        };
    };
    testimonials: {
        title: string;
        description: string;
        stats: Array<{
            value: string;
            label: string;
        }>;
        items: Array<{
            name: string;
            role: string;
            company: string;
            content: string;
            rating: number;
            avatar: string;
        }>;
    };
    integrations: {
        title: string;
        description: string;
        items: Array<{
            name: string;
            logo: string;
        }>;
    };
    faq: {
        badge: string;
        title: string;
        description: string;
        items: Array<{
            question: string;
            answer: string;
        }>;
    };
    newsletter: {
        title: string;
        description: string;
        placeholder: string;
        subscribe: string;
        subscribing: string;
        success: string;
        errorInvalid: string;
        privacy: string;
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
        stats: {
            accuracy: "Accuracy",
            speed: "Avg Speed",
            users: "Active Users",
            uptime: "Uptime",
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
        useCases: {
            title: "Built for Every Industry",
            description: "From startups to enterprises, see how teams use OCR-PUR to automate document processing.",
            items: [
                {
                    icon: "invoice",
                    title: "Invoice Processing",
                    description: "Automatically extract line items, totals, and vendor information from invoices and receipts.",
                    iconColor: "text-blue-400",
                    iconBg: "bg-blue-500/10",
                    iconBorder: "border-blue-500/20",
                },
                {
                    icon: "receipt",
                    title: "Expense Management",
                    description: "Digitize receipts and expense reports for seamless accounting and reimbursement workflows.",
                    iconColor: "text-green-400",
                    iconBg: "bg-green-500/10",
                    iconBorder: "border-green-500/20",
                },
                {
                    icon: "id",
                    title: "ID Verification",
                    description: "Extract data from passports, driver licenses, and national IDs for KYC compliance.",
                    iconColor: "text-purple-400",
                    iconBg: "bg-purple-500/10",
                    iconBorder: "border-purple-500/20",
                },
                {
                    icon: "government",
                    title: "Government Documents",
                    description: "Digitize permits, licenses, and official documents for public sector modernization.",
                    iconColor: "text-amber-400",
                    iconBg: "bg-amber-500/10",
                    iconBorder: "border-amber-500/20",
                },
                {
                    icon: "education",
                    title: "Education & Research",
                    description: "Convert textbooks, research papers, and handwritten notes into searchable digital formats.",
                    iconColor: "text-indigo-400",
                    iconBg: "bg-indigo-500/10",
                    iconBorder: "border-indigo-500/20",
                },
                {
                    icon: "healthcare",
                    title: "Healthcare Records",
                    description: "Digitize medical records, prescriptions, and patient forms for better healthcare delivery.",
                    iconColor: "text-red-400",
                    iconBg: "bg-red-500/10",
                    iconBorder: "border-red-500/20",
                },
            ],
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
        pricing: {
            title: "Simple, Transparent Pricing",
            description: "Choose the plan that fits your needs. All plans include our core OCR features.",
            free: {
                name: "Free",
                price: "$0",
                period: "month",
                description: "Perfect for testing and small projects.",
                features: [
                    "1,000 requests/month",
                    "PaddleOCR & Tesseract engines",
                    "Basic support",
                    "99% uptime SLA",
                    "Community access",
                ],
                cta: "Get Started Free",
            },
            pro: {
                name: "Pro",
                price: "$49",
                period: "month",
                description: "For growing businesses and production apps.",
                features: [
                    "50,000 requests/month",
                    "All OCR engines",
                    "Priority support",
                    "99.9% uptime SLA",
                    "Custom dictionary API",
                    "Advanced analytics",
                    "Webhook notifications",
                ],
                cta: "Start Pro Trial",
            },
            enterprise: {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large-scale deployments and custom needs.",
                features: [
                    "Unlimited requests",
                    "Dedicated infrastructure",
                    "24/7 premium support",
                    "99.99% uptime SLA",
                    "Custom model training",
                    "On-premise deployment",
                    "SLA guarantees",
                    "Dedicated account manager",
                ],
                cta: "Contact Sales",
            },
        },
        testimonials: {
            title: "Trusted by Developers Worldwide",
            description: "See what our customers have to say about OCR-PUR.",
            stats: [
                { value: "10,000+", label: "Active Users" },
                { value: "50M+", label: "Documents Processed" },
                { value: "4.9/5", label: "Average Rating" },
            ],
            items: [
                {
                    name: "Ahmad Rizki",
                    role: "Lead Developer",
                    company: "FinTech Startup",
                    content: "OCR-PUR has been a game-changer for our invoice processing. The accuracy is incredible and the API is so easy to integrate.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Sarah Chen",
                    role: "CTO",
                    company: "Healthcare Solutions",
                    content: "We process thousands of medical documents daily. OCR-PUR's reliability and speed have significantly improved our workflow.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Budi Santoso",
                    role: "Software Engineer",
                    company: "E-Commerce Platform",
                    content: "The hybrid engine approach is brilliant. We use PaddleOCR for accuracy-critical tasks and Tesseract for real-time processing.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Maria Garcia",
                    role: "Product Manager",
                    company: "Document Management",
                    content: "Best OCR API we've tried. The custom dictionary feature helped us achieve 99.5% accuracy for our specific use case.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "David Kim",
                    role: "Tech Lead",
                    company: "Government Agency",
                    content: "Security and compliance are critical for us. OCR-PUR's enterprise features and support have been exceptional.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Siti Nurhaliza",
                    role: "Developer",
                    company: "EdTech Startup",
                    content: "The documentation is excellent and the API is very intuitive. We were up and running in less than an hour.",
                    rating: 5,
                    avatar: "",
                },
            ],
        },
        integrations: {
            title: "Integrates with Your Stack",
            description: "Connect OCR-PUR with your favorite tools and platforms.",
            items: [
                { name: "MinIO", logo: "" },
                { name: "AWS S3", logo: "" },
                { name: "Google Cloud", logo: "" },
                { name: "Azure", logo: "" },
                { name: "Zapier", logo: "" },
                { name: "Make", logo: "" },
                { name: "Node.js", logo: "" },
                { name: "Python", logo: "" },
                { name: "Go", logo: "" },
                { name: "PHP", logo: "" },
                { name: "Ruby", logo: "" },
                { name: "Java", logo: "" },
            ],
        },
        faq: {
            badge: "FAQ",
            title: "Frequently Asked Questions",
            description: "Everything you need to know about OCR-PUR.",
            items: [
                {
                    question: "What file formats are supported?",
                    answer: "We support all major image formats including PNG, JPG, JPEG, WEBP, and PDF documents. Maximum file size is 10MB per request.",
                },
                {
                    question: "How accurate is the OCR?",
                    answer: "Our OCR achieves 99.5% accuracy on average. With PaddleOCR engine and custom dictionary training, accuracy can reach up to 99.9% for specific use cases.",
                },
                {
                    question: "What languages are supported?",
                    answer: "We support 100+ languages including English, Indonesian, Chinese, Japanese, Korean, Arabic, and many more. Both printed and handwritten text recognition is available.",
                },
                {
                    question: "Is there a free tier?",
                    answer: "Yes! Our free tier includes 1,000 requests per month with access to both PaddleOCR and Tesseract engines. Perfect for testing and small projects.",
                },
                {
                    question: "How fast is the processing?",
                    answer: "Average processing time is under 1 second per image. Tesseract engine can process in as fast as 0.3 seconds for simple documents.",
                },
                {
                    question: "Can I use it for commercial projects?",
                    answer: "Absolutely! All our plans, including the free tier, can be used for commercial projects. Enterprise plans offer additional features for large-scale deployments.",
                },
                {
                    question: "Do you offer on-premise deployment?",
                    answer: "Yes, on-premise deployment is available for Enterprise customers. Contact our sales team for more information.",
                },
                {
                    question: "What about data privacy and security?",
                    answer: "We take security seriously. All data is encrypted in transit and at rest. We're SOC 2 Type II certified and comply with GDPR. Enterprise plans include additional security features.",
                },
            ],
        },
        newsletter: {
            title: "Stay Updated",
            description: "Get the latest updates on new features, improvements, and OCR best practices.",
            placeholder: "Enter your email",
            subscribe: "Subscribe",
            subscribing: "Subscribing...",
            success: "Successfully subscribed! Check your inbox.",
            errorInvalid: "Please enter a valid email address.",
            privacy: "We respect your privacy. Unsubscribe at any time.",
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
        stats: {
            accuracy: "Akurasi",
            speed: "Kecepatan Rata-rata",
            users: "Pengguna Aktif",
            uptime: "Uptime",
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
        useCases: {
            title: "Dibangun untuk Setiap Industri",
            description: "Dari startup hingga enterprise, lihat bagaimana tim menggunakan OCR-PUR untuk otomasi pemrosesan dokumen.",
            items: [
                {
                    icon: "invoice",
                    title: "Pemrosesan Invoice",
                    description: "Ekstrak otomatis item baris, total, dan informasi vendor dari invoice dan struk.",
                    iconColor: "text-blue-400",
                    iconBg: "bg-blue-500/10",
                    iconBorder: "border-blue-500/20",
                },
                {
                    icon: "receipt",
                    title: "Manajemen Pengeluaran",
                    description: "Digitalisasi struk dan laporan pengeluaran untuk alur kerja akuntansi dan penggantian yang mulus.",
                    iconColor: "text-green-400",
                    iconBg: "bg-green-500/10",
                    iconBorder: "border-green-500/20",
                },
                {
                    icon: "id",
                    title: "Verifikasi Identitas",
                    description: "Ekstrak data dari paspor, SIM, dan KTP untuk kepatuhan KYC.",
                    iconColor: "text-purple-400",
                    iconBg: "bg-purple-500/10",
                    iconBorder: "border-purple-500/20",
                },
                {
                    icon: "government",
                    title: "Dokumen Pemerintah",
                    description: "Digitalisasi izin, lisensi, dan dokumen resmi untuk modernisasi sektor publik.",
                    iconColor: "text-amber-400",
                    iconBg: "bg-amber-500/10",
                    iconBorder: "border-amber-500/20",
                },
                {
                    icon: "education",
                    title: "Pendidikan & Riset",
                    description: "Konversi buku teks, makalah penelitian, dan catatan tulisan tangan ke format digital yang dapat dicari.",
                    iconColor: "text-indigo-400",
                    iconBg: "bg-indigo-500/10",
                    iconBorder: "border-indigo-500/20",
                },
                {
                    icon: "healthcare",
                    title: "Rekam Medis",
                    description: "Digitalisasi rekam medis, resep, dan formulir pasien untuk pelayanan kesehatan yang lebih baik.",
                    iconColor: "text-red-400",
                    iconBg: "bg-red-500/10",
                    iconBorder: "border-red-500/20",
                },
            ],
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
        pricing: {
            title: "Harga yang Sederhana dan Transparan",
            description: "Pilih paket yang sesuai dengan kebutuhan Anda. Semua paket termasuk fitur OCR inti kami.",
            free: {
                name: "Gratis",
                price: "Rp0",
                period: "bulan",
                description: "Sempurna untuk pengujian dan proyek kecil.",
                features: [
                    "1.000 permintaan/bulan",
                    "Engine PaddleOCR & Tesseract",
                    "Dukungan dasar",
                    "SLA uptime 99%",
                    "Akses komunitas",
                ],
                cta: "Mulai Gratis",
            },
            pro: {
                name: "Pro",
                price: "Rp700K",
                period: "bulan",
                description: "Untuk bisnis yang berkembang dan aplikasi produksi.",
                features: [
                    "50.000 permintaan/bulan",
                    "Semua engine OCR",
                    "Dukungan prioritas",
                    "SLA uptime 99.9%",
                    "API kamus kustom",
                    "Analitik lanjutan",
                    "Notifikasi webhook",
                ],
                cta: "Mulai Uji Coba Pro",
            },
            enterprise: {
                name: "Enterprise",
                price: "Kustom",
                period: "",
                description: "Untuk deployment skala besar dan kebutuhan kustom.",
                features: [
                    "Permintaan unlimited",
                    "Infrastruktur dedicated",
                    "Dukungan premium 24/7",
                    "SLA uptime 99.99%",
                    "Pelatihan model kustom",
                    "Deployment on-premise",
                    "Jaminan SLA",
                    "Account manager dedicated",
                ],
                cta: "Hubungi Sales",
            },
        },
        testimonials: {
            title: "Dipercaya oleh Developer di Seluruh Dunia",
            description: "Lihat apa kata pelanggan kami tentang OCR-PUR.",
            stats: [
                { value: "10.000+", label: "Pengguna Aktif" },
                { value: "50M+", label: "Dokumen Diproses" },
                { value: "4.9/5", label: "Rating Rata-rata" },
            ],
            items: [
                {
                    name: "Ahmad Rizki",
                    role: "Lead Developer",
                    company: "FinTech Startup",
                    content: "OCR-PUR telah mengubah cara kami memproses invoice. Akurasinya luar biasa dan API-nya sangat mudah diintegrasikan.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Sarah Chen",
                    role: "CTO",
                    company: "Healthcare Solutions",
                    content: "Kami memproses ribuan dokumen medis setiap hari. Keandalan dan kecepatan OCR-PUR telah meningkatkan alur kerja kami secara signifikan.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Budi Santoso",
                    role: "Software Engineer",
                    company: "E-Commerce Platform",
                    content: "Pendekatan hybrid engine sangat brilian. Kami menggunakan PaddleOCR untuk tugas yang memerlukan akurasi tinggi dan Tesseract untuk pemrosesan real-time.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Maria Garcia",
                    role: "Product Manager",
                    company: "Document Management",
                    content: "API OCR terbaik yang pernah kami coba. Fitur kamus kustom membantu kami mencapai akurasi 99.5% untuk kasus penggunaan spesifik kami.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "David Kim",
                    role: "Tech Lead",
                    company: "Government Agency",
                    content: "Keamanan dan kepatuhan sangat penting bagi kami. Fitur enterprise dan dukungan OCR-PUR sangat luar biasa.",
                    rating: 5,
                    avatar: "",
                },
                {
                    name: "Siti Nurhaliza",
                    role: "Developer",
                    company: "EdTech Startup",
                    content: "Dokumentasinya sangat bagus dan API-nya sangat intuitif. Kami bisa langsung berjalan dalam waktu kurang dari satu jam.",
                    rating: 5,
                    avatar: "",
                },
            ],
        },
        integrations: {
            title: "Terintegrasi dengan Stack Anda",
            description: "Hubungkan OCR-PUR dengan tools dan platform favorit Anda.",
            items: [
                { name: "MinIO", logo: "" },
                { name: "AWS S3", logo: "" },
                { name: "Google Cloud", logo: "" },
                { name: "Azure", logo: "" },
                { name: "Zapier", logo: "" },
                { name: "Make", logo: "" },
                { name: "Node.js", logo: "" },
                { name: "Python", logo: "" },
                { name: "Go", logo: "" },
                { name: "PHP", logo: "" },
                { name: "Ruby", logo: "" },
                { name: "Java", logo: "" },
            ],
        },
        faq: {
            badge: "FAQ",
            title: "Pertanyaan yang Sering Diajukan",
            description: "Semua yang perlu Anda ketahui tentang OCR-PUR.",
            items: [
                {
                    question: "Format file apa saja yang didukung?",
                    answer: "Kami mendukung semua format gambar utama termasuk PNG, JPG, JPEG, WEBP, dan dokumen PDF. Ukuran file maksimum adalah 10MB per permintaan.",
                },
                {
                    question: "Seberapa akurat OCR-nya?",
                    answer: "OCR kami mencapai akurasi 99.5% rata-rata. Dengan engine PaddleOCR dan pelatihan kamus kustom, akurasi dapat mencapai hingga 99.9% untuk kasus penggunaan spesifik.",
                },
                {
                    question: "Bahasa apa saja yang didukung?",
                    answer: "Kami mendukung 100+ bahasa termasuk Inggris, Indonesia, Mandarin, Jepang, Korea, Arab, dan banyak lagi. Pengenalan teks cetak dan tulisan tangan tersedia.",
                },
                {
                    question: "Apakah ada tier gratis?",
                    answer: "Ya! Tier gratis kami mencakup 1.000 permintaan per bulan dengan akses ke engine PaddleOCR dan Tesseract. Sempurna untuk pengujian dan proyek kecil.",
                },
                {
                    question: "Seberapa cepat pemrosesannya?",
                    answer: "Waktu pemrosesan rata-rata kurang dari 1 detik per gambar. Engine Tesseract dapat memproses secepat 0.3 detik untuk dokumen sederhana.",
                },
                {
                    question: "Bisakah saya menggunakannya untuk proyek komersial?",
                    answer: "Tentu saja! Semua paket kami, termasuk tier gratis, dapat digunakan untuk proyek komersial. Paket Enterprise menawarkan fitur tambahan untuk deployment skala besar.",
                },
                {
                    question: "Apakah Anda menawarkan deployment on-premise?",
                    answer: "Ya, deployment on-premise tersedia untuk pelanggan Enterprise. Hubungi tim sales kami untuk informasi lebih lanjut.",
                },
                {
                    question: "Bagaimana dengan privasi dan keamanan data?",
                    answer: "Kami sangat serius soal keamanan. Semua data dienkripsi saat transit dan saat disimpan. Kami bersertifikat SOC 2 Type II dan mematuhi GDPR. Paket Enterprise mencakup fitur keamanan tambahan.",
                },
            ],
        },
        newsletter: {
            title: "Tetap Update",
            description: "Dapatkan update terbaru tentang fitur baru, peningkatan, dan praktik terbaik OCR.",
            placeholder: "Masukkan email Anda",
            subscribe: "Berlangganan",
            subscribing: "Berlangganan...",
            success: "Berhasil berlangganan! Cek inbox Anda.",
            errorInvalid: "Mohon masukkan alamat email yang valid.",
            privacy: "Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.",
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
    const [language, setLanguage] = useState<Language>("id");

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
