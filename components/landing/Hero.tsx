"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-3xl"
                >


                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            {t.hero.headline}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x bg-size-[200%_auto]"
                        >
                            {t.hero.headlineHighlight}
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl leading-relaxed"
                    >
                        {t.hero.subhead}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Link href="#api">
                            <Button size="lg" className="rounded-full px-8 h-12 gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300 bg-linear-to-r from-indigo-600 to-purple-600 border border-white/10">
                                {t.hero.getStarted} <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#playground">
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 gap-2 backdrop-blur-sm border-white/10 hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300">
                                <PlayCircle className="h-4 w-4" /> {t.hero.viewDemo}
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-20 pt-10 border-t border-white/5"
                    >
                        <p className="text-sm font-medium text-gray-400 mb-8 uppercase tracking-widest">{t.hero.trustedBy}</p>
                        <div className="flex justify-center items-center gap-8">
                            {/* PUPR Client */}
                            <div className="group flex items-center gap-4 transition-all duration-300">
                                <div className="relative h-14 w-14 md:h-16 md:w-16 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                                    <Image
                                        src="/images/logo-pupr-new.png"
                                        alt="Logo Kementerian PUPR"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-gray-300 group-hover:text-white transition-colors tracking-tight shadow-[0_0_30px_rgba(255,255,255,0)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">Kementerian PUPR</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30">
                <div className="absolute inset-0 rounded-full bg-primary blur-[120px]" />
            </div>
        </section >
    );
}
