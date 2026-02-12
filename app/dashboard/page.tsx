"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Providers } from "@/app/providers";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/i18n";
import {
    Key,
    Copy,
    Check,
    BarChart3,
    FileText,
    RefreshCw,
    Crown,
    AlertCircle,
    Loader2,
    Eye,
    EyeOff,
    Calendar,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Stats {
    total_requests: number;
    successful_requests: number;
    failed_requests: number;
    total_pages_processed: number;
    avg_processing_time_ms: number;
}

interface Profile {
    subscription_tier: string;
    subscription_expires_at: string | null;
    ocr_api_key: string | null;
}

function DashboardContent() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { t } = useLanguage();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [generatingKey, setGeneratingKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch profile and stats
    useEffect(() => {
        async function fetchData() {
            if (!user) return;

            try {
                // Fetch profile from Supabase
                const { createClient } = await import("@/lib/supabase");
                const supabase = createClient();

                const { data: profileData, error: profileError } = await supabase
                    .from("profiles")
                    .select("subscription_tier, subscription_expires_at, ocr_api_key")
                    .eq("id", user.id)
                    .single();

                if (profileError) throw profileError;
                setProfile(profileData);

                // Fetch stats if user has API key
                if (profileData?.ocr_api_key) {
                    const statsRes = await fetch("/api/user/stats");
                    const statsData = await statsRes.json();
                    if (statsData.stats) {
                        setStats(statsData.stats);
                    }
                }
            } catch (err: any) {
                console.error("Error fetching dashboard data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (!authLoading) {
            if (!user) {
                router.push("/");
            } else {
                fetchData();
            }
        }
    }, [user, authLoading, router]);

    // Generate API key
    const handleGenerateKey = async () => {
        setGeneratingKey(true);
        setError(null);

        try {
            const res = await fetch("/api/user/generate-api-key", {
                method: "POST"
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to generate API key");
            }

            // Refresh profile
            const { createClient } = await import("@/lib/supabase");
            const supabase = createClient();
            const { data: profileData } = await supabase
                .from("profiles")
                .select("subscription_tier, subscription_expires_at, ocr_api_key")
                .eq("id", user!.id)
                .single();

            if (profileData) {
                setProfile(profileData);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setGeneratingKey(false);
        }
    };

    // Copy API key to clipboard
    const handleCopyKey = async () => {
        if (!profile?.ocr_api_key) return;

        try {
            await navigator.clipboard.writeText(profile.ocr_api_key);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // Mask API key for display
    const getMaskedKey = (key: string) => {
        if (showApiKey) return key;
        return key.substring(0, 8) + "•".repeat(24) + key.substring(key.length - 4);
    };

    // Format expiry date
    const formatExpiryDate = (dateStr: string | null) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    // Check if subscription is expired
    const isExpired = profile?.subscription_expires_at
        ? new Date(profile.subscription_expires_at) < new Date()
        : false;

    if (authLoading || loading) {
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
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {t.dashboard.title}
                        </h1>
                        <p className="text-gray-400">
                            {t.dashboard.subtitle}
                        </p>
                    </motion.div>

                    {/* Not Pro User */}
                    {profile?.subscription_tier !== "pro" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="p-8 bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10 text-center">
                                <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">
                                    {t.dashboard.upgradeToPro}
                                </h2>
                                <p className="text-gray-400 mb-6">
                                    {t.dashboard.upgradeDescription}
                                </p>
                                <Link href="/pricing">
                                    <Button className="bg-linear-to-r from-purple-600 to-pink-600 font-semibold px-8">
                                        {t.dashboard.viewPricing}
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    )}

                    {/* Pro User Dashboard */}
                    {profile?.subscription_tier === "pro" && (
                        <div className="grid gap-6">
                            {/* Subscription Status */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${isExpired
                                                ? "bg-red-500/10 border border-red-500/20"
                                                : "bg-purple-500/10 border border-purple-500/20"
                                                }`}>
                                                <Crown className={`w-6 h-6 ${isExpired ? "text-red-400" : "text-purple-400"}`} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">
                                                    {isExpired ? t.dashboard.subscription.expired : t.dashboard.subscription.active}
                                                </h3>
                                                <p className="text-gray-400 text-sm flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {t.dashboard.subscription.expiresOn}: {formatExpiryDate(profile.subscription_expires_at)}
                                                </p>
                                            </div>
                                        </div>
                                        {isExpired && (
                                            <Link href="/pricing">
                                                <Button className="bg-linear-to-r from-purple-600 to-pink-600 font-semibold">
                                                    {t.dashboard.subscription.renew}
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>

                            {/* API Key Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Key className="w-5 h-5 text-purple-400" />
                                        <h3 className="text-lg font-semibold text-white">
                                            {t.dashboard.apiKey.title}
                                        </h3>
                                    </div>

                                    {error && (
                                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {error}
                                        </div>
                                    )}

                                    {profile.ocr_api_key ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-white/5 rounded-lg p-3 font-mono text-sm text-gray-300 overflow-x-auto">
                                                    {getMaskedKey(profile.ocr_api_key)}
                                                </div>
                                                <button
                                                    onClick={() => setShowApiKey(!showApiKey)}
                                                    className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                    title={showApiKey ? "Hide" : "Show"}
                                                >
                                                    {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                                <button
                                                    onClick={handleCopyKey}
                                                    className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                                    title="Copy"
                                                >
                                                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <p className="text-gray-500 text-sm">
                                                {t.dashboard.apiKey.usage}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6">
                                            <p className="text-gray-400 mb-4">
                                                {t.dashboard.apiKey.noKey}
                                            </p>
                                            <Button
                                                onClick={handleGenerateKey}
                                                disabled={generatingKey}
                                                className="bg-linear-to-r from-purple-600 to-pink-600 font-semibold"
                                            >
                                                {generatingKey ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                                        {t.dashboard.apiKey.generating}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Key className="w-5 h-5 mr-2" />
                                                        {t.dashboard.apiKey.generate}
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>

                            {/* Usage Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card className="p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <BarChart3 className="w-5 h-5 text-purple-400" />
                                        <h3 className="text-lg font-semibold text-white">
                                            {t.dashboard.stats.title}
                                        </h3>
                                    </div>

                                    {stats ? (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                                    <FileText className="w-4 h-4" />
                                                    {t.dashboard.stats.totalRequests}
                                                </div>
                                                <div className="text-2xl font-bold text-white">
                                                    {stats.total_requests.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                                    <Check className="w-4 h-4 text-green-400" />
                                                    {t.dashboard.stats.successful}
                                                </div>
                                                <div className="text-2xl font-bold text-green-400">
                                                    {stats.successful_requests.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                                    <FileText className="w-4 h-4" />
                                                    {t.dashboard.stats.pagesProcessed}
                                                </div>
                                                <div className="text-2xl font-bold text-white">
                                                    {stats.total_pages_processed.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                                    <Zap className="w-4 h-4 text-yellow-400" />
                                                    {t.dashboard.stats.avgTime}
                                                </div>
                                                <div className="text-2xl font-bold text-white">
                                                    {stats.avg_processing_time_ms.toFixed(0)}
                                                    <span className="text-sm text-gray-400 ml-1">ms</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-400">
                                            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>{t.dashboard.stats.noData}</p>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>

                            {/* Quick Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card className="p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        {t.dashboard.quickLinks.title}
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <Link href="/docs" className="group">
                                            <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors">
                                                <FileText className="w-6 h-6 text-purple-400 mb-2" />
                                                <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                                    {t.dashboard.quickLinks.docs}
                                                </div>
                                                <div className="text-gray-500 text-sm">
                                                    {t.dashboard.quickLinks.docsDesc}
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/playground" className="group">
                                            <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors">
                                                <Zap className="w-6 h-6 text-purple-400 mb-2" />
                                                <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                                    {t.dashboard.quickLinks.playground}
                                                </div>
                                                <div className="text-gray-500 text-sm">
                                                    {t.dashboard.quickLinks.playgroundDesc}
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/integrations" className="group">
                                            <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors">
                                                <RefreshCw className="w-6 h-6 text-purple-400 mb-2" />
                                                <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                                                    {t.dashboard.quickLinks.integrations}
                                                </div>
                                                <div className="text-gray-500 text-sm">
                                                    {t.dashboard.quickLinks.integrationsDesc}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default function DashboardPage() {
    return (
        <Providers>
            <DashboardContent />
        </Providers>
    );
}
