// src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiDownload, FiChevronDown, FiTrendingUp } from "react-icons/fi";
import appIcon from '../../assets/app_icon.png';

const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 20);

            // Active section detection
            const sections = navItems.map(item => item.href.replace('#', ''));
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsMobileOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileOpen]);

    // Navbar always dark text on hero section (since hero is light background)
    // Or scrolled state
    const isDark = true; // Always dark text because hero has light background

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.6,
                    ease: [0.21, 0.47, 0.32, 0.98],
                    delay: 0.2
                }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-lg shadow-gray-200/20"
                    : "bg-white/90 backdrop-blur-sm border-b border-gray-100/30"
                    }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2.5 group"
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute -inset-2 rounded-full bg-[#2563EB]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <img
                                    src={appIcon}
                                    alt="ProfitMate Lite"
                                    className="relative h-9 w-9 rounded-xl shadow-lg shadow-[#2563EB]/10 group-hover:shadow-[#2563EB]/20 transition-shadow duration-300"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-gray-900 transition-colors duration-300">
                                    ProfitMate
                                </span>
                                <span className="text-[10px] font-medium tracking-wider text-[#2563EB] transition-colors duration-300">
                                    LITE
                                </span>
                            </div>
                        </motion.a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.replace('#', '');
                                return (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${isActive
                                            ? "text-[#2563EB] bg-[#2563EB]/10"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                                            }`}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.span
                                                layoutId="activeNav"
                                                className="absolute inset-0 rounded-xl border border-[#2563EB]/20"
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </motion.a>
                                );
                            })}

                            <a
                                href="/ProfitMate-Lite.apk"
                                download="ProfitMate-Lite.apk"
                                className="ml-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] shadow-md shadow-[#2563EB]/20 hover:shadow-[#2563EB]/30 transition-all duration-300 hover:scale-105"
                            >
                                <FiDownload className="h-4 w-4" />
                                Download
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <motion.button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="md:hidden p-2 rounded-xl transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                            aria-label="Toggle menu"
                        >
                            {isMobileOpen ? (
                                <FiX className="h-6 w-6" />
                            ) : (
                                <FiMenu className="h-6 w-6" />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Scroll progress bar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8]"
                    style={{
                        width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
                    }}
                    transition={{ duration: 0.1 }}
                />
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{
                                type: "spring",
                                damping: 30,
                                stiffness: 300,
                                ease: [0.21, 0.47, 0.32, 0.98]
                            }}
                            className="relative bg-white rounded-b-3xl shadow-2xl pt-20 pb-8 px-6 mx-4 mt-4"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] rounded-t-3xl" />

                            <div className="flex flex-col gap-2">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="group flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-[#2563EB] rounded-xl hover:bg-[#2563EB]/5 transition-all duration-300"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors">
                                            <FiTrendingUp className="h-4 w-4" />
                                        </span>
                                        {item.name}
                                        <motion.span
                                            className="ml-auto text-xs text-gray-400 group-hover:text-[#2563EB]"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.a>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-4 px-4"
                                >
                                    <motion.a
                                        href="#download"
                                        onClick={() => setIsMobileOpen(false)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25"
                                    >
                                        <FiDownload className="h-5 w-5" />
                                        Download App
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.a>
                                    <p className="mt-2 text-center text-xs text-gray-400">
                                        100% Free · No Ads · Offline Mode
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-6"
                                >
                                    <img
                                        src={appIcon}
                                        alt="ProfitMate Lite"
                                        className="h-6 w-6 rounded-lg"
                                    />
                                    <span className="text-xs text-gray-400">
                                        by BROTHERHOOD SOFTECH
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;