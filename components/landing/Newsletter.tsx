"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mail, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function Newsletter() {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus("error");
            setMessage(t.newsletter.errorInvalid);
            return;
        }

        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setMessage(t.newsletter.success);
            setEmail("");

            // Reset after 5 seconds
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 5000);
        }, 1500);
    };

    return (
        <section className="py-20 bg-linear-to-b from-black to-[#050505] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="relative bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl overflow-hidden">
                        {/* Corner Glow */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/30 blur-[60px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 blur-[60px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className="inline-flex p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
                                <Mail className="w-6 h-6" />
                            </div>

                            {/* Title */}
                            <h3 className="text-3xl font-bold text-white mb-3">
                                {t.newsletter.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {t.newsletter.description}
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t.newsletter.placeholder}
                                        disabled={status === "loading" || status === "success"}
                                        className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={status === "loading" || status === "success"}
                                        className="bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        size="lg"
                                    >
                                        {status === "loading" ? t.newsletter.subscribing : t.newsletter.subscribe}
                                    </Button>
                                </div>

                                {/* Status Messages */}
                                <AnimatePresence mode="wait">
                                    {message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className={`flex items-center gap-2 text-sm ${status === "success" ? "text-green-400" : "text-red-400"
                                                }`}
                                        >
                                            {status === "success" ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4" />
                                            )}
                                            {message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>

                            {/* Privacy Note */}
                            <p className="text-xs text-gray-500 mt-4">
                                {t.newsletter.privacy}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
