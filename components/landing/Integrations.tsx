"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import Image from "next/image";

export function Integrations() {
    const { t } = useLanguage();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
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

    // Logo URLs from CDN - mixed sources for best compatibility
    const logoMap: Record<string, string> = {
        "MinIO": "https://cdn.simpleicons.org/minio/C72E49",
        "AWS S3": "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
        "Google Cloud": "https://cdn.simpleicons.org/googlecloud/4285F4",
        "Azure": "https://cdn.worldvectorlogo.com/logos/azure-1.svg",
        "Zapier": "https://cdn.simpleicons.org/zapier/FF4A00",
        "Make": "https://cdn.simpleicons.org/make/6D00CC",
        "Node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
        "Python": "https://cdn.simpleicons.org/python/3776AB",
        "Go": "https://cdn.simpleicons.org/go/00ADD8",
        "PHP": "https://cdn.simpleicons.org/php/777BB4",
        "Ruby": "https://cdn.simpleicons.org/ruby/CC342D",
        "Java": "https://cdn.worldvectorlogo.com/logos/java-4.svg",
    };

    return (
        <section className="py-20 md:py-32 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
                        <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
                            {t.integrations.title}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        {t.integrations.description}
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
                >
                    {t.integrations.items.map((integration, index) => (
                        <motion.div key={index} variants={item}>
                            <IntegrationCard
                                name={integration.name}
                                logo={logoMap[integration.name] || integration.logo}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

interface IntegrationCardProps {
    name: string;
    logo: string;
}

function IntegrationCard({ name, logo }: IntegrationCardProps) {
    return (
        <div className="relative flex items-center justify-center p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-500 group aspect-square overflow-visible">
            {/* Corner Glow */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-500/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Logo */}
            <div className="relative w-full h-full flex items-center justify-center">
                {logo ? (
                    <div className="relative w-16 h-16 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                        <Image
                            src={logo}
                            alt={name}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                ) : (
                    <div className="text-2xl font-bold text-gray-600 group-hover:text-white transition-colors">
                        {name.substring(0, 2).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Tooltip - Fixed z-index and positioning */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[100]">
                <div className="px-3 py-1.5 rounded-lg bg-gray-900/95 backdrop-blur-xl border border-white/20 whitespace-nowrap shadow-xl">
                    <span className="text-white text-xs font-medium">{name}</span>
                </div>
                {/* Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 border-r border-b border-white/20 rotate-45" />
            </div>
        </div>
    );
}
