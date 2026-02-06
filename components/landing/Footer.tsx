"use client";

import { ScanText } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <ScanText className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-semibold text-white">OCR-PUR</span>
                    </div>

                    <div className="flex gap-8 text-sm text-gray-400">
                        <Link href="#" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
                        <Link href="#" className="hover:text-white transition-colors">{t.footer.terms}</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
                    </div>

                    <div className="text-sm text-gray-500">
                        © 2024 Alfalaq. {t.footer.rights}
                    </div>
                </div>
            </div>
        </footer>
    )
}
