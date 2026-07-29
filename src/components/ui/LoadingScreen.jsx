// src/components/ui/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';
import appIcon from '../../assets/app_icon.png';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsComplete(true);
                    return 100;
                }
                // Faster at start, slower at end for realistic feel
                const increment = prev < 30 ? 3 : prev < 60 ? 2 : 1.5;
                return Math.min(prev + increment, 100);
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.6, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 50% 50%, #0a1628 0%, #0a0a0a 100%)",
            }}
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Glow behind logo */}
            <motion.div
                className="absolute w-64 h-64 rounded-full bg-[#2563EB]/20 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 text-center px-6">
                {/* Logo with pulse */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mx-auto mb-6 relative"
                >
                    <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-2xl shadow-[#2563EB]/30 flex items-center justify-center overflow-hidden">
                        <img
                            src={appIcon}
                            alt="ProfitMate Lite"
                            className="w-20 h-20 object-contain"
                        />
                    </div>

                    {/* Rotating ring */}
                    <motion.div
                        className="absolute -inset-1 rounded-2xl border-2 border-transparent"
                        style={{
                            background: "conic-gradient(from 0deg, transparent, #2563EB, transparent, #60A5FA, transparent)",
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                            padding: "2px",
                        }}
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </motion.div>

                {/* App Name */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl font-bold text-white tracking-tight"
                >
                    ProfitMate
                    <span className="text-[#60A5FA]"> Lite</span>
                </motion.h2>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-white/40 text-sm mt-1 tracking-wide"
                >
                    Track Your Profit, Grow Your Business
                </motion.p>

                {/* Progress Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8"
                >
                    {/* Progress Bar Container */}
                    <div className="w-64 mx-auto h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                        {/* Glow behind progress */}
                        <div className="absolute inset-0 bg-[#2563EB]/20 blur-sm" />

                        {/* Progress Bar */}
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] rounded-full relative"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                            style={{
                                boxShadow: "0 0 20px rgba(37,99,235,0.3)",
                            }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{
                                    x: ["-100%", "200%"],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Percentage with counter */}
                    <div className="flex items-center justify-center gap-2 mt-2.5">
                        <motion.span
                            className="text-sm font-medium text-white/60"
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {Math.floor(progress)}%
                        </motion.span>
                        <span className="text-xs text-white/20">•</span>
                        <motion.span
                            className="text-xs text-white/30"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5,
                                ease: "easeInOut",
                            }}
                        >
                            Loading...
                        </motion.span>
                    </div>
                </motion.div>

                {/* Loading dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-6 flex items-center justify-center gap-1.5"
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-white/20 text-xs mt-8 tracking-wider"
                >
                    BROTHERHOOD SOFTECH
                </motion.p>
            </div>
        </motion.div>
    );
}