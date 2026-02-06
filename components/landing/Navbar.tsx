"use client";

import { Button } from "@/components/ui/Button";
import { Github, ScanText, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "id" : "en");
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-white/5"
        >
            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] pointer-events-none" />

            <div className="flex h-14 items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <ScanText className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white/90">OCR-PUR</span>
                </div>

                <div className="hidden items-center gap-8 md:flex absolute left-1/2 -translate-x-1/2">
                    <Link href="#features" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.features}
                    </Link>
                    <Link href="#api" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.api}
                    </Link>
                    <Link href="#pricing" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.pricing}
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-3 h-8 text-xs font-medium"
                    >
                        <Globe className="mr-1.5 h-3.5 w-3.5" />
                        {language.toUpperCase()}
                    </Button>

                    <Link href="https://github.com/alfalaq12/OCR" target="_blank">
                        <Button className="gap-2 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] h-8 px-4 text-xs font-semibold text-white">
                            <Github className="h-3.5 w-3.5" />
                            <span>{t.nav.star}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
