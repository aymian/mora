import { useState } from "react";
import { motion } from "framer-motion";
import LogoHeader from "@/components/cara/LogoHeader";
import HeroSection from "@/components/cara/HeroSection";
import StatusPreviewCards from "@/components/cara/StatusPreviewCards";
import FeaturesGrid from "@/components/cara/FeaturesGrid";
import VerificationSection from "@/components/cara/VerificationSection";
import AuthModal from "@/components/cara/AuthModal";
import AnimatedFooter from "@/components/cara/AnimatedFooter";

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <LogoHeader onOpenAuth={openAuth} />

      {/* Hero */}
      <HeroSection onOpenAuth={openAuth} />

      {/* Status Tiers */}
      <StatusPreviewCards onOpenAuth={openAuth} />

      {/* Features */}
      <FeaturesGrid />

      {/* Verification */}
      <VerificationSection onOpenAuth={openAuth} />

      {/* Footer */}
      <AnimatedFooter />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
    </div>
  );
};

export default Index;
