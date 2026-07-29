// src/components/ui/FloatingPhone.jsx
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
    FiArrowUpRight,
    FiTrendingUp,
    FiDollarSign,
    FiStar,
    FiZap,
    FiShield,
    FiWifiOff,
} from "react-icons/fi";

const formatINR = (n) => "₹" + n.toLocaleString("en-IN");

const useCounter = (target, duration = 2000, start = false) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let frame;
        const startTime = performance.now();
        const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [start, target, duration]);
    return value;
};

const FloatingPhone = ({ scrollYProgress }) => {
    const [screenIndex, setScreenIndex] = useState(0);
    const [hasEntered, setHasEntered] = useState(false);
    const containerRef = useRef(null);

    // Check if device is mobile/tablet
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mouse tilt
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateX = useSpring(useTransform(my, [-80, 80], [6, -6]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mx, [-80, 80], [-6, 6]), { stiffness: 150, damping: 20 });

    // Entry animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasEntered(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Screen index based on scroll progress
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(v => {
            if (v < 0.15) setScreenIndex(0);
            else if (v < 0.35) setScreenIndex(1);
            else if (v < 0.55) setScreenIndex(2);
            else if (v < 0.75) setScreenIndex(3);
            else setScreenIndex(0);
        });
        return unsubscribe;
    }, [scrollYProgress]);

    // Counter values
    const profit = useCounter(48250, 2000, true);
    const income = useCounter(112400, 2000, true);
    const expense = useCounter(64150, 2000, true);
    const entries = useCounter(8, 1500, true);

    // Scroll position ke hisaab se movement aur opacity
    const phoneY = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [0, 0, 50, 80]);
    const phoneOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 0.82, 0.9, 1], [1, 1, 1, 0.5, 0, 0]);
    const phoneScale = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [1, 1, 0.7, 0.5]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mx.set(e.clientX - rect.left - rect.width / 2);
        my.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mx.set(0);
        my.set(0);
    };

    // Mobile pe hide ya low opacity
    if (isMobile) {
        return null; // Mobile pe completely hide
        // Ya agar low opacity chahiye toh:
        // return <div className="hidden lg:block" />;
    }

    return (
        <motion.div
            ref={containerRef}
            style={{
                position: 'fixed',
                right: '6%',
                top: '20%',
                y: phoneY,
                scale: phoneScale,
                opacity: phoneOpacity,
                zIndex: 50,
                transform: 'translateY(-50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none',
            }}
            initial={{
                x: '150%',
                opacity: 0,
                rotate: 8,
            }}
            animate={{
                x: hasEntered ? 0 : '150%',
                opacity: hasEntered ? 1 : 0,
                rotate: hasEntered ? 0 : 8,
            }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 25,
                delay: 1.5,
                duration: 1.2,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    perspective: 1400,
                    transformStyle: "preserve-3d",
                    pointerEvents: 'auto',
                }}
                className="relative"
            >
                {/* Glow behind phone */}
                <motion.div
                    className="absolute -inset-8 rounded-full bg-[#2563EB]/20 blur-2xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative rounded-[3rem] border-[3px] border-gray-700 bg-gray-900 p-3 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.4)]"
                >
                    {/* Notch */}
                    <div className="absolute left-1/2 top-3 z-20 h-7 w-32 -translate-x-1/2 rounded-full bg-black" />

                    {/* Phone Screen */}
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#0F172A] to-[#020617] aspect-[9/19] w-[260px] sm:w-[300px]">
                        {/* Status Bar */}
                        <div className="flex items-center justify-between px-6 pt-8 text-[10px] text-gray-400">
                            <span className="font-semibold">9:41</span>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded-full border border-gray-500" />
                                <span className="h-3 w-3 rounded-full border border-gray-500" />
                                <span className="h-3 w-1.5 rounded-full bg-white/80" />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {/* SCREEN 0 - Dashboard */}
                            {screenIndex === 0 && (
                                <motion.div
                                    key="dashboard"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 pt-14 px-5 overflow-y-auto"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.15em]">
                                                Today's Overview
                                            </p>
                                            <div className="mt-1 flex items-end gap-2">
                                                <span className="text-[1.8rem] font-bold tracking-tight text-white leading-none">
                                                    {formatINR(profit)}
                                                </span>
                                                <span className="mb-0.5 flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
                                                    <FiArrowUpRight className="h-2.5 w-2.5" /> 18.4%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB]/20">
                                            <FiTrendingUp className="h-4 w-4 text-[#2563EB]" />
                                        </div>
                                    </div>

                                    {/* Chart */}
                                    <div className="mt-4 flex h-14 items-end gap-1 px-1">
                                        {[35, 55, 30, 75, 50, 85, 65, 40, 70, 55].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                                                className={`flex-1 rounded-t-sm ${i === 5 || i === 8
                                                        ? "bg-gradient-to-t from-[#2563EB] to-[#60A5FA]"
                                                        : "bg-white/10"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-4 grid grid-cols-3 gap-1.5">
                                        {[
                                            { label: "Income", value: formatINR(income), color: "#059669" },
                                            { label: "Expense", value: formatINR(expense), color: "#DC2626" },
                                            { label: "Entries", value: entries, color: "#2563EB" },
                                        ].map((item) => (
                                            <div key={item.label} className="rounded-xl bg-white/5 p-2.5">
                                                <p className="text-[8px] text-gray-500 uppercase tracking-wider">
                                                    {item.label}
                                                </p>
                                                <p className="mt-0.5 text-sm font-bold text-white" style={{ color: item.color }}>
                                                    {typeof item.value === 'string' ? item.value : item.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Entries */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <p className="text-[9px] font-medium text-gray-400">Recent Entries</p>
                                            <p className="text-[8px] text-[#60A5FA]">See All</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            {[
                                                { name: "iPhone 15 Pro", type: "Sales", amount: "₹50,000", color: "#059669" },
                                                { name: "Screen Repair", type: "Service", amount: "₹2,500", color: "#2563EB" },
                                            ].map((entry, i) => (
                                                <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                                        <div>
                                                            <p className="text-[10px] font-medium text-white">{entry.name}</p>
                                                            <p className="text-[7px] text-gray-500">{entry.type}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-semibold text-white">{entry.amount}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* SCREEN 1 - Features */}
                            {screenIndex === 1 && (
                                <motion.div
                                    key="features"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 pt-14 px-5"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2563EB]/20">
                                            <FiZap className="h-4 w-4 text-[#2563EB]" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-medium text-gray-500 uppercase tracking-[0.15em]">
                                                Features
                                            </p>
                                            <p className="text-sm font-bold text-white">Everything you need</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {[
                                            { icon: FiTrendingUp, title: "Real-Time Dashboard", desc: "Live profit tracking", color: "#2563EB" },
                                            { icon: FiDollarSign, title: "Payment Tracking", desc: "Online + Cash split", color: "#059669" },
                                            { icon: FiStar, title: "Custom Fields", desc: "IMEI, Model, Batch", color: "#F59E0B" },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -15 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.08 }}
                                                className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
                                            >
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                                                    <item.icon className="h-4 w-4" style={{ color: item.color }} />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-medium text-white">{item.title}</p>
                                                    <p className="text-[8px] text-gray-500">{item.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-3 rounded-xl bg-gradient-to-r from-[#2563EB]/20 to-[#1D4ED8]/20 p-3 border border-[#2563EB]/20">
                                        <div className="flex items-center gap-2">
                                            <FiShield className="h-3 w-3 text-[#60A5FA]" />
                                            <p className="text-[9px] text-white/60">
                                                <span className="text-white font-medium">100% Free</span> · No Ads · Offline Mode
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* SCREEN 2 - Entry Form */}
                            {screenIndex === 2 && (
                                <motion.div
                                    key="entry"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 pt-14 px-5"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#059669]/20">
                                            <FiArrowUpRight className="h-4 w-4 text-[#059669]" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-medium text-gray-500 uppercase tracking-[0.15em]">
                                                New Entry
                                            </p>
                                            <p className="text-sm font-bold text-white">Add Transaction</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1.5 mb-3">
                                        {["Sales", "Service", "Expense"].map((cat, i) => (
                                            <div
                                                key={cat}
                                                className={`rounded-full px-3 py-1 text-[9px] font-medium ${i === 0 ? "bg-[#059669] text-white" : "bg-white/10 text-gray-400"
                                                    }`}
                                            >
                                                {cat}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        {[
                                            { label: "Title *", value: "iPhone 15 Pro Max" },
                                            { label: "Amount *", value: "₹50,000" },
                                            { label: "Customer", value: "Rahul Sharma" },
                                            { label: "Payment", value: "UPI · Paid" },
                                        ].map((field, i) => (
                                            <div key={i} className="rounded-xl bg-white/5 px-3.5 py-2.5">
                                                <p className="text-[8px] text-gray-500">{field.label}</p>
                                                <p className="mt-0.5 text-xs font-medium text-white">{field.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 rounded-xl bg-[#059669] px-4 py-2.5 text-center">
                                        <p className="text-xs font-semibold text-white">Save Entry</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* SCREEN 3 - Reports */}
                            {screenIndex === 3 && (
                                <motion.div
                                    key="reports"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 pt-14 px-5"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#DC2626]/20">
                                            <FiArrowUpRight className="h-4 w-4 text-[#DC2626]" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-medium text-gray-500 uppercase tracking-[0.15em]">
                                                Reports
                                            </p>
                                            <p className="text-sm font-bold text-white">PDF Reports</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {[
                                            { label: "Date Range", value: "July 2025" },
                                            { label: "Total Income", value: "₹1,12,400", color: "#059669" },
                                            { label: "Total Expense", value: "₹64,150", color: "#DC2626" },
                                            { label: "Net Profit", value: "₹48,250", color: "#2563EB" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5">
                                                <p className="text-[9px] text-gray-500">{item.label}</p>
                                                <p className="text-xs font-semibold" style={{ color: item.color || '#fff' }}>
                                                    {item.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 rounded-xl bg-[#DC2626] px-4 py-2.5 text-center">
                                        <p className="text-xs font-semibold text-white">Generate PDF Report</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 2.0, duration: 0.6, ease: "easeOut" }}
                    className="absolute -left-10 top-20 hidden items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:flex"
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB]/10">
                        <FiWifiOff className="h-3.5 w-3.5 text-[#2563EB]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-gray-900">Offline Mode</p>
                        <p className="text-[8px] text-gray-400">No internet needed</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 2.3, duration: 0.6, ease: "easeOut" }}
                    className="absolute -right-9 bottom-24 hidden items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg sm:flex"
                >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#059669]/10">
                        <FiShield className="h-3.5 w-3.5 text-[#059669]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold text-gray-900">Secure Backup</p>
                        <p className="text-[8px] text-gray-400">Google Drive Sync</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default FloatingPhone;