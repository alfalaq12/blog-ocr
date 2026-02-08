"use client";

import { Card } from "@/components/ui/Card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import Image from "next/image";

export function Testimonials() {
    const { t } = useLanguage();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 20
            }
        }
    };

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative overflow-hidden" id="testimonials">
            {/* Background Glow */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

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
                            {t.testimonials.title}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        {t.testimonials.description}
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-8 mb-16"
                >
                    {t.testimonials.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {t.testimonials.items.map((testimonial, index) => (
                        <motion.div key={index} variants={item} className="group">
                            <TestimonialCard {...testimonial} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

interface TestimonialCardProps {
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar: string;
}

function TestimonialCard({ name, role, company, content, rating, avatar }: TestimonialCardProps) {
    return (
        <Card className="relative h-full flex flex-col p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500">
            {/* Corner Glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Quote Icon */}
            <div className="mb-4">
                <Quote className="w-8 h-8 text-indigo-400/20" fill="currentColor" />
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                    />
                ))}
            </div>

            {/* Content */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                "{content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {avatar ? (
                        <Image src={avatar} alt={name} fill className="object-cover" />
                    ) : (
                        name.charAt(0).toUpperCase()
                    )}
                </div>
                <div>
                    <div className="text-white font-medium text-sm">{name}</div>
                    <div className="text-gray-400 text-xs">
                        {role} • {company}
                    </div>
                </div>
            </div>
        </Card>
    );
}
