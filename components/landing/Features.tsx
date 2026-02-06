"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Brain, Cpu, Database, Shield, Server, Zap, Terminal, Activity, Lock, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useState, useEffect } from "react";

export function Features() {
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

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative overflow-hidden" id="features">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-20 max-w-2xl">
                    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
                        <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
                            {t.features.title}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                        {t.features.description}
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)]"
                >
                    {/* Card 1: Smart Learning System (Large Card) */}
                    <motion.div variants={item} className="md:col-span-2 md:row-span-2 group">
                        <FeatureCard className="h-full min-h-[400px] md:min-h-[500px] flex flex-col justify-between overflow-hidden">
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="ml-2 text-[10px] font-mono text-gray-500">neural_engine.py</div>
                            </div>

                            {/* Animated Neural Network */}
                            <div className="flex-1 relative min-h-[250px] w-full flex items-center justify-center p-8">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
                                <NeuralNetworkAnimation />

                                <div className="absolute top-8 right-8">
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md">
                                        <Activity className="w-3 h-3 text-green-400 animate-pulse" />
                                        <span className="text-xs font-mono text-green-400 tabular-nums">+12.5%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 pt-0 z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-medium text-white">{t.features.learningTitle}</h3>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                                    {t.features.learningDesc}
                                </p>
                            </div>
                        </FeatureCard>
                    </motion.div>

                    {/* Card 2: Hybrid Engine Architecture (Middle Card) */}
                    <motion.div variants={item} className="md:col-span-2 group">
                        <FeatureCard className="h-full min-h-[300px] relative overflow-hidden">
                            {/* Background CPU Icon */}
                            <div className="absolute -right-10 -top-10 text-white/2 pointer-events-none">
                                <Cpu className="w-64 h-64" strokeWidth={0.5} />
                            </div>

                            <div className="p-8 h-full flex flex-col justify-center relative z-10">
                                <div className="space-y-6 mb-8">
                                    {/* PaddleOCR Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-medium text-blue-200">PaddleOCR</span>
                                            <span className="text-blue-400/80 font-mono tracking-wider text-[10px]">PRECISION_MODE</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-blue-950/30 rounded-full overflow-hidden border border-blue-500/20">
                                            <motion.div
                                                className="h-full bg-linear-to-r from-blue-600 to-cyan-500 relative"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "96%" }}
                                                transition={{ duration: 1.5, delay: 0.2 }}
                                            >
                                                <div className="absolute right-0 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Tesseract Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-medium text-amber-200">Tesseract</span>
                                            <span className="text-amber-400/80 font-mono tracking-wider text-[10px]">SPEED_MODE</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-amber-950/30 rounded-full overflow-hidden border border-amber-500/20">
                                            <motion.div
                                                className="h-full bg-linear-to-r from-amber-600 to-orange-500 relative"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "88%" }}
                                                transition={{ duration: 1.5, delay: 0.4 }}
                                            >
                                                <div className="absolute right-0 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-amber-400" />
                                        {t.features.engineTitle}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {t.features.engineDesc}
                                    </p>
                                </div>
                            </div>
                        </FeatureCard>
                    </motion.div>

                    {/* Card 3: MinIO Integration (Small Card) */}
                    <motion.div variants={item} className="md:col-span-1 group">
                        <FeatureCard className="h-full min-h-[300px] p-0 overflow-hidden flex flex-col">
                            <div className="flex-1 relative bg-linear-to-b from-white/2 to-transparent p-6 flex flex-col items-center justify-center">
                                <div className="absolute top-4 right-4 text-[10px] font-mono text-gray-500 border border-white/10 px-1.5 py-0.5 rounded">
                                    S3 COMPATIBLE
                                </div>
                                <DataFlowAnimation />
                            </div>
                            <div className="p-6 border-t border-white/5 bg-black/20">
                                <h3 className="text-base font-medium text-white mb-1 flex items-center gap-2">
                                    <Database className="w-4 h-4 text-red-400" />
                                    {t.features.minioTitle}
                                </h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {t.features.minioDesc}
                                </p>
                            </div>
                        </FeatureCard>
                    </motion.div>

                    {/* Card 4: Enterprise Security (Small Card) */}
                    <motion.div variants={item} className="md:col-span-1 group">
                        <FeatureCard className="h-full min-h-[300px] p-0 overflow-hidden flex flex-col">
                            <div className="flex-1 relative bg-[#1E1E1E] p-4 font-mono text-[10px] leading-4 overflow-hidden group-hover:bg-[#1a1a1a] transition-colors">
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-500 to-emerald-500" />
                                <div className="text-gray-500 select-none mb-2">{'// Secure Configuration'}</div>
                                <div><span className="text-purple-400">const</span> <span className="text-yellow-200">config</span> = {'{'}</div>
                                <div className="pl-4"><span className="text-blue-300">key</span>: <span className="text-green-400">"sk_live_..."</span>,</div>
                                <div className="pl-4"><span className="text-blue-300">role</span>: <span className="text-orange-300">"admin"</span>,</div>
                                <div className="pl-4"><span className="text-blue-300">acl</span>: [<span className="text-green-300">"read"</span>, <span className="text-green-300">"write"</span>]</div>
                                <div>{'}'};</div>

                                <motion.div
                                    className="absolute bottom-4 right-4"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Shield className="w-12 h-12 text-green-500/10" />
                                </motion.div>
                            </div>
                            <div className="p-6 border-t border-white/5 bg-black/20">
                                <h3 className="text-base font-medium text-white mb-1 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-green-400" />
                                    {t.features.securityTitle}
                                </h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {t.features.securityDesc}
                                </p>
                            </div>
                        </FeatureCard>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// ------------------------------------------------------------------
// Sub-components & Visualizations
// ------------------------------------------------------------------

function FeatureCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl transition-all duration-500 ${className}`}>
            {/* Corner Glow Effect */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            {children}
        </div>
    );
}

function NeuralNetworkAnimation() {
    return (
        <svg className="w-full h-full max-w-[300px] max-h-[200px]" viewBox="0 0 300 200">
            <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#818cf8" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                </linearGradient>
            </defs>
            {/* Layers */}
            {[0, 1, 2].map((layerIndex) => {
                const x = 50 + layerIndex * 100;
                const nodes = layerIndex === 1 ? 4 : 3;
                return Array.from({ length: nodes }).map((_, nodeIndex) => {
                    const y = 100 - ((nodes - 1) * 30) / 2 + nodeIndex * 30;
                    return (
                        <g key={`${layerIndex}-${nodeIndex}`}>
                            {/* Connections to next layer */}
                            {layerIndex < 2 && Array.from({ length: layerIndex === 0 ? 4 : 3 }).map((_, nextIndex) => {
                                const nextX = 50 + (layerIndex + 1) * 100;
                                const nextNodes = layerIndex === 0 ? 4 : 3;
                                const nextY = 100 - ((nextNodes - 1) * 30) / 2 + nextIndex * 30;
                                return (
                                    <motion.line
                                        key={`conn-${nextIndex}`}
                                        x1={x} y1={y} x2={nextX} y2={nextY}
                                        stroke="url(#line-gradient)"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1.5, delay: layerIndex * 0.2 + nextIndex * 0.1 }}
                                    />
                                );
                            })}
                            <motion.circle
                                cx={x} cy={y} r="4"
                                className="fill-indigo-500"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: layerIndex * 0.2 + nodeIndex * 0.1 }}
                            >
                                <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + (layerIndex + nodeIndex) * 0.5}s`} repeatCount="indefinite" />
                            </motion.circle>
                        </g>
                    );
                });
            })}
        </svg>
    );
}

function DataFlowAnimation() {
    return (
        <div className="relative w-full h-32 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Server className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-[10px] text-gray-500 font-mono">APP</div>
            </div>

            {/* Connection Line */}
            <div className="flex-1 h-px bg-linear-to-r from-gray-700 via-gray-500 to-gray-700 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-8 h-full bg-white blur-[2px]"
                    animate={{ left: ["-20%", "120%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <Database className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-[10px] text-red-400/80 font-mono">MinIO</div>
            </div>
        </div>
    );
}
