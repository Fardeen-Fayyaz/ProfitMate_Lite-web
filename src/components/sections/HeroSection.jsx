// src/components/sections/HeroSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import appIcon from '../../assets/app_icon.png';
import {
    FiTrendingUp,
    FiArrowRight,
    FiDownload,
    FiStar,
    FiDollarSign,
} from "react-icons/fi";

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

const HeroSection = () => {
    const sectionRef = useRef(null);
    const [counterStarted, setCounterStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setCounterStarted(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const businesses = useCounter(10, 1000, counterStarted);
    const profitTracked = useCounter(240, 2000, counterStarted);
    const rating = useCounter(10, 1500, counterStarted);

    return (
        <section ref={sectionRef} className="min-h-screen flex items-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1D4ED8]/5 rounded-full blur-3xl" />

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[#2563EB]/10"
                        style={{
                            width: Math.random() * 4 + 2,
                            height: Math.random() * 4 + 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30 - Math.random() * 50, 0],
                            x: [0, (Math.random() - 0.5) * 30, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>

            <div className="w-full relative z-10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-2xl">
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/15 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm"
                        >
                            <span className="text-xs font-medium text-gray-600">Trusted by 10+ businesses</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-6 text-4xl font-extrabold leading-[1.1] text-gray-900 sm:text-5xl lg:text-[3.2rem]"
                        >
                            Track Your Profit,
                            <br />
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                    Grow Your Business.
                                </span>
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2563EB] to-[#60A5FA]"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                />
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-5 max-w-md text-base leading-relaxed text-gray-500"
                        >
                            Every sale, every expense, every rupee — logged in seconds.
                            <span className="block mt-1">
                                ProfitMate Lite gives shop owners a real-time profit picture,
                                <span className="relative">
                                    <span className="text-[#2563EB] font-medium"> even without internet.</span>
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2563EB]/30"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 1.8, duration: 0.5 }}
                                    />
                                </span>
                            </span>
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8 flex flex-wrap items-center gap-4"
                        >
                            <a
                                href="/ProfitMate-Lite.apk"
                                download="ProfitMate-Lite.apk"
                                className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25 hover:shadow-[#2563EB]/40 transition-all duration-300 hover:scale-105"
                            >
                                <FiDownload className="h-4 w-4" />
                                Download for Android
                                <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-xs text-gray-400"
                            >
                                Free forever · No ads
                            </motion.span>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-12 grid max-w-sm grid-cols-3 gap-6 border-t border-gray-200 pt-8"
                        >
                            {[
                                { value: businesses, label: "Businesses", suffix: "+", icon: FiStar },
                                { value: profitTracked, label: "Profit Tracked", prefix: "₹", suffix: "Cr+", icon: FiDollarSign },
                                { value: rating, label: "User Rating", suffix: "★", icon: FiTrendingUp },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="text-center group"
                                >
                                    <motion.div
                                        className="flex items-center gap-2 justify-center"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                    >
                                        <item.icon className="h-3.5 w-3.5 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <p className="text-xl font-bold text-gray-900">
                                            {item.prefix}{item.value}{item.suffix}
                                        </p>
                                    </motion.div>
                                    <p className="mt-0.5 text-[11px] text-gray-400">
                                        {item.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;