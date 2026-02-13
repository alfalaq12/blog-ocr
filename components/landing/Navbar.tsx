"use client";

import { Button } from "@/components/ui/Button";
import { Github, ScanText, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { AuthButton } from "@/components/auth/AuthButton";
import { UserDropdown } from "@/components/auth/UserDropdown";
import { useToast } from "@/components/ui/Toast";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const { user, loading } = useAuth();
    const { showToast } = useToast();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "id" : "en");
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-white/5"
        >
            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] pointer-events-none" />

            <div className="flex h-12 items-center px-4 sm:px-5">
                {/* Logo - fixed width */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <ScanText className="h-4 w-4" />
                    </div>
                    <span className="text-base font-bold tracking-tight text-white/90 whitespace-nowrap">OCR-PUR</span>
                </div>

                {/* Nav Links - centered with flex-1 */}
                <div className="hidden lg:flex items-center justify-center gap-4 flex-1 max-w-md mx-auto">
                    <Link href="/" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.home}
                    </Link>
                    <Link href="/playground" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.playground}
                    </Link>
                    <Link href="/docs" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.api}
                    </Link>
                    <Link href="/pricing" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.pricing}
                    </Link>
                    <Link href="/integrations" className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {t.nav.integrations}
                    </Link>
                    {user && (
                        <button
                            onClick={() => showToast("Fitur Dashboard sedang dalam tahap pengembangan 🚧", "info")}
                            className="text-xs font-medium text-purple-400 transition-colors hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] bg-transparent border-none cursor-pointer"
                        >
                            {t.nav.dashboard}
                        </button>
                    )}
                </div>

                {/* Right Side - fixed width */}
                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-2.5 h-7 text-xs font-medium"
                    >
                        <Globe className="mr-1 h-3 w-3" />
                        {language.toUpperCase()}
                    </Button>

                    <Link href="https://github.com/alfalaq12/OCR" target="_blank" className="hidden md:block">
                        <Button className="gap-1.5 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] h-7 px-3 text-xs font-semibold text-white">
                            <Github className="h-3 w-3" />
                            <span className="hidden sm:inline">{t.nav.star}</span>
                        </Button>
                    </Link>

                    {/* Auth Section */}
                    {!loading && (
                        user ? <UserDropdown /> : <AuthButton />
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
