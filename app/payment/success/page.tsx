"use client";

import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Providers } from "@/app/providers";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function SuccessContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");
    const isPending = status === "pending";

    return (
        <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-white">
            <Navbar />

            <div className="pt-28 pb-20 px-4">
                <div className="max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-8 bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10 text-center">
                            {/* Icon */}
                            <div className="mb-6 flex justify-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className={`p-4 rounded-full ${isPending
                                        ? "bg-yellow-500/10 border border-yellow-500/20"
                                        : "bg-green-500/10 border border-green-500/20"
                                        }`}
                                >
                                    {isPending ? (
                                        <Clock className="w-12 h-12 text-yellow-400" />
                                    ) : (
                                        <CheckCircle className="w-12 h-12 text-green-400" />
                                    )}
                                </motion.div>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl font-bold text-white mb-3">
                                {isPending ? "Payment Pending" : "Payment Successful!"}
                            </h1>

                            {/* Description */}
                            <p className="text-gray-400 mb-8">
                                {isPending ? (
                                    "Your payment is being processed. You'll receive a confirmation email once it's complete."
                                ) : (
                                    "Thank you for subscribing to Pro! Your account has been upgraded and you now have unlimited scans."
                                )}
                            </p>

                            {/* Benefits (for success) */}
                            {!isPending && (
                                <div className="bg-white/5 rounded-xl p-4 mb-8">
                                    <p className="text-sm text-gray-400 mb-3">Your Pro benefits are now active:</p>
                                    <div className="grid grid-cols-2 gap-2 text-left">
                                        {[
                                            "Unlimited scans",
                                            "Priority processing",
                                            "Advanced OCR",
                                            "API access"
                                        ].map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-2 text-green-400 text-sm">
                                                <CheckCircle className="w-4 h-4" />
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <Link href="/dashboard">
                                <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                                    Go to Dashboard
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Providers>
            <SuccessContent />
        </Providers>
    );
}
