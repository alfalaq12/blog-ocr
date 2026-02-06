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
        <section className="py-20" id="playground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.playground.title}</h2>
                        <p className="mt-4 text-gray-400">{t.playground.description}</p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                        {/* Left Panel: Upload / Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className={`relative flex flex-col overflow-hidden border-white/10 bg-white/5 p-0 shadow-2xl transition-all hover:border-white/20 ${previewUrl ? "h-auto" : "min-h-[350px] sm:min-h-[500px]"}`}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image.png, image/jpeg, image/jpg"
                                    className="hidden"
                                />

                                <AnimatePresence mode="wait">
                                    {!previewUrl ? (
                                        <motion.div
                                            key="upload"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-1 flex-col items-center justify-center border-dashed border-2 border-white/10 p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group"
                                            onClick={handleSelectImage}
                                        >
                                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg shadow-primary/20 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
                                                <Upload className="h-8 w-8" />
                                            </div>
                                            <h3 className="mb-2 text-2xl font-semibold text-white">{t.playground.uploadTitle}</h3>
                                            <p className="mb-8 text-gray-400">{t.playground.uploadDesc}</p>
                                            <Button size="lg" className="shadow-lg shadow-primary/25 pointer-events-none">
                                                {t.playground.select}
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="relative flex h-full items-center justify-center bg-black/50"
                                        >
                                            {/* Image Container */}
                                            <div className="relative max-h-full max-w-full p-4">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="max-h-[450px] w-auto rounded-lg object-contain shadow-2xl"
                                                />

                                                {/* Scanning Animation Overlay */}
                                                {isAnalyzing && (
                                                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                                                        <motion.div
                                                            className="absolute inset-x-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                                                            animate={{ top: ["0%", "100%", "0%"] }}
                                                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                                        />
                                                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                                                    </div>
                                                )}

                                                {/* Reset Button */}
                                                <button
                                                    onClick={handleReset}
                                                    disabled={isAnalyzing}
                                                    className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110 disabled:opacity-50"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
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
                            <Card className="flex flex-col overflow-hidden bg-[#0B0F19] p-0 shadow-2xl border-white/10 min-h-[350px] sm:min-h-[500px]">
                                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                                            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                                            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                                        </div>
                                        <span className="ml-3 font-mono text-xs text-gray-400">api_response.json</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {result && (
                                            <button
                                                onClick={handleCopy}
                                                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                                            >
                                                {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                                                {copied ? "Copied" : "Copy"}
                                            </button>
                                        )}
                                        {result && !error && <div className="rounded bg-green-500/10 px-2 py-0.5 text-[10px] uppercase font-bold text-green-400 ring-1 ring-green-500/20">200 OK</div>}
                                        {error && <div className="rounded bg-red-500/10 px-2 py-0.5 text-[10px] uppercase font-bold text-red-400 ring-1 ring-red-500/20">Error</div>}
                                    </div>
                                </div>

                                <div className="relative flex-1 overflow-auto bg-[#0B0F19] p-4 font-mono text-xs sm:text-sm leading-relaxed custom-scrollbar">
                                    {isAnalyzing ? (
                                        <div className="flex h-full flex-col items-center justify-center space-y-4 py-20">
                                            <div className="relative h-12 w-12">
                                                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 animate-pulse">{t.playground.analyzing}</p>
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
                                            <AlertCircle className="mb-4 h-10 w-10 opacity-50" />
                                            <p className="text-center px-6 max-w-sm">{error}</p>
                                            <Button variant="ghost" size="sm" onClick={() => { setError(null); setIsAnalyzing(false); }} className="mt-4 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                                Try Again
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex h-full flex-col items-center justify-center py-20 text-gray-600">
                                            <div className="mb-4 rounded-lg border border-white/5 bg-white/5 p-4 opacity-50">
                                                <code className="text-xs">{"{ \"waiting\": true }"}</code>
                                            </div>
                                            <p>{t.playground.waiting}</p>
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
