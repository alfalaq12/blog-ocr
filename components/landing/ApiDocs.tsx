"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Copy, Check, ChevronRight, Server, Shield, BookOpen } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

type Method = "GET" | "POST" | "DELETE" | "PUT";

interface ApiParam {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

interface ApiEndpoint {
    id: string;
    method: Method;
    path: string;
    title: string;
    description: string;
    params?: ApiParam[];
    curl: string;
    response?: string;
}

interface ApiCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    endpoints: ApiEndpoint[];
}

const apiData: ApiCategory[] = [
    {
        id: "ocr",
        title: "OCR Endpoints",
        icon: <Server className="h-4 w-4" />,
        endpoints: [
            {
                id: "extract",
                method: "POST",
                path: "/api/ocr/extract",
                title: "Extract Text from Document",
                description: "Upload file dokumen untuk ekstraksi teks menggunakan OCR. Mendukung format gambar (PNG, JPG, JPEG, TIFF, BMP) dan PDF multi-halaman.",
                params: [
                    { name: "file", type: "file", required: true, description: "File dokumen yang akan diproses (PNG, JPG, PDF, dll)" },
                    { name: "language", type: "string", required: false, description: "Bahasa dokumen: 'id', 'en', atau 'mixed' (default)" },
                    { name: "engine", type: "string", required: false, description: "OCR engine: 'paddle' (akurat) atau 'tesseract' (cepat)" },
                    { name: "use_dictionary", type: "boolean", required: false, description: "Koreksi hasil dengan kamus Indonesia" },
                    { name: "enhance", type: "boolean", required: false, description: "Tingkatkan kontras untuk dokumen pudar/jadul" },
                ],
                curl: `curl -X POST "http://117.53.44.215:8000/api/ocr/extract" \\
  -H "X-API-Key: sk-ocr-xxxxx" \\
  -F "file=@document.pdf" \\
  -F "language=mixed"`,
                response: `{
  "success": true,
  "text": "Extracted text content...",
  "pages": 1,
  "language": "mixed",
  "processing_time_ms": 1234
}`
            },
            {
                id: "extract-minio",
                method: "POST",
                path: "/api/ocr/extract-from-minio",
                title: "Extract from MinIO",
                description: "Proses OCR dari file yang sudah ada di MinIO storage.",
                params: [
                    { name: "bucket", type: "string", required: true, description: "Nama bucket MinIO" },
                    { name: "object_name", type: "string", required: true, description: "Path object di dalam bucket" }
                ],
                curl: `curl -X POST "http://117.53.44.215:8000/api/ocr/extract-from-minio" \\
  -H "X-API-Key: sk-ocr-xxxxx" \\
  -d '{"bucket": "documents", "object_name": "invoice.pdf"}'`
            },
            {
                id: "history",
                method: "GET",
                path: "/api/ocr/history",
                title: "Get Request History",
                description: "Lihat riwayat request OCR yang telah dilakukan.",
                curl: `curl -X GET "http://117.53.44.215:8000/api/ocr/history" \\
  -H "X-API-Key: sk-ocr-xxxxx"`
            },
            {
                id: "stats",
                method: "GET",
                path: "/api/ocr/stats",
                title: "Get Usage Stats",
                description: "Lihat statistik penggunaan OCR.",
                curl: `curl -X GET "http://117.53.44.215:8000/api/ocr/stats" \\
  -H "X-API-Key: sk-ocr-xxxxx"`
            },
        ]
    },
    {
        id: "admin",
        title: "Admin Endpoints",
        icon: <Shield className="h-4 w-4" />,
        endpoints: [
            {
                id: "create-key",
                method: "POST",
                path: "/api/admin/keys",
                title: "Generate API Key",
                description: "Buat API key baru untuk client.",
                params: [
                    { name: "name", type: "string", required: true, description: "Nama client/aplikasi" },
                    { name: "is_admin", type: "boolean", required: false, description: "Set true untuk akses admin" }
                ],
                curl: `curl -X POST "http://117.53.44.215:8000/api/admin/keys" \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY" \\
  -d '{"name": "Client ABC", "is_admin": false}'`
            },
            {
                id: "list-keys",
                method: "GET",
                path: "/api/admin/keys",
                title: "List API Keys",
                description: "Lihat semua API keys yang terdaftar.",
                curl: `curl -X GET "http://117.53.44.215:8000/api/admin/keys" \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY"`
            },
            {
                id: "revoke-key",
                method: "DELETE",
                path: "/api/admin/keys/{id}",
                title: "Revoke API Key",
                description: "Hapus/Nonaktifkan API key tertentu.",
                curl: `curl -X DELETE "http://117.53.44.215:8000/api/admin/keys/123" \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY"`
            }
        ]
    },
    {
        id: "learning",
        title: "Learning Dictionary",
        icon: <BookOpen className="h-4 w-4" />,
        endpoints: [
            {
                id: "learning-pending",
                method: "GET",
                path: "/api/learning/pending",
                title: "Get Pending Words",
                description: "Lihat kata-kata baru yang menunggu approval untuk masuk kamus.",
                curl: `curl -X GET "http://117.53.44.215:8000/api/learning/pending" \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY"`
            },
            {
                id: "learning-approve",
                method: "POST",
                path: "/api/learning/approve/{word}",
                title: "Approve Word",
                description: "Setujui kata untuk masuk ke kamus global.",
                curl: `curl -X POST "http://117.53.44.215:8000/api/learning/approve/customword" \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY"`
            },
            {
                id: "learning-import",
                method: "POST",
                path: "/api/learning/import",
                title: "Import Dictionary",
                description: "Import banyak kata sekaligus ke dictionary (merge/replace).",
                curl: `curl -X POST "http://117.53.44.215:8000/api/learning/import" \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY" \\
  -d '{"words": [{"word": "example", "frequency": 1}], "mode": "merge"}'`
            },
            {
                id: "learning-export",
                method: "GET",
                path: "/api/learning/export",
                title: "Export Dictionary",
                description: "Download seluruh isi kamus dalam format JSON.",
                curl: `curl -X GET "http://117.53.44.215:8000/api/learning/export" \\
  -H "X-Admin-Key: YOUR_ADMIN_KEY"`
            }
        ]
    }
];

export function ApiDocs() {
    const { t } = useLanguage();
    const [selectedEndpointId, setSelectedEndpointId] = useState<string>("extract");
    const [copied, setCopied] = useState(false);

    // Find selected endpoint
    const selectedEndpoint = apiData
        .flatMap(cat => cat.endpoints)
        .find(ep => ep.id === selectedEndpointId) || apiData[0].endpoints[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(selectedEndpoint.curl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getMethodColor = (method: Method) => {
        switch (method) {
            case "POST": return "bg-blue-600/20 text-blue-400 border-blue-500/30";
            case "GET": return "bg-green-600/20 text-green-400 border-green-500/30";
            case "DELETE": return "bg-red-600/20 text-red-400 border-red-500/30";
            case "PUT": return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
            default: return "bg-gray-600/20 text-gray-400 border-gray-500/30";
        }
    };

    return (
        <section id="api" className="py-24 bg-black/40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">API Documentation</h2>
                    <p className="text-gray-400">Complete reference for OCR-PUR endpoints, including Admin and Learning features.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    {/* Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                        {apiData.map((category) => (
                            <div key={category.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    {category.icon}
                                    {category.title}
                                </div>
                                <div className="p-2 space-y-1">
                                    {category.endpoints.map((ep) => (
                                        <button
                                            key={ep.id}
                                            onClick={() => setSelectedEndpointId(ep.id)}
                                            className={clsx(
                                                "w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-md transition-all duration-200",
                                                selectedEndpointId === ep.id
                                                    ? "bg-primary/10 text-primary font-medium ring-1 ring-primary/20"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            <span className="flex items-center gap-2 truncate">
                                                <Badge variant="secondary" className={clsx("text-[10px] h-5 px-1.5 min-w-[40px] justify-center", getMethodColor(ep.method))}>
                                                    {ep.method}
                                                </Badge>
                                                <span className="truncate">{ep.path}</span>
                                            </span>
                                            {selectedEndpointId === ep.id && <ChevronRight className="h-4 w-4 opacity-50 shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8 min-h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedEndpoint.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Header */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Badge className={clsx("text-base px-3 py-1", getMethodColor(selectedEndpoint.method))}>
                                            {selectedEndpoint.method}
                                        </Badge>
                                        <h3 className="text-2xl font-bold text-white break-all">{selectedEndpoint.title}</h3>
                                    </div>
                                    <div className="bg-white/5 rounded-md px-4 py-2 font-mono text-sm text-gray-300 border border-white/10 inline-flex items-center gap-2 break-all">
                                        <span className={clsx("font-bold", getMethodColor(selectedEndpoint.method).split(" ")[1])}>{selectedEndpoint.method}</span>
                                        <span>{selectedEndpoint.path}</span>
                                    </div>
                                    <p className="mt-6 text-gray-400 leading-relaxed text-lg">
                                        {selectedEndpoint.description}
                                    </p>
                                </div>

                                {/* Request Params Table */}
                                {selectedEndpoint.params && (
                                    <div className="mt-8">
                                        <h4 className="text-lg font-semibold text-white mb-4">Request Parameters</h4>
                                        <div className="overflow-hidden rounded-lg border border-white/10">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-white/5 text-gray-400">
                                                    <tr>
                                                        <th className="px-4 py-3 font-medium">Parameter</th>
                                                        <th className="px-4 py-3 font-medium">Type</th>
                                                        <th className="px-4 py-3 font-medium">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/10 bg-white/2">
                                                    {selectedEndpoint.params.map(param => (
                                                        <tr key={param.name}>
                                                            <td className="px-4 py-3 font-mono text-blue-400">
                                                                {param.name}
                                                                {param.required && <span className="ml-2 text-red-500/80 text-xs">*required</span>}
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-500">{param.type}</td>
                                                            <td className="px-4 py-3 text-gray-300">{param.description}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Code Examples */}
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold text-white mb-4">Example Request</h4>
                                    <Card className="bg-[#0B0F19] p-0 overflow-hidden group border-white/10">
                                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
                                            <span className="text-xs text-gray-500 font-mono">cURL</span>
                                            <button onClick={handleCopy} className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5">
                                                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                                <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
                                            </button>
                                        </div>
                                        <div className="p-4 overflow-x-auto custom-scrollbar">
                                            <pre className="text-sm font-mono leading-relaxed text-blue-100 whitespace-pre-wrap">
                                                {selectedEndpoint.curl}
                                            </pre>
                                        </div>
                                    </Card>
                                </div>

                                {/* Response Example */}
                                {selectedEndpoint.response && (
                                    <div className="mt-8">
                                        <h4 className="text-lg font-semibold text-white mb-4">Example Response</h4>
                                        <Card className="bg-[#0B0F19] p-0 overflow-hidden border-white/10">
                                            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
                                                <span className="text-xs text-gray-500 font-mono">JSON</span>
                                                <div className="flex gap-1.5">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                                                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
                                                </div>
                                            </div>
                                            <div className="p-4 overflow-x-auto custom-scrollbar">
                                                <pre className="text-sm font-mono leading-relaxed text-gray-300">
                                                    {selectedEndpoint.response}
                                                </pre>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
