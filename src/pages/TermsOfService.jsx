// src/pages/TermsOfService.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiArrowLeft,
    FiShield,
    FiLock,
    FiUserCheck,
    FiFileText,
    FiAlertCircle,
    FiCheckCircle,
    FiXCircle,
    FiInfo,
    FiBookOpen,
} from 'react-icons/fi';
import appIcon from '../assets/app_icon.png';

const TermsOfService = () => {
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
                            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        By using ProfitMate Lite, you agree to these terms. Please read them carefully.
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
                            icon: FiBookOpen,
                            title: "1. Acceptance of Terms",
                            content: [
                                "By downloading, installing, or using ProfitMate Lite, you agree to be bound by these Terms of Service.",
                                "If you do not agree to these terms, please do not use the app.",
                                "These terms apply to all users of the app.",
                                "We reserve the right to update these terms at any time."
                            ],
                            color: "#2563EB"
                        },
                        {
                            icon: FiUserCheck,
                            title: "2. User Account & Data",
                            content: [
                                "You are responsible for maintaining the confidentiality of your Google account.",
                                "All data entered in the app belongs to you and is stored locally on your device.",
                                "You have full control over your data and can delete it at any time.",
                                "We do not access, view, or store your data on our servers."
                            ],
                            color: "#059669"
                        },
                        {
                            icon: FiShield,
                            title: "3. Free Usage",
                            content: [
                                "ProfitMate Lite is 100% free to use with no hidden charges.",
                                "There are no subscription fees or in-app purchases.",
                                "All features are available to all users without any restrictions.",
                                "We reserve the right to introduce premium features in the future."
                            ],
                            color: "#7C3AED"
                        },
                        {
                            icon: FiLock,
                            title: "4. Privacy & Security",
                            content: [
                                "Your privacy is our top priority. We do not collect or share your personal data.",
                                "All data is stored locally on your device and in your personal Google Drive.",
                                "We use industry-standard encryption for data transmission.",
                                "You can delete all your data at any time from the app settings."
                            ],
                            color: "#DC2626"
                        },
                        {
                            icon: FiAlertCircle,
                            title: "5. Prohibited Activities",
                            content: [
                                "Using the app for any illegal or unauthorized purpose is strictly prohibited.",
                                "You may not reverse engineer, modify, or distribute the app.",
                                "You may not use the app to store or share offensive or harmful content.",
                                "You may not attempt to gain unauthorized access to the app's systems."
                            ],
                            color: "#F59E0B"
                        },
                        {
                            icon: FiCheckCircle,
                            title: "6. Data Ownership & Rights",
                            content: [
                                "You retain all ownership rights to your data entered in the app.",
                                "We do not claim any ownership over your business data.",
                                "You can export, backup, and delete your data at any time.",
                                "We do not use your data for any purpose other than providing the app's functionality."
                            ],
                            color: "#059669"
                        },
                        {
                            icon: FiXCircle,
                            title: "7. Termination",
                            content: [
                                "You may stop using the app at any time without notice.",
                                "We reserve the right to terminate or suspend access to the app for violations of these terms.",
                                "Upon termination, your data remains on your device unless you choose to delete it.",
                                "We are not liable for any loss of data resulting from termination."
                            ],
                            color: "#DC2626"
                        },
                        {
                            icon: FiInfo,
                            title: "8. Disclaimer of Warranties",
                            content: [
                                "The app is provided 'as is' without any warranties, expressed or implied.",
                                "We do not guarantee that the app will be error-free or uninterrupted.",
                                "We are not responsible for any loss of data or business decisions made using the app.",
                                "You use the app at your own risk and discretion."
                            ],
                            color: "#7C3AED"
                        },
                        {
                            icon: FiFileText,
                            title: "9. Contact Information",
                            content: [
                                "For any questions or concerns regarding these terms, please contact us:",
                                "📧 Email: support@profitmatelite.com",
                                "📞 Phone: +91 77200 99026",
                                "🏢 Developed by: BROTHERHOOD SOFTECH",
                                "📍 Based in: India"
                            ],
                            color: "#2563EB"
                        }
                    ].map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.08 }}
                            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                            style={{
                                borderLeft: `4px solid ${section.color}`,
                            }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="p-2 rounded-xl"
                                    style={{
                                        background: `${section.color}15`,
                                        color: section.color
                                    }}
                                >
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                            </div>
                            <ul className="space-y-3">
                                {section.content.map((item, i) => {
                                    const isContact = item.includes('📧') || item.includes('📞') || item.includes('🏢') || item.includes('📍');
                                    return (
                                        <li
                                            key={i}
                                            className={`flex items-start gap-3 ${isContact ? 'text-[#2563EB] font-medium' : 'text-gray-600'
                                                }`}
                                        >
                                            <span className="text-[#2563EB] mt-1">•</span>
                                            <span className={isContact ? '' : ''}>{item}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center text-sm text-gray-500 bg-white rounded-2xl shadow-lg p-6"
                >
                    <p className="mb-2">
                        By using ProfitMate Lite, you acknowledge that you have read and agree to these Terms of Service.
                    </p>
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} BROTHERHOOD SOFTECH. All rights reserved.
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-6 text-xs">
                        <Link to="/privacy-policy" className="text-[#2563EB] hover:underline">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-[#2563EB] hover:underline">
                            Terms of Service
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;