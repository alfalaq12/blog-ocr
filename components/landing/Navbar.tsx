"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Github, ScanText, Globe, Menu, X, LogOut, User, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { AuthButton } from "@/components/auth/AuthButton";
import { UserDropdown } from "@/components/auth/UserDropdown";
import { useToast } from "@/components/ui/Toast";

const menuItemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
    exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

const drawerVariants = {
    hidden: {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
    },
    visible: {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        transition: {
            clipPath: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
            opacity: { duration: 0.25 },
        },
    },
    exit: {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        transition: {
            clipPath: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
            opacity: { duration: 0.2 },
        },
    },
};

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const { user, loading, signOut } = useAuth();
    const { showToast } = useToast();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "id" : "en");
    };

    const closeMenu = () => setIsMenuOpen(false);

    // Close menu after OAuth redirect
    useEffect(() => {
        // Check if we just came back from OAuth and menu was open
        const wasMenuOpen = sessionStorage.getItem('mobileMenuWasOpen');
        if (wasMenuOpen === 'true' && user) {
            closeMenu();
            sessionStorage.removeItem('mobileMenuWasOpen');
        }
    }, [user]);

    // Save menu state before auth redirect
    const handleAuthClick = () => {
        if (isMenuOpen) {
            sessionStorage.setItem('mobileMenuWasOpen', 'true');
        }
    };

    // Close menu on click outside
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    // Close menu on resize past lg breakpoint
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const handler = () => { if (mq.matches) closeMenu(); };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Prevent body scroll when menu open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    const navLinks = [
        { href: "/", label: t.nav.home },
        { href: "/playground", label: t.nav.playground },
        { href: "/docs", label: t.nav.api },
        { href: "/pricing", label: t.nav.pricing },
        { href: "/integrations", label: t.nav.integrations },
    ];

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-white/5 transition-[border-radius] duration-300 ${isMenuOpen ? "rounded-2xl" : "rounded-full"}`}
        >
            <div className={`absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] pointer-events-none transition-[border-radius] duration-300 ${isMenuOpen ? "rounded-2xl" : "rounded-full"}`} />

            <div className="flex h-12 items-center px-4 sm:px-5">
                {/* Logo - fixed width */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <ScanText className="h-4 w-4" />
                    </div>
                    <span className="text-base font-bold tracking-tight text-white/90 whitespace-nowrap">OCR-PUR</span>
                </div>

                {/* Nav Links - centered (desktop only) */}
                <div className="hidden lg:flex items-center justify-center gap-4 flex-1 max-w-md mx-auto">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-xs font-medium text-gray-400 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                            {link.label}
                        </Link>
                    ))}
                    {user && (
                        <button
                            onClick={() => showToast("Fitur Dashboard sedang dalam tahap pengembangan 🚧", "info")}
                            className="text-xs font-medium text-purple-400 transition-colors hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] bg-transparent border-none cursor-pointer"
                        >
                            {t.nav.dashboard}
                        </button>
                    )}
                </div>

                {/* Spacer for mobile */}
                <div className="flex-1 lg:hidden" />

                {/* Right Side - fixed width */}
                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full px-2.5 h-7 text-xs font-medium"
                    >
                        <Globe className="mr-1 h-3 w-3" />
                        {language.toUpperCase()}
                    </Button>

                    <Link href="https://github.com/alfalaq12/OCR" target="_blank" className="hidden md:block">
                        <Button className="gap-1.5 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] h-7 px-3 text-xs font-semibold text-white">
                            <Github className="h-3 w-3" />
                            <span className="hidden sm:inline">{t.nav.star}</span>
                        </Button>
                    </Link>

                    {/* Auth Section (desktop) */}
                    <div className="hidden lg:block">
                        {!loading && (
                            user ? <UserDropdown /> : <div onClick={handleAuthClick}><AuthButton /></div>
                        )}
                    </div>

                    {/* Hamburger Button (mobile) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden relative flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        <motion.span
                            className="absolute"
                            initial={false}
                            animate={{ rotate: isMenuOpen ? 90 : 0, opacity: isMenuOpen ? 0 : 1 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Menu className="h-4 w-4" />
                        </motion.span>
                        <motion.span
                            className="absolute"
                            initial={false}
                            animate={{ rotate: isMenuOpen ? 0 : -90, opacity: isMenuOpen ? 1 : 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <X className="h-4 w-4" />
                        </motion.span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="lg:hidden border-t border-white/10 px-4 pb-5 pt-3"
                        style={{ willChange: "clip-path, opacity" }}
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    variants={menuItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={i}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={closeMenu}
                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/5 hover:text-white hover:pl-4"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {user && (
                                <motion.div
                                    variants={menuItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={navLinks.length}
                                >
                                    <button
                                        onClick={() => {
                                            showToast("Fitur Dashboard sedang dalam tahap pengembangan 🚧", "info");
                                            closeMenu();
                                        }}
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-purple-400 transition-all duration-200 hover:bg-purple-500/10 hover:text-purple-300 hover:pl-4 bg-transparent border-none cursor-pointer text-left"
                                    >
                                        {t.nav.dashboard}
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Mobile Bottom Actions */}
                        <motion.div
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            custom={navLinks.length + 1}
                            className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-3"
                        >
                            <Link href="https://github.com/alfalaq12/OCR" target="_blank" onClick={closeMenu}>
                                <Button className="w-full gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] h-10 text-sm font-semibold text-white">
                                    <Github className="h-4 w-4" />
                                    {t.nav.star}
                                </Button>
                            </Link>

                            {!loading && (
                                user ? (
                                    <div className="mt-1 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                                        {/* User Info */}
                                        <div className="flex items-center gap-3 p-3">
                                            {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                                                <img
                                                    src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                                                    alt={user.user_metadata?.full_name || user.user_metadata?.name || ""}
                                                    className="w-9 h-9 rounded-full ring-2 ring-purple-500/40 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">
                                                    {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0]}
                                                </p>
                                                <p className="text-gray-400 text-xs truncate">{user.email}</p>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs font-medium text-gray-300 bg-white/5 px-2 py-1 rounded-full border border-white/10 shrink-0">
                                                <Zap className="w-3 h-3" />
                                                {t.userDropdown.free}
                                            </span>
                                        </div>
                                        {/* Upgrade to Pro */}
                                        <Link
                                            href="/pricing"
                                            onClick={closeMenu}
                                            className="flex items-center justify-center gap-2 w-full p-2.5 text-purple-400 text-sm font-medium border-t border-white/10 hover:bg-purple-500/10 transition-colors"
                                        >
                                            <Zap className="w-4 h-4" />
                                            {t.userDropdown.upgrade}
                                        </Link>
                                        {/* Sign Out */}
                                        <button
                                            onClick={() => {
                                                closeMenu();
                                                signOut();
                                            }}
                                            className="flex items-center justify-center gap-2 w-full p-2.5 text-red-400 text-sm font-medium border-t border-white/10 hover:bg-red-500/10 transition-colors bg-transparent cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            {t.userDropdown.signOut}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center pt-1" onClick={handleAuthClick}>
                                        <AuthButton />
                                    </div>
                                )
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
