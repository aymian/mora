import { useState } from "react";
import { motion } from "framer-motion";
import LogoHeader from "@/components/cara/LogoHeader";
import AnimatedTagline from "@/components/cara/AnimatedTagline";
import LiveActivityWall from "@/components/cara/LiveActivityWall";
import StatusPreviewCards from "@/components/cara/StatusPreviewCards";
import VerificationPreview from "@/components/cara/VerificationPreview";
import CTAButtons from "@/components/cara/CTAButtons";
import AuthModal from "@/components/cara/AuthModal";
import AnimatedFooter from "@/components/cara/AnimatedFooter";

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <LogoHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Live Activity Wall (Background) */}
        <LiveActivityWall />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-foreground">Where </span>
              <span className="gradient-text-primary">Influence</span>
              <br />
              <span className="text-foreground">Becomes </span>
              <span className="gradient-text-gold">Currency</span>
            </h1>

            {/* Animated tagline */}
            <div className="mb-10">
              <AnimatedTagline />
            </div>

            {/* CTA Buttons */}
            <CTAButtons onOpenAuth={() => setIsAuthOpen(true)} />

            {/* Stats teaser */}
            <motion.div 
              className="mt-12 flex items-center justify-center gap-8 md:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-center">
                <motion.p 
                  className="text-2xl md:text-3xl font-bold gradient-text-primary"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  50K+
                </motion.p>
                <p className="text-xs md:text-sm text-muted-foreground">Creators</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <motion.p 
                  className="text-2xl md:text-3xl font-bold gradient-text-gold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  RWF 2B+
                </motion.p>
                <p className="text-xs md:text-sm text-muted-foreground">Paid Out</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <motion.p 
                  className="text-2xl md:text-3xl font-bold text-secondary"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  10K+
                </motion.p>
                <p className="text-xs md:text-sm text-muted-foreground">Verified</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Status Preview Section */}
      <section className="relative py-20 px-6">
        <StatusPreviewCards />
      </section>

      {/* Verification Preview Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get <span className="gradient-text-primary">Verified</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Join the exclusive club of verified creators. Unlock premium features, 
                higher visibility, and enhanced earning potential.
              </p>
              <ul className="space-y-3">
                {[
                  "Priority in search & discovery",
                  "Exclusive badge on your profile",
                  "Access to premium creator tools",
                  "Higher reward multipliers"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3 text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right - Verification preview */}
            <VerificationPreview onOpenAuth={() => setIsAuthOpen(true)} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <AnimatedFooter />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default Index;
