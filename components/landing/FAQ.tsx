"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 md:py-32 bg-black relative overflow-hidden" id="faq">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                        <HelpCircle className="w-4 h-4" />
                        {t.faq.badge}
                    </div>
                    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
                        <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
                            {t.faq.title}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        {t.faq.description}
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {t.faq.items.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <FAQItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => toggleFAQ(index)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <Card className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left group"
            >
                <span className="text-white font-medium text-lg pr-8 group-hover:text-indigo-400 transition-colors">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-0">
                            <div className="text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                {answer}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
