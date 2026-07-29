// src/components/sections/HowItWorksSection.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
    FiUserCheck,
    FiEdit,
    FiBarChart2,
    FiDownload,
    FiArrowRight,
    FiCheckCircle,
    FiZap,
} from "react-icons/fi";

const steps = [
    {
        step: "01",
        icon: FiUserCheck,
        title: "Set Up Your Shop",
        desc: "Enter shop details, choose categories, and customize fields to match your exact business workflow.",
        color: "#2563EB",
        bg: "from-blue-500/20 to-blue-600/5",
        delay: 0,
    },
    {
        step: "02",
        icon: FiEdit,
        title: "Add Daily Entries",
        desc: "Record sales, expenses, and orders in seconds with smart auto-suggestions from previous entries.",
        color: "#059669",
        bg: "from-emerald-500/20 to-emerald-600/5",
        delay: 0.1,
    },
    {
        step: "03",
        icon: FiBarChart2,
        title: "Track & Analyze",
        desc: "View real-time profit/loss, filter by dates, and discover which categories perform best.",
        color: "#F59E0B",
        bg: "from-amber-500/20 to-amber-600/5",
        delay: 0.2,
    },
    {
        step: "04",
        icon: FiDownload,
        title: "Generate Reports",
        desc: "One-tap professional PDF reports ready to share with your accountant or business partners.",
        color: "#DC2626",
        bg: "from-rose-500/20 to-rose-600/5",
        delay: 0.3,
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

const StepCard = ({ step, index, inView }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = step.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{
                duration: 0.6,
                delay: step.delay + 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
            style={{
                background: isHovered
                    ? `radial-gradient(circle at 50% 0%, ${step.color}15 0%, transparent 70%)`
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

            {/* Step number and icon */}
            <div className="flex items-center gap-4">
                <motion.div
                    className="relative"
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br border border-white/10"
                        style={{
                            background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                            borderColor: isHovered ? step.color : 'rgba(255,255,255,0.1)',
                        }}
                    >
                        <Icon className="h-7 w-7" style={{ color: step.color }} />
                    </div>
                    <motion.div
                        className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-[10px] font-bold text-white"
                        animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step.step}
                    </motion.div>
                </motion.div>

                <div>
                    <motion.h3
                        className="text-lg font-semibold text-white"
                        animate={isHovered ? { x: 5 } : { x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step.title}
                        <motion.span
                            className="block h-0.5 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] mt-1"
                            initial={{ width: 0 }}
                            animate={isHovered ? { width: "100%" } : { width: "0%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.h3>
                </div>
            </div>

            <p className="mt-4 text-sm text-white/50 leading-relaxed pl-[72px]">
                {step.desc}
            </p>

            {/* Step number badge - bottom right */}
            <motion.div
                className="absolute bottom-3 right-4 text-5xl font-bold text-white/5"
                animate={isHovered ? { scale: 1.2, opacity: 0.1 } : { scale: 1, opacity: 0.05 }}
                transition={{ duration: 0.3 }}
            >
                {step.step}
            </motion.div>

            {/* Corner glow */}
            <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl"
                style={{
                    background: `radial-gradient(circle, ${step.color}15 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                }}
                animate={isHovered ? { scale: 1.5 } : { scale: 0.8 }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
};

const HowItWorksSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    // Counter for steps completed
    const [completedSteps, setCompletedSteps] = useState(0);
    useEffect(() => {
        if (isInView) {
            const timer = setInterval(() => {
                setCompletedSteps(prev => {
                    if (prev < 4) return prev + 1;
                    clearInterval(timer);
                    return prev;
                });
            }, 600);
            return () => clearInterval(timer);
        }
    }, [isInView]);

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="py-24 sm:py-32 relative overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 50% 100%, #0a1628 0%, #0a0a0a 100%)",
            }}
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
                <Particles />
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 mx-auto max-w-7xl px-6"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 backdrop-blur-sm">
                        <FiZap className="h-4 w-4 text-[#60A5FA]" />
                        <span className="text-xs font-medium text-[#60A5FA] tracking-wider uppercase">
                            How It Works
                        </span>
                    </div>

                    <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                        <span className="text-white">Start Tracking in </span>
                        <span className="bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                            4 Simple Steps
                        </span>
                    </h2>

                    <p className="mt-4 text-lg text-white/40 max-w-2xl mx-auto">
                        Get started in minutes. No training required.
                    </p>

                    {/* Progress indicator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-6 flex items-center justify-center gap-2"
                    >
                        {[1, 2, 3, 4].map((num) => (
                            <motion.div
                                key={num}
                                className="h-1.5 rounded-full transition-all duration-500"
                                style={{
                                    width: completedSteps >= num ? '32px' : '16px',
                                    background: completedSteps >= num
                                        ? 'linear-gradient(to right, #2563EB, #60A5FA)'
                                        : 'rgba(255,255,255,0.1)',
                                }}
                            />
                        ))}
                        <span className="text-xs text-white/30 ml-2">
                            {completedSteps}/4 steps
                        </span>
                    </motion.div>
                </motion.div>

                {/* Steps Grid - Mobile ke saath adjust */}
                <motion.div
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 lg:pr-[320px]"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {steps.map((step, index) => (
                        <StepCard
                            key={index}
                            step={step}
                            index={index}
                            inView={isInView}
                        />
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="mt-4 text-sm text-white/30">
                        Join 10+ businesses · 100% Free · No credit card required
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HowItWorksSection;