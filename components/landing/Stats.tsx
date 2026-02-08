"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { TrendingUp, Zap, Users, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function Stats() {
    const { t } = useLanguage();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.8 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="py-20 bg-black relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]" />

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {/* Accuracy Stat */}
                    <motion.div variants={item}>
                        <StatCard
                            icon={<TrendingUp className="w-6 h-6" />}
                            value="99.5%"
                            label={t.stats.accuracy}
                            iconColor="text-green-400"
                            iconBg="bg-green-500/10"
                            iconBorder="border-green-500/20"
                            suffix=""
                        />
                    </motion.div>

                    {/* Speed Stat */}
                    <motion.div variants={item}>
                        <StatCard
                            icon={<Zap className="w-6 h-6" />}
                            value="0.8"
                            label={t.stats.speed}
                            iconColor="text-yellow-400"
                            iconBg="bg-yellow-500/10"
                            iconBorder="border-yellow-500/20"
                            suffix="s"
                        />
                    </motion.div>

                    {/* Users Stat */}
                    <motion.div variants={item}>
                        <StatCard
                            icon={<Users className="w-6 h-6" />}
                            value="10K+"
                            label={t.stats.users}
                            iconColor="text-blue-400"
                            iconBg="bg-blue-500/10"
                            iconBorder="border-blue-500/20"
                            suffix=""
                            isCounter={false}
                        />
                    </motion.div>

                    {/* Uptime Stat */}
                    <motion.div variants={item}>
                        <StatCard
                            icon={<Shield className="w-6 h-6" />}
                            value="99.9%"
                            label={t.stats.uptime}
                            iconColor="text-purple-400"
                            iconBg="bg-purple-500/10"
                            iconBorder="border-purple-500/20"
                            suffix=""
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    iconColor: string;
    iconBg: string;
    iconBorder: string;
    suffix: string;
    isCounter?: boolean;
}

function StatCard({ icon, value, label, iconColor, iconBg, iconBorder, suffix, isCounter = true }: StatCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(isCounter ? "0" : value);

    useEffect(() => {
        if (isInView && isCounter) {
            // Extract numeric value
            const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = numericValue / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(current.toFixed(1));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, value, isCounter]);

    return (
        <Card ref={ref} className="group relative h-full flex flex-col items-center justify-center p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 text-center">
            {/* Corner Glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl ${iconBg} border ${iconBorder} ${iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>

            {/* Value */}
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 tabular-nums">
                {displayValue}{suffix}
            </div>

            {/* Label */}
            <div className="text-sm text-gray-400 uppercase tracking-wider">
                {label}
            </div>
        </Card>
    );
}
