// src/components/ui/DownloadButton.jsx
import { motion } from "framer-motion";
import { FiDownload, FiSmartphone, FiCheck, FiArrowRight } from "react-icons/fi";

const DownloadButton = ({ variant = 'default', className = '' }) => {
    const handleDownload = () => {
        // APK download trigger
        const link = document.createElement('a');
        link.href = '/ProfitMate-Lite.apk';
        link.download = 'ProfitMate-Lite.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Track download event (optional)
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'download', {
                'event_category': 'APK',
                'event_label': 'ProfitMate Lite'
            });
        }
    };

    if (variant === 'icon') {
        return (
            <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-lg shadow-[#2563EB]/25 hover:shadow-[#2563EB]/40 transition-all duration-300 ${className}`}
                aria-label="Download APK"
            >
                <FiDownload className="h-5 w-5" />
            </motion.button>
        );
    }

    if (variant === 'compact') {
        return (
            <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-medium text-sm shadow-lg shadow-[#2563EB]/25 hover:shadow-[#2563EB]/40 transition-all duration-300 ${className}`}
            >
                <FiDownload className="h-4 w-4" />
                Download APK
            </motion.button>
        );
    }

    // Default - Full button
    return (
        <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(37,99,235,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className={`group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-2xl text-white font-semibold shadow-lg shadow-[#2563EB]/25 relative overflow-hidden ${className}`}
        >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <FiSmartphone className="h-5 w-5" />
            <span>Download for Android</span>
            <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <FiArrowRight className="h-5 w-5" />
            </motion.span>
        </motion.button>
    );
};

export default DownloadButton;