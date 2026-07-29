// src/components/sections/StatsSection.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
    FiUsers,
    FiDollarSign,
    FiStar,
    FiShield,
    FiTrendingUp,
    FiZap,
} from "react-icons/fi";

const stats = [
    {
        icon: FiUsers,
        value: "10+",
        label: "Businesses Trust",
        color: "#2563EB",
        bg: "from-blue-500/20 to-blue-600/5",
        delay: 0,
        suffix: "+",
    },
    {
        icon: FiDollarSign,
        value: "₹2.4Cr+",
        label: "Profit Tracked",
        color: "#059669",
        bg: "from-emerald-500/20 to-emerald-600/5",
        delay: 0.1,
        suffix: "Cr+",
    },
    {
        icon: FiStar,
        value: "4.8★",
        label: "User Rating",
        color: "#F59E0B",
        bg: "from-amber-500/20 to-amber-600/5",
        delay: 0.2,
        suffix: "★",
    },
    {
        icon: FiShield,
        value: "100%",
        label: "Secure & Private",
        color: "#7C3AED",
        bg: "from-purple-500/20 to-purple-600/5",
        delay: 0.3,
        suffix: "%",
    },
];

// Floating particles background
const Particles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, () => ({
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
                        opacity: [0.2, 0.6, 0.2],
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

const StatsCard = ({ stat, index, inView }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = stat.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
            transition={{
                duration: 0.6,
                delay: stat.delay + 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden text-center"
            style={{
                background: isHovered
                    ? `radial-gradient(circle at 50% 0%, ${stat.color}15 0%, transparent 70%)`
                    : "transparent",
            }}
        >
            {/* Shine effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.8 }}
            />

            {/* Icon with pulse */}
            <motion.div
                className="relative inline-flex"
                animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br border border-white/10"
                    style={{
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}05)`,
                        borderColor: isHovered ? stat.color : 'rgba(255,255,255,0.1)',
                    }}
                >
                    <Icon className="h-8 w-8" style={{ color: stat.color }} />
                </div>

                {/* Floating glow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl blur-xl"
                    style={{ background: stat.color }}
                    animate={{
                        opacity: isHovered ? 0.3 : 0,
                        scale: isHovered ? 1.2 : 0.8,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </motion.div>

            {/* Value with counter animation */}
            <motion.div
                className="mt-4 text-3xl sm:text-4xl font-bold text-white"
                style={{ color: stat.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: stat.delay + 0.4, duration: 0.5 }}
            >
                {stat.value}
            </motion.div>

            {/* Label */}
            <motion.p
                className="mt-1.5 text-sm text-white/50 font-medium"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: stat.delay + 0.5, duration: 0.4 }}
            >
                {stat.label}
            </motion.p>

            {/* Animated underline on hover */}
            <motion.div
                className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"
                initial={{ width: 0, x: "-50%" }}
                animate={isHovered ? { width: "80%", x: "-50%" } : { width: 0, x: "-50%" }}
                transition={{ duration: 0.3 }}
            />

            {/* Corner glow */}
            <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                }}
                animate={isHovered ? { scale: 1.5 } : { scale: 0.8 }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
};

const StatsSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section
            ref={sectionRef}
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
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 backdrop-blur-sm"
                    >
                        <FiZap className="h-4 w-4 text-[#60A5FA]" />
                        <span className="text-xs font-medium text-[#60A5FA] tracking-wider uppercase">
                            Trusted by Businesses
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                    >
                        <span className="text-white">Numbers That </span>
                        <span className="bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                            Speak For Themselves
                        </span>
                    </motion.h2>

                </motion.div>

                {/* Stats Grid - Mobile ke saath adjust */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:pr-[320px]">
                    {stats.map((stat, index) => (
                        <StatsCard
                            key={index}
                            stat={stat}
                            index={index}
                            inView={isInView}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="mt-4 text-sm text-white/30">
                        100% Free Forever · No Ads · Secure & Private
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default StatsSection;