// src/components/sections/FAQSection.jsx
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
    FiPlus,
    FiMinus,
    FiHelpCircle,
    FiMessageCircle,
    FiMail,
    FiArrowRight,
    FiZap,
    FiChevronDown,
} from "react-icons/fi";

const faqData = [
    {
        question: "Is ProfitMate Lite really free?",
        answer: "Yes! ProfitMate Lite is 100% free forever. No hidden charges, no subscription fees, and no ads. We believe every small business deserves access to professional financial tools without any cost.",
        delay: 0,
    },
    {
        question: "Does it work without internet?",
        answer: "Absolutely! ProfitMate Lite is built with an offline-first architecture. Every feature works perfectly without internet. Your data is stored locally and syncs automatically when you're back online.",
        delay: 0.1,
    },
    {
        question: "Can I customize entry fields?",
        answer: "Yes! You can add unlimited custom fields like IMEI, Model, Batch, Color, Warranty — anything your business needs. Drag and drop to reorder, and mark fields as required or optional.",
        delay: 0.2,
    },
    {
        question: "How does cloud backup work?",
        answer: "Every entry automatically backs up to your personal Google Drive. When you switch phones or reinstall the app, all your data restores automatically. Your data stays in your own Google account — we never access it.",
        delay: 0.3,
    },
    {
        question: "Can I recover deleted entries?",
        answer: "Yes! All deleted entries move to a Recycle Bin where they stay for 30 days. You can restore any entry anytime within this period. After 30 days, entries are permanently deleted automatically.",
        delay: 0.4,
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

const FAQItem = ({ faq, index, isOpen, toggleOpen, inView }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: faq.delay + 0.2 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
            style={{
                background: isHovered
                    ? `radial-gradient(circle at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)`
                    : "transparent",
            }}
        >
            {/* Shine effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.8 }}
            />

            {/* Question button */}
            <motion.button
                onClick={toggleOpen}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer relative"
            >
                <div className="flex items-center gap-4 pr-4">
                    {/* Question mark icon */}
                    <motion.div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#1D4ED8]/10 border border-white/10"
                        animate={isOpen ? { scale: 1.1, rotate: [0, -10, 10, 0] } : { scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <FiHelpCircle
                            className="h-5 w-5"
                            style={{ color: isOpen ? '#60A5FA' : '#4B5563' }}
                        />
                    </motion.div>

                    <span className={`text-base font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/80'
                        }`}>
                        {faq.question}
                    </span>
                </div>

                {/* Toggle icon */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors"
                >
                    {isOpen ? (
                        <FiMinus className="h-4 w-4 text-[#60A5FA]" />
                    ) : (
                        <FiPlus className="h-4 w-4 text-white/40 group-hover:text-white/80 transition-colors" />
                    )}
                </motion.div>
            </motion.button>

            {/* Answer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-0">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.4 }}
                                className="w-12 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] mb-4 rounded-full"
                            />
                            <p className="text-sm text-white/50 leading-relaxed pl-14">
                                {faq.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom glow on hover */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isHovered ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
            />
        </motion.div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            ref={sectionRef}
            id="faq"
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
                        <FiMessageCircle className="h-4 w-4 text-[#60A5FA]" />
                        <span className="text-xs font-medium text-[#60A5FA] tracking-wider uppercase">
                            Common Questions
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                    >
                        <span className="text-white">Frequently Asked </span>
                        <span className="bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                            Questions
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-4 text-lg text-white/40 max-w-2xl mx-auto"
                    >
                        Everything you need to know about ProfitMate Lite
                    </motion.p>
                </motion.div>

                {/* FAQ List - Mobile ke saath adjust */}
                <div className="max-w-3xl mx-auto space-y-3 lg:pr-[320px] lg:ml-0 lg:mr-auto">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            toggleOpen={() => toggleFAQ(index)}
                            inView={isInView}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default FAQSection;