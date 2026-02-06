"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { clsx } from "clsx";
import { motion } from "framer-motion";

type Tab = "node" | "python" | "go";

export function CodeDemo() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<Tab>("node");

    const tabs: { id: Tab; label: string }[] = [
        { id: "node", label: "Node.js" },
        { id: "python", label: "Python" },
        { id: "go", label: "Go" },
    ];

    return (
        <section className="py-24 bg-white/5 border-y border-white/5 relative overflow-hidden" id="code-demo">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">{t.code.title}</h2>
                        <p className="mt-4 text-lg text-gray-400">
                            {t.code.description}
                        </p>
                        <ul className="mt-8 space-y-4">
                            {t.code.features.map((item, index) => (
                                <motion.li
                                    key={item}
                                    className="flex items-center text-gray-300"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                >
                                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary shadow-sm shadow-primary/20">
                                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                                    </div>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="bg-[#0B0F19] p-0 overflow-hidden shadow-2xl shadow-black/50 border-white/10 ring-1 ring-white/5">
                            <div className="flex border-b border-white/10 bg-white/5">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            "px-4 py-2.5 text-sm transition-all duration-200 font-medium",
                                            activeTab === tab.id
                                                ? "border-b-2 border-primary text-white bg-white/5 shadow-[inset_0_-10px_20px_rgba(255,255,255,0.02)]"
                                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="p-6 overflow-x-auto min-h-[350px] custom-scrollbar">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <pre className="text-sm font-mono leading-relaxed">
                                        {activeTab === "node" && (
                                            <>
                                                <span className="text-purple-400">import</span> <span className="text-white">{"{"} OCRPUR {"}"}</span> <span className="text-purple-400">from</span> <span className="text-green-400">"@ocr-pur/node"</span>;<br /><br />

                                                <span className="text-gray-500 italic">{t.code.comments.init}</span><br />
                                                <span className="text-purple-400">const</span> <span className="text-blue-400">client</span> <span className="text-purple-400">=</span> <span className="text-purple-400">new</span> <span className="text-yellow-400">OCRPUR</span>(<span className="text-green-400">"ocr_pur_sk_..."</span>);<br /><br />

                                                <span className="text-gray-500 italic">{t.code.comments.extract}</span><br />
                                                <span className="text-purple-400">const</span> <span className="text-blue-400">result</span> <span className="text-purple-400">=</span> <span className="text-purple-400">await</span> <span className="text-blue-400">client</span>.<span className="text-blue-400">extract</span>({"{"}<br />
                                                &nbsp;&nbsp;<span className="text-blue-400">image</span>: <span className="text-green-400">"https://example.com/invoice.png"</span>,<br />
                                                &nbsp;&nbsp;<span className="text-blue-400">detectHandwriting</span>: <span className="text-blue-400">true</span><br />
                                                {"}"});<br /><br />

                                                <span className="text-yellow-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-blue-400">result</span>.<span className="text-blue-400">text</span>);
                                            </>
                                        )}
                                        {activeTab === "python" && (
                                            <>
                                                <span className="text-purple-400">from</span> <span className="text-blue-400">ocrpur</span> <span className="text-purple-400">import</span> <span className="text-yellow-400">Client</span><br /><br />

                                                <span className="text-gray-500 italic"># {t.code.comments.init.replace("// ", "")}</span><br />
                                                <span className="text-blue-400">client</span> <span className="text-purple-400">=</span> <span className="text-yellow-400">Client</span>(<span className="text-green-400">"ocr_pur_sk_..."</span>)<br /><br />

                                                <span className="text-gray-500 italic"># {t.code.comments.extract.replace("// ", "")}</span><br />
                                                <span className="text-blue-400">result</span> <span className="text-purple-400">=</span> <span className="text-blue-400">client</span>.<span className="text-blue-400">extract</span>(<br />
                                                &nbsp;&nbsp;<span className="text-blue-400">image</span>=<span className="text-green-400">"https://example.com/id_card.jpg"</span>,<br />
                                                &nbsp;&nbsp;<span className="text-blue-400">language</span>=<span className="text-green-400">"id"</span><br />
                                                )<br /><br />

                                                <span className="text-yellow-400">print</span>(<span className="text-blue-400">result</span>.text)
                                            </>
                                        )}
                                        {activeTab === "go" && (
                                            <>
                                                <span className="text-purple-400">package</span> main<br /><br />
                                                <span className="text-purple-400">import</span> (<br />
                                                &nbsp;&nbsp;<span className="text-green-400">"fmt"</span><br />
                                                &nbsp;&nbsp;<span className="text-green-400">"github.com/ocrpur/go-sdk"</span><br />
                                                )<br /><br />

                                                <span className="text-purple-400">func</span> <span className="text-blue-400">main</span>() {"{"}<br />
                                                &nbsp;&nbsp;<span className="text-blue-400">client</span> <span className="text-purple-400">:=</span> <span className="text-blue-400">ocrpur</span>.<span className="text-yellow-400">NewClient</span>(<span className="text-green-400">"ocr_pur_sk_..."</span>)<br /><br />

                                                &nbsp;&nbsp;<span className="text-gray-500 italic">// {t.code.comments.extract.replace("// ", "")}</span><br />
                                                &nbsp;&nbsp;<span className="text-blue-400">res</span>, <span className="text-blue-400">_</span> <span className="text-purple-400">:=</span> <span className="text-blue-400">client</span>.<span className="text-blue-400">Extract</span>(<span className="text-blue-400">ocrpur</span>.<span className="text-blue-400">ExtractParams</span>{"{"}<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">Image</span>: <span className="text-green-400">"https://example.com/scan.pdf"</span>,<br />
                                                &nbsp;&nbsp;{"}"})<br /><br />

                                                &nbsp;&nbsp;<span className="text-blue-400">fmt</span>.<span className="text-yellow-400">Println</span>(<span className="text-blue-400">res</span>.<span className="text-blue-400">Text</span>)<br />
                                                {"}"}
                                            </>
                                        )}
                                    </pre>
                                </motion.div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
