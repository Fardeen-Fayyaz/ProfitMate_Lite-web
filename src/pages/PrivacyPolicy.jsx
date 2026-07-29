// src/pages/PrivacyPolicy.jsx

// src/pages/PrivacyPolicy.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield, FiLock, FiUserCheck, FiDatabase, FiMail } from 'react-icons/fi';
import appIcon from '../assets/app_icon.png';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2563EB] transition-colors mb-6"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8 mb-8"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={appIcon}
                            alt="ProfitMate Lite"
                            className="h-14 w-14 rounded-xl shadow-lg"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        At ProfitMate Lite, we take your privacy seriously. This policy describes how we collect,
                        use, and protect your personal information.
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    {[
                        {
                            icon: FiShield,
                            title: "Information We Collect",
                            content: [
                                "Shop name, address, and contact details you provide during setup",
                                "Transaction entries including sales, expenses, and customer information",
                                "Google account information for authentication and cloud backup",
                                "Device information for app optimization and crash reporting"
                            ]
                        },
                        {
                            icon: FiLock,
                            title: "How We Use Your Information",
                            content: [
                                "To provide and maintain the app's core functionality",
                                "To enable cloud backup and sync across devices",
                                "To generate reports and analytics for your business",
                                "To improve app performance and user experience"
                            ]
                        },
                        {
                            icon: FiUserCheck,
                            title: "Data Storage & Security",
                            content: [
                                "All data is stored locally on your device using SQLite",
                                "Cloud backup uses your personal Google Drive account",
                                "We never store your data on our servers",
                                "All data transmission is encrypted using industry standards"
                            ]
                        },
                        {
                            icon: FiDatabase,
                            title: "Data Sharing",
                            content: [
                                "We do not sell, trade, or rent your personal information",
                                "Data is only shared with Google for authentication and Drive backup",
                                "Reports can be shared by you as PDF files",
                                "No third-party analytics or tracking services are used"
                            ]
                        },
                        {
                            icon: FiMail,
                            title: "Contact Us",
                            content: [
                                "Email: support@profitmatelite.com",
                                "Phone: +91 77200 99026",
                                "Developed by: BROTHERHOOD SOFTECH",
                                "We respond to all inquiries within 24-48 hours"
                            ]
                        }
                    ].map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                            </div>
                            <ul className="space-y-3">
                                {section.content.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <span className="text-[#2563EB] mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-sm text-gray-500 bg-white rounded-2xl shadow-lg p-6"
                >
                    <p>
                        By using ProfitMate Lite, you agree to this Privacy Policy.
                        <br />
                        <span className="text-xs">
                            © {new Date().getFullYear()} BROTHERHOOD SOFTECH. All rights reserved.
                        </span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;