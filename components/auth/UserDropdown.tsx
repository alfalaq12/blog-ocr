"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Crown, Zap, ChevronDown } from "lucide-react";
import Link from "next/link";

import { useLanguage } from "@/lib/i18n";

interface UserDropdownProps {
    scanRemaining?: number;
    tier?: string;
}

export function UserDropdown({ scanRemaining = 0, tier = "free" }: UserDropdownProps) {
    const { t } = useLanguage();
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

    // Track mount state for portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Update button position when dropdown opens
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            setButtonRect(buttonRef.current.getBoundingClientRect());
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on scroll
    useEffect(() => {
        if (isOpen) {
            const handleScroll = () => setIsOpen(false);
            window.addEventListener("scroll", handleScroll, true);
            return () => window.removeEventListener("scroll", handleScroll, true);
        }
    }, [isOpen]);

    if (!user) return null;

    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0];
    const isPro = tier === "pro";

    const dropdownContent = isOpen && buttonRect && (
        <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed w-64 rounded-xl bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-[9999]"
            style={{
                top: `${buttonRect.bottom + 8}px`,
                right: `${window.innerWidth - buttonRect.right}px`,
            }}
        >
            {/* User Info Header */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={displayName}
                            className="w-10 h-10 rounded-full ring-2 ring-purple-500/50"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{displayName}</p>
                        <p className="text-gray-400 text-xs truncate">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Subscription Status */}
            <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">{t.userDropdown.plan}</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${isPro ? "text-purple-400" : "text-gray-300"}`}>
                        {isPro ? (
                            <>
                                <Crown className="w-4 h-4" />
                                {t.userDropdown.pro}
                            </>
                        ) : (
                            <>
                                <Zap className="w-4 h-4" />
                                {t.userDropdown.free}
                            </>
                        )}
                    </span>
                </div>
                {!isPro && (
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{t.userDropdown.scansToday}</span>
                        <span className="text-white text-sm font-mono">
                            {10 - scanRemaining}/10
                        </span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-2">
                {!isPro && (
                    <Link
                        href="/pricing"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-purple-500/10 text-purple-400 transition-colors"
                    >
                        <Crown className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.userDropdown.upgrade}</span>
                    </Link>
                )}
                <button
                    onClick={() => {
                        setIsOpen(false);
                        signOut();
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">{t.userDropdown.signOut}</span>
                </button>
            </div>
        </motion.div>
    );

    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-7 h-7 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"
                    />
                ) : (
                    <div className="w-7 h-7 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-white" />
                    </div>
                )}
                <span className="text-white/80 text-sm font-medium hidden xl:block max-w-[100px] truncate">
                    {displayName}
                </span>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {mounted && createPortal(
                <AnimatePresence>
                    {dropdownContent}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
