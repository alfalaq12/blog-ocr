"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            layout
                            className="pointer-events-auto bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px] max-w-sm"
                        >
                            <div className={`
                                shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                ${toast.type === "success" && "bg-green-500/10 text-green-500"}
                                ${toast.type === "error" && "bg-red-500/10 text-red-500"}
                                ${toast.type === "warning" && "bg-amber-500/10 text-amber-500"}
                                ${toast.type === "info" && "bg-blue-500/10 text-blue-500"}
                            `}>
                                {toast.type === "success" && <CheckCircle className="w-4 h-4" />}
                                {toast.type === "error" && <X className="w-4 h-4" />}
                                {toast.type === "warning" && <AlertTriangle className="w-4 h-4" />}
                                {toast.type === "info" && <Info className="w-4 h-4" />}
                            </div>

                            <p className="text-sm font-medium text-gray-200 flex-1">{toast.message}</p>

                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
