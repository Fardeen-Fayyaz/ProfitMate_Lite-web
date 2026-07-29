// src/components/layout/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    FiHeart,
    FiMail,
    FiMapPin,
    FiPhone,
    FiGlobe,
    FiGithub,
    FiLinkedin,
    FiTwitter,
    FiArrowUpRight,
    FiExternalLink,
    FiShield,
    FiFileText,
} from 'react-icons/fi';
import appIcon from '../../assets/app_icon.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Animated Gradient Line */}
            <div className="h-1 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#1D4ED8] animate-gradient bg-[length:200%_200%]" />

            <div className="container mx-auto px-4 py-16 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={appIcon}
                                alt="ProfitMate Lite"
                                className="h-12 w-12 rounded-xl shadow-lg shadow-[#2563EB]/20"
                            />
                            <div>
                                <span className="text-xl font-bold text-white">ProfitMate</span>
                                <span className="block text-[10px] font-medium text-[#60A5FA] tracking-wider">LITE</span>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Track your profit, grow your business. The simplest and most powerful
                            financial management app for small business owners.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Features', href: '#features' },
                                { name: 'How It Works', href: '#how-it-works' },
                                { name: 'FAQ', href: '#faq' },
                                { name: 'Download', href: '#download' },
                            ].map((link) => (
                                <motion.li
                                    key={link.name}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#60A5FA] transition-colors text-sm flex items-center gap-1"
                                    >
                                        {link.name}
                                        <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* About / Company */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-lg font-bold mb-4 text-white">About</h3>
                        <ul className="space-y-3">
                            <motion.li whileHover={{ x: 5 }}>
                                <a
                                    href="https://fardeen-fayyaz-portfolio.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#60A5FA] transition-colors text-sm flex items-center gap-1"
                                >
                                    CEO Portfolio
                                    <FiExternalLink className="w-3 h-3" />
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 5 }}>
                                <a
                                    href="/privacy-policy"
                                    className="text-gray-400 hover:text-[#60A5FA] transition-colors text-sm flex items-center gap-1"
                                >
                                    <FiShield className="w-3 h-3" />
                                    Privacy Policy
                                </a>
                            </motion.li>
                            <motion.li whileHover={{ x: 5 }}>
                                <a
                                    href="/terms"
                                    className="text-gray-400 hover:text-[#60A5FA] transition-colors text-sm flex items-center gap-1"
                                >
                                    <FiFileText className="w-3 h-3" />
                                    Terms of Service
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FiMapPin className="w-4 h-4 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">India</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiGlobe className="w-4 h-4 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">BROTHERHOOD SOFTECH</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiPhone className="w-4 h-4 text-[#60A5FA] mt-0.5 flex-shrink-0" />
                                <a href="tel:+917720099026" className="text-gray-400 hover:text-[#60A5FA] text-sm transition-colors">
                                    +91 77200 99026
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                        © {currentYear} BROTHERHOOD SOFTECH. Made with
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <FiHeart className="w-4 h-4 text-red-500 inline fill-current" />
                        </motion.span>
                        in India
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                        <a
                            href="/privacy-policy"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="https://fardeen-fayyaz-portfolio.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                            CEO Portfolio
                            <FiExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;