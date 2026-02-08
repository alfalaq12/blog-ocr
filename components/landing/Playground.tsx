"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Upload, Loader2, AlertCircle, X, Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function Playground() {
    const { t } = useLanguage();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSelectImage = () => {
        fileInputRef.current?.click();
    };

    const handleReset = () => {
        setPreviewUrl(null);
        setResult(null);
        setError(null);
        setIsAnalyzing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        setIsAnalyzing(true);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Use local proxy to avoid Mixed Content (HTTPS -> HTTP) issues
            const response = await fetch("/api/ocr/extract", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setResult(JSON.stringify(data, null, 2));
        } catch (err) {
            console.error(err);
            setError("Failed to process image. Make sure backend is running at " + (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"));
        } finally {
            setIsAnalyzing(false);
            // We don't verify connection in a real app usually, but for validity:
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
    }, [previewUrl]);

    return (
        <section className="py-20 md:py-32 bg-black relative overflow-hidden" id="playground">
            {/* Background Glow Effects */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
                            <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
                                {t.playground.title}
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">{t.playground.description}</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2 lg:items-start max-w-7xl mx-auto">
                        {/* Left Panel: Upload / Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className={`relative flex flex-col overflow-hidden border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl p-0 shadow-2xl transition-all hover:border-white/20 group ${previewUrl ? "h-auto" : "min-h-[400px] sm:min-h-[550px]"}`}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image.png, image/jpeg, image/jpg"
                                    className="hidden"
                                />

                                {/* Corner Glow Effects */}
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <AnimatePresence mode="wait">
                                    {!previewUrl ? (
                                        <motion.div
                                            key="upload"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-1 flex-col items-center justify-center p-8 sm:p-12 text-center cursor-pointer relative"
                                            onClick={handleSelectImage}
                                        >
                                            {/* Animated Border */}
                                            <div className="absolute inset-4 border-2 border-dashed border-white/10 rounded-2xl group-hover:border-indigo-500/30 transition-colors" />

                                            {/* Upload Icon with Glow */}
                                            <motion.div
                                                className="relative mb-8 z-10"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
                                                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                                                    <Upload className="h-10 w-10 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                                </div>
                                            </motion.div>

                                            <h3 className="mb-3 text-2xl sm:text-3xl font-bold text-white z-10">{t.playground.uploadTitle}</h3>
                                            <p className="mb-8 text-gray-400 text-sm sm:text-base max-w-xs z-10">{t.playground.uploadDesc}</p>

                                            <Button
                                                size="lg"
                                                className="shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 pointer-events-none bg-linear-to-r from-indigo-600 to-purple-600 border-0 z-10"
                                            >
                                                <Upload className="mr-2 h-4 w-4" />
                                                {t.playground.select}
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="relative flex h-full items-center justify-center bg-black/50 p-6"
                                        >
                                            {/* Image Container */}
                                            <div className="relative max-h-full max-w-full">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="max-h-[500px] w-auto rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                                                />

                                                {/* Scanning Animation Overlay */}
                                                {isAnalyzing && (
                                                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                                                        <motion.div
                                                            className="absolute inset-x-0 h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                                                            animate={{ top: ["0%", "100%", "0%"] }}
                                                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                                        />
                                                        <div className="absolute inset-0 bg-indigo-500/5 mix-blend-overlay" />
                                                    </div>
                                                )}

                                                {/* Reset Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleReset}
                                                    disabled={isAnalyzing}
                                                    className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/50 transition-all hover:shadow-red-500/70 disabled:opacity-50 disabled:cursor-not-allowed border border-red-400/20"
                                                >
                                                    <X className="h-5 w-5" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>

                        {/* Right Panel: Code Output */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Card className="flex flex-col overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-xl p-0 shadow-2xl border-white/10 min-h-[400px] sm:min-h-[550px] group hover:border-white/20 transition-all">
                                {/* Corner Glow Effects */}
                                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Terminal Header */}
                                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm" />
                                            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                                            <div className="h-3 w-3 rounded-full bg-[#27c93f] shadow-sm" />
                                        </div>
                                        <span className="ml-3 font-mono text-xs text-gray-400">api_response.json</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {result && (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCopy}
                                                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
                                            >
                                                {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                                                {copied ? "Copied" : "Copy"}
                                            </motion.button>
                                        )}
                                        {result && !error && <div className="rounded bg-green-500/10 px-2 py-0.5 text-[10px] uppercase font-bold text-green-400 ring-1 ring-green-500/20">200 OK</div>}
                                        {error && <div className="rounded bg-red-500/10 px-2 py-0.5 text-[10px] uppercase font-bold text-red-400 ring-1 ring-red-500/20">Error</div>}
                                    </div>
                                </div>

                                {/* Code Output Area */}
                                <div className="relative flex-1 overflow-auto bg-[#0B0F19] p-6 font-mono text-xs sm:text-sm leading-relaxed custom-scrollbar">
                                    {isAnalyzing ? (
                                        <div className="flex h-full flex-col items-center justify-center space-y-4 py-20">
                                            <div className="relative h-16 w-16">
                                                <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/20" />
                                                <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/10" />
                                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-500/30 bg-indigo-500/10">
                                                    <Loader2 className="h-7 w-7 animate-spin text-indigo-400" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 animate-pulse font-medium">{t.playground.analyzing}</p>
                                            <div className="flex gap-1">
                                                <motion.div className="w-2 h-2 bg-indigo-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                                                <motion.div className="w-2 h-2 bg-indigo-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                                                <motion.div className="w-2 h-2 bg-indigo-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                                            </div>
                                        </div>
                                    ) : result ? (
                                        <motion.pre
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-gray-300 text-xs sm:text-sm whitespace-pre-wrap break-all"
                                        >
                                            <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(result) }} />
                                        </motion.pre>
                                    ) : error ? (
                                        <div className="flex h-full flex-col items-center justify-center py-20 text-red-400">
                                            <div className="relative mb-4">
                                                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                                                <AlertCircle className="relative h-12 w-12 opacity-80" />
                                            </div>
                                            <p className="text-center px-6 max-w-sm text-sm leading-relaxed">{error}</p>
                                            <Button variant="ghost" size="sm" onClick={() => { setError(null); setIsAnalyzing(false); }} className="mt-6 text-red-400 hover:text-red-300 hover:bg-red-900/20 border border-red-500/20">
                                                Try Again
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex h-full flex-col items-center justify-center py-20 text-gray-500">
                                            <div className="mb-6 rounded-xl border border-white/5 bg-white/5 p-6 opacity-50 backdrop-blur-sm">
                                                <code className="text-xs text-gray-400">{"{ \"waiting\": true }"}</code>
                                            </div>
                                            <p className="text-sm">{t.playground.waiting}</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Helper for basic syntax highlighting
function syntaxHighlight(json: string) {
    if (!json) return "";
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-orange-300'; // number
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-purple-300'; // key
            } else {
                cls = 'text-green-300'; // string
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-blue-300'; // boolean
        } else if (/null/.test(match)) {
            cls = 'text-gray-400'; // null
        }
        return `<span class="${cls}">${match}</span>`;
    });
}
