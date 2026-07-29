// src/components/sections/DownloadSection.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
    FiDownload,
    FiShield,
    FiCheck,
    FiSmartphone,
    FiStar,
    FiZap,
    FiArrowRight,
    FiTrendingUp,
    FiThumbsUp,
    FiDollarSign,
} from "react-icons/fi";
import appIcon from '../../assets/app_icon.png';

const DownloadSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const [phoneFloat, setPhoneFloat] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setPhoneFloat(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const floatY = Math.sin(phoneFloat * 0.05) * 8;

    return (
        <section
            ref={sectionRef}
            id="download"
            className="py-24 sm:py-32 relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #F1F5F9 100%)",
            }}
        >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563EB]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#60A5FA]/5 rounded-full blur-3xl" />

                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />

                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 left-10 w-16 h-16 rounded-full border-2 border-[#2563EB]/10"
                />
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute bottom-20 right-10 w-24 h-24 rounded-full border-2 border-[#60A5FA]/10"
                />
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 mx-auto max-w-7xl px-6"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20"
                        >
                            <span className="text-xs font-medium text-[#D97706] tracking-wider uppercase">
                                Free Forever
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
                        >
                            Ready to transform
                            <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                                your business?
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-4 text-lg text-gray-500 max-w-lg mx-auto lg:mx-0"
                        >
                            Download ProfitMate Lite now and join 10+ business owners who
                            track their profits with confidence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8 space-y-3"
                        >
                            {[
                                { icon: FiCheck, text: "100% Free Forever", color: "#059669" },
                                { icon: FiCheck, text: "Works Offline", color: "#2563EB" },
                                { icon: FiCheck, text: "No Ads", color: "#7C3AED" },
                                { icon: FiCheck, text: "Secure & Private", color: "#F59E0B" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                                    className="flex items-center gap-3"
                                >
                                    <div
                                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                                        style={{ background: `${item.color}15` }}
                                    >
                                        <item.icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                                    </div>
                                    <span className="text-sm text-gray-600">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-10"
                        >
                            <a
                                href="/ProfitMate-Lite.apk"
                                download="ProfitMate-Lite.apk"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-2xl text-white font-semibold shadow-lg shadow-[#2563EB]/25 hover:shadow-[#2563EB]/40 transition-all duration-300 hover:scale-105"
                            >
                                <FiDownload className="h-5 w-5" />
                                Download for Android
                                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <p className="mt-3 text-sm text-gray-400">
                                Available on Google Play Store · Version 1.0.0
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.7, duration: 0.4 }}
                            className="mt-8 flex flex-wrap items-center gap-6"
                        >
                            {[
                                { icon: FiStar, text: "4.8★ Rating", color: "#F59E0B" },
                                { icon: FiThumbsUp, text: "10+ Downloads", color: "#059669" },
                                { icon: FiShield, text: "Secure", color: "#2563EB" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -2 }}
                                    className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200/50"
                                >
                                    <item.icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                                    <span className="text-xs text-gray-600 font-medium">{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT - Phone Mockup with App Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                        animate={isInView ? {
                            opacity: 1,
                            scale: 1,
                            rotateY: 0,
                            y: floatY,
                        } : {
                            opacity: 0,
                            scale: 0.8,
                            rotateY: 20,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.21, 0.47, 0.32, 0.98],
                            y: { duration: 2, ease: "easeInOut" }
                        }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute -inset-10 rounded-full bg-[#2563EB]/10 blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <div className="relative rounded-[3rem] border-[3px] border-gray-200 bg-white p-3 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)]">
                                <div className="absolute left-1/2 top-3 z-20 h-7 w-32 -translate-x-1/2 rounded-full bg-gray-900" />

                                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0] aspect-[9/19] w-[260px] sm:w-[300px]">
                                    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                                        {/* App Icon with image */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                rotate: [0, 5, -5, 0],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-lg overflow-hidden"
                                        >
                                            <img
                                                src={appIcon}
                                                alt="ProfitMate Lite"
                                                className="h-12 w-12 object-contain"
                                            />
                                        </motion.div>

                                        <h3 className="mt-4 text-xl font-bold text-gray-900">
                                            ProfitMate Lite
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Track Your Profit,
                                            <br />
                                            Grow Your Business
                                        </p>

                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="mt-6 flex items-center gap-2 rounded-full bg-[#2563EB]/10 px-4 py-1.5 border border-[#2563EB]/20"
                                        >
                                            <FiCheck className="h-3 w-3 text-[#2563EB]" />
                                            <span className="text-[10px] text-[#2563EB] font-medium">
                                                Ready to Download
                                            </span>
                                        </motion.div>

                                        <div className="mt-4 flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <FiDollarSign className="h-3 w-3 text-[#059669]" />
                                                <span className="text-[10px] text-gray-500">Free</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FiShield className="h-3 w-3 text-[#2563EB]" />
                                                <span className="text-[10px] text-gray-500">Secure</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FiSmartphone className="h-3 w-3 text-[#F59E0B]" />
                                                <span className="text-[10px] text-gray-500">Offline</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <motion.div
                                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -20, scale: 0.8 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="absolute -left-10 top-20 hidden items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-3 py-2 border border-gray-200/50 shadow-lg sm:flex"
                            >
                                <img
                                    src={appIcon}
                                    alt="ProfitMate Lite"
                                    className="h-5 w-5 rounded-lg"
                                />
                                <div>
                                    <p className="text-[10px] font-semibold text-gray-900">ProfitMate Lite</p>
                                    <p className="text-[8px] text-gray-400">4.8★ Rating</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 20, scale: 0.8 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -right-9 bottom-24 hidden items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-3 py-2 border border-gray-200/50 shadow-lg sm:flex"
                            >
                                <FiShield className="h-4 w-4 text-[#059669]" />
                                <div>
                                    <p className="text-[10px] font-semibold text-gray-900">Secure</p>
                                    <p className="text-[8px] text-gray-400">Privacy first</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="inline-block p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg"
                    >
                        <p className="text-sm text-gray-600">
                            <span className="text-gray-900 font-semibold">100% Free Forever</span>
                            {" · "}
                            <span className="text-gray-500">No Ads</span>
                            {" · "}
                            <span className="text-gray-500">Secure & Private</span>
                            {" · "}
                            <span className="text-gray-500">Offline Mode</span>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default DownloadSection;