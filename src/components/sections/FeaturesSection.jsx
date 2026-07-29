// src/components/sections/FeaturesSection.jsx
import { useRef, useState, useEffect } from "react";
import appIcon from '../../assets/app_icon.png';
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
    FiActivity,
    FiSliders,
    FiCloud,
    FiFileText,
    FiCreditCard,
    FiUsers,
    FiWifiOff,
    FiRotateCcw,
    FiTrendingUp,
    FiDollarSign,
    FiZap,
    FiStar,
} from "react-icons/fi";

const features = [
    {
        icon: FiActivity,
        title: "Real-Time Dashboard",
        desc: "Income, expenses, and profit update live. No waiting, no manual totals.",
        gradient: "from-blue-500/20 to-blue-600/5",
        iconColor: "#60A5FA",
        stat: "₹2.4Cr+",
        statLabel: "Profit Tracked",
        delay: 0,
    },
    {
        icon: FiSliders,
        title: "Custom Entry Fields",
        desc: "Add IMEI, Model, Batch — anything. ProfitMate adapts to your business.",
        gradient: "from-emerald-500/20 to-emerald-600/5",
        iconColor: "#34D399",
        stat: "Unlimited",
        statLabel: "Custom Fields",
        delay: 0.1,
    },
    {
        icon: FiCloud,
        title: "Cloud Sync & Backup",
        desc: "Every entry backs up to Google Drive. Switch phones without losing data.",
        gradient: "from-purple-500/20 to-purple-600/5",
        iconColor: "#A78BFA",
        stat: "Auto-Sync",
        statLabel: "Every Entry",
        delay: 0.2,
    },
    {
        icon: FiFileText,
        title: "Professional PDF Reports",
        desc: "One tap turns your ledger into a clean PDF. Ready for partners & accountants.",
        gradient: "from-rose-500/20 to-rose-600/5",
        iconColor: "#FB7185",
        stat: "1-Tap",
        statLabel: "PDF Export",
        delay: 0.3,
    },
    {
        icon: FiCreditCard,
        title: "Payment Tracking",
        desc: "Split payments between online and cash in real-time. Books always match.",
        gradient: "from-amber-500/20 to-amber-600/5",
        iconColor: "#FCD34D",
        stat: "Split Payments",
        statLabel: "Online + Cash",
        delay: 0.4,
    },
    {
        icon: FiUsers,
        title: "Share Division",
        desc: "Running with a partner? Set profit-sharing ratio and let it divide automatically.",
        gradient: "from-indigo-500/20 to-indigo-600/5",
        iconColor: "#818CF8",
        stat: "5 Partners",
        statLabel: "Max Support",
        delay: 0.5,
    },
    {
        icon: FiWifiOff,
        title: "Offline-First",
        desc: "No signal in your shop? No problem. Everything works fully offline.",
        gradient: "from-cyan-500/20 to-cyan-600/5",
        iconColor: "#67E8F9",
        stat: "100%",
        statLabel: "Offline Ready",
        delay: 0.6,
    },
    {
        icon: FiRotateCcw,
        title: "30-Day Recycle Bin",
        desc: "Deleted something by mistake? Recover it within 30 days. Nothing is lost forever.",
        gradient: "from-pink-500/20 to-pink-600/5",
        iconColor: "#F472B6",
        stat: "30 Days",
        statLabel: "Recovery Window",
        delay: 0.7,
    },
];

// Floating particles background
const Particles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/5"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: p.speed,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

const FeatureCard = ({ feature, index, inView }) => {
    const cardRef = useRef(null);
    const isCardInView = useInView(cardRef, { once: false, margin: "-50px" });
    const [isHovered, setIsHovered] = useState(false);

    const Icon = feature.icon;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isCardInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{
                duration: 0.7,
                delay: feature.delay + 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
            style={{
                background: isHovered
                    ? `radial-gradient(circle at 50% 0%, rgba(37,99,235,0.1) 0%, transparent 70%)`
                    : "transparent",
            }}
        >
            {/* Shine effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.8 }}
            />

            {/* Icon with pulse */}
            <div className="relative">
                <motion.div
                    className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/10`}
                    animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Icon className="h-5 w-5" style={{ color: feature.iconColor }} />
                </motion.div>

                {/* Floating stat badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={isHovered ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-full px-2 py-0.5"
                >
                    <span className="text-[9px] font-bold text-white">{feature.stat}</span>
                </motion.div>
            </div>

            {/* Title with animated underline */}
            <motion.h3
                className="mt-3 text-base font-semibold text-white"
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {feature.title}
                <motion.span
                    className="block h-0.5 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] mt-1"
                    initial={{ width: 0 }}
                    animate={isHovered ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.3 }}
                />
            </motion.h3>

            <p className="mt-2 text-sm text-white/50 leading-relaxed">
                {feature.desc}
            </p>

            {/* Bottom stats */}
            <motion.div
                className="mt-3 flex items-center gap-2 text-xs text-white/30"
                animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
                transition={{ duration: 0.3 }}
            >
                <FiStar className="h-3 w-3" />
                <span>{feature.statLabel}</span>
            </motion.div>

            {/* Corner glow */}
            <motion.div
                className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, ${feature.iconColor}15 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                }}
                animate={isHovered ? { scale: 1.5 } : { scale: 0.8 }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
};

const FeaturesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    // Auto-scroll indicator
    const [showScrollHint, setShowScrollHint] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setShowScrollHint(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="features"
            className="py-24 sm:py-32 relative overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 50% 0%, #0a1628 0%, #0a0a0a 100%)",
            }}
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
                <Particles />
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 mx-auto max-w-7xl px-6"
            >
                {/* Header with parallax */}
                <motion.div
                    style={{ y }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 backdrop-blur-sm"
                    >
                        <span className="text-xs font-medium text-[#60A5FA] tracking-wider uppercase">
                            Features That Power Your Business
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                    >
                        <span className="text-white">Built for how </span>
                        <span className="bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                            small businesses
                        </span>
                        <br />
                        <span className="text-white">actually run</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-4 text-lg text-white/40 max-w-2xl mx-auto"
                    >
                        No accounting degree required. Eight features that replace the
                        notebook under your counter.
                    </motion.p>
                </motion.div>

                {/* Features Grid - Mobile ke saath adjust */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:pr-[320px]">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                feature={feature}
                                index={index}
                                inView={isInView}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="mt-4 text-sm text-white/30">
                        100% Free Forever · No Ads · 10+ Businesses Trust
                    </p>
                </motion.div>

                {/* Scroll hint */}
                {showScrollHint && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-1"
                        >
                            <span className="text-xs text-white/20">Scroll for more</span>
                            <div className="w-5 h-8 rounded-full border-2 border-white/10 flex justify-center">
                                <motion.div
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-1 h-2 bg-[#2563EB]/50 rounded-full mt-1"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
};

export default FeaturesSection;