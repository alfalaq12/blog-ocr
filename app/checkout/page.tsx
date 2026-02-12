"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Providers } from "@/app/providers";
import { useAuth } from "@/lib/auth-context";
import { Crown, Loader2, Check, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { PRICING, formatIDR } from "@/lib/midtrans";

declare global {
    interface Window {
        snap: any;
    }
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const plan = searchParams.get("plan") || "pro";
    const pricing = billingCycle === "yearly" ? PRICING.pro.yearly : PRICING.pro.monthly;

    // Load Midtrans Snap script
    useEffect(() => {
        const script = document.createElement("script");
        // Use production URL when isProduction is true
        const isProduction = true; // Match with lib/midtrans.ts config
        script.src = isProduction
            ? "https://app.midtrans.com/snap/snap.js"
            : "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "");
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/pricing");
        }
    }, [user, authLoading, router]);

    const handlePayment = async () => {
        if (!user) return;

        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch("/api/payment/create-transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan: "pro",
                    billingCycle,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create transaction");
            }

            // Open Midtrans Snap
            if (window.snap) {
                window.snap.pay(data.token, {
                    onSuccess: function () {
                        router.push("/payment/success");
                    },
                    onPending: function () {
                        router.push("/payment/success?status=pending");
                    },
                    onError: function () {
                        setError("Payment failed. Please try again.");
                    },
                    onClose: function () {
                        setIsProcessing(false);
                    },
                });
            } else {
                // Fallback to redirect
                window.location.href = data.redirect_url;
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong");
            setIsProcessing(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black selection:bg-primary/30 selection:text-white">
            <Navbar />

            <div className="pt-28 pb-20 px-4">
                <div className="max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-8 bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
                                    <Crown className="w-8 h-8" />
                                </div>
                                <h1 className="text-2xl font-bold text-white mb-2">
                                    Upgrade to Pro
                                </h1>
                                <p className="text-gray-400">
                                    Unlock unlimited scans and premium features
                                </p>
                            </div>

                            {/* Billing Cycle Toggle */}
                            <div className="flex gap-2 p-1 bg-white/5 rounded-lg mb-8">
                                <button
                                    onClick={() => setBillingCycle("monthly")}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${billingCycle === "monthly"
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle("yearly")}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${billingCycle === "yearly"
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Yearly
                                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                        Save 17%
                                    </span>
                                </button>
                            </div>

                            {/* Price Display */}
                            <div className="text-center mb-8">
                                <div className="text-4xl font-bold text-white mb-2">
                                    {formatIDR(pricing.price)}
                                </div>
                                <div className="text-gray-400 flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {billingCycle === "yearly" ? "per year" : "per month"}
                                </div>
                                {billingCycle === "yearly" && (
                                    <div className="text-green-400 text-sm mt-2">
                                        Equivalent to {formatIDR(Math.round(pricing.price / 12))}/month
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-8">
                                {[
                                    "Unlimited OCR scans",
                                    "Priority processing",
                                    "Advanced document types",
                                    "API access",
                                    "Email support",
                                    "2 days free trial",
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-green-400" />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Payment Button */}
                            <Button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] font-semibold py-4 rounded-xl"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Crown className="w-5 h-5 mr-2" />
                                        Subscribe Now
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-gray-500 text-xs mt-4">
                                Secure payment powered by Midtrans
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Providers>
            <React.Suspense fallback={
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                </div>
            }>
                <CheckoutContent />
            </React.Suspense>
        </Providers>
    );
}
