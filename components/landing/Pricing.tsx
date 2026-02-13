"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { UpgradeModal } from "@/components/modals/UpgradeModal";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Pricing() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    const [showLoginModal, setShowLoginModal] = useState(false);

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
        hidden: { opacity: 0, y: 30 },
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

    const { showToast } = useToast();

    const handleProClick = () => {
        if (user) {
            // User logged in, show development toast
            showToast("Sistem pembayaran sedang dalam maintenance/pengembangan 🚧", "warning");
            // router.push("/checkout?plan=pro");
        } else {
            // Show login modal first
            setShowLoginModal(true);
        }
    };

    return (
        <>
            <section className="py-20 md:py-32 bg-black relative overflow-hidden" id="pricing">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

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
                                {t.pricing.title}
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                            {t.pricing.description}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    >
                        {/* Free Plan */}
                        <motion.div variants={item} className="group">
                            <PricingCard
                                icon={<Zap className="w-6 h-6" />}
                                name={t.pricing.free.name}
                                price={t.pricing.free.price}
                                period={t.pricing.free.period}
                                description={t.pricing.free.description}
                                features={t.pricing.free.features}
                                cta={t.pricing.free.cta}
                                href="/playground"
                                popular={false}
                                iconColor="text-blue-400"
                                iconBg="bg-blue-500/10"
                                iconBorder="border-blue-500/20"
                            />
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div variants={item} className="group md:-mt-4">
                            <PricingCard
                                icon={<Crown className="w-6 h-6" />}
                                name={t.pricing.pro.name}
                                price={t.pricing.pro.price}
                                period={t.pricing.pro.period}
                                description={t.pricing.pro.description}
                                features={t.pricing.pro.features}
                                cta={t.pricing.pro.cta}
                                href="/checkout?plan=pro"
                                popular={true}
                                iconColor="text-purple-400"
                                iconBg="bg-purple-500/10"
                                iconBorder="border-purple-500/20"
                                onCtaClick={handleProClick}
                            />
                        </motion.div>

                        {/* Enterprise Plan */}
                        <motion.div variants={item} className="group">
                            <PricingCard
                                icon={<Building2 className="w-6 h-6" />}
                                name={t.pricing.enterprise.name}
                                price={t.pricing.enterprise.price}
                                period={t.pricing.enterprise.period}
                                description={t.pricing.enterprise.description}
                                features={t.pricing.enterprise.features}
                                cta={t.pricing.enterprise.cta}
                                href="mailto:bintangal.falag@gmail.com"
                                popular={false}
                                iconColor="text-amber-400"
                                iconBg="bg-amber-500/10"
                                iconBorder="border-amber-500/20"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Login Modal for non-authenticated users */}
            <UpgradeModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                type="login"
                scansUsed={0}
                maxScans={0}
            />
        </>
    );
}

interface PricingCardProps {
    icon: React.ReactNode;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    href: string;
    popular: boolean;
    iconColor: string;
    iconBg: string;
    iconBorder: string;
    onCtaClick?: () => void;
}

function PricingCard({
    icon,
    name,
    price,
    period,
    description,
    features,
    cta,
    href,
    popular,
    iconColor,
    iconBg,
    iconBorder,
    onCtaClick,
}: PricingCardProps) {
    return (
        <Card className={`relative h-full flex flex-col p-8 bg-[#0A0A0A]/80 backdrop-blur-xl border transition-all duration-500 ${popular ? 'border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.2)] scale-105' : 'border-white/10 hover:border-white/20'}`}>
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/50">
                        Most Popular
                    </div>
                </div>
            )}

            {/* Corner Glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl ${iconBg} border ${iconBorder} ${iconColor} mb-6 w-fit`}>
                {icon}
            </div>

            {/* Plan Name */}
            <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>

            {/* Price */}
            <div className="mb-4">
                <span className="text-5xl font-bold text-white">{price}</span>
                {period && <span className="text-gray-400 ml-2">/ {period}</span>}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{description}</p>

            {/* CTA Button */}
            {onCtaClick ? (
                <Button
                    onClick={onCtaClick}
                    className={`w-full mb-8 ${popular ? 'bg-linear-to-r from-purple-600 to-pink-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]' : 'bg-white/5 hover:bg-white/10 border border-white/10'} transition-all duration-300`}
                    size="lg"
                >
                    {cta}
                </Button>
            ) : (
                <Link href={href} className="mb-8">
                    <Button
                        className={`w-full ${popular ? 'bg-linear-to-r from-purple-600 to-pink-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]' : 'bg-white/5 hover:bg-white/10 border border-white/10'} transition-all duration-300`}
                        size="lg"
                    >
                        {cta}
                    </Button>
                </Link>
            )}

            {/* Features */}
            <div className="space-y-4 flex-1">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                            <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                <Check className="w-3 h-3 text-green-400" strokeWidth={3} />
                            </div>
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}
