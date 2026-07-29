// src/App.jsx
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, useScroll } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import StatsSection from "./components/sections/StatsSection";
import FAQSection from "./components/sections/FAQSection";
import DownloadSection from "./components/sections/DownloadSection";
import Footer from "./components/layout/Footer";
import LoadingScreen from "./components/ui/LoadingScreen";
import FloatingPhone from "./components/ui/FloatingPhone";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function App() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingScreen />;

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[#F8FAFC] relative">
                <Navbar />
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={
                            <main ref={containerRef}>
                                <HeroSection />
                                <FeaturesSection />
                                <HowItWorksSection />
                                <StatsSection />
                                <FAQSection />
                                <DownloadSection />
                                <Footer />
                            </main>
                        } />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                    </Routes>
                </AnimatePresence>

                {/* Floating Phone - Only on home page */}
                <FloatingPhone scrollYProgress={scrollYProgress} />
            </div>
        </BrowserRouter>
    );
}

export default App;