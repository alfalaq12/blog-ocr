"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32">
            <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-3xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-primary backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)] ring-1 ring-white/10">
                            <span className="mr-2 flex h-2 w-2 relative">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                            </span>
                            <span className="font-medium tracking-wide text-xs">{t.hero.badge}</span>
                        </div>
                    </motion.div>

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
                        <Button size="lg" className="rounded-full px-8 h-12 gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300 bg-linear-to-r from-indigo-600 to-purple-600 border border-white/10">
                            {t.hero.getStarted} <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 gap-2 backdrop-blur-sm border-white/10 hover:bg-white/5 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300">
                            <PlayCircle className="h-4 w-4" /> {t.hero.viewDemo}
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-16 pt-8 border-t border-white/5"
                    >
                        <p className="text-sm text-gray-500 mb-6">{t.hero.trustedBy}</p>
                        <div className="flex justify-center items-center gap-8 opacity-70">
                            {/* PUPR Client */}
                            <div className="group flex items-center gap-3 transition-opacity">
                                <div className="relative h-12 w-12 transition-all duration-300 grayscale group-hover:grayscale-0">
                                    <Image
                                        src="/images/logo-pupr-new.png"
                                        alt="Logo Kementerian PUPR"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-lg font-semibold text-gray-400 group-hover:text-white transition-colors">Kementerian PUPR</span>
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
