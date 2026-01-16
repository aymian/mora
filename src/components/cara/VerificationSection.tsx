import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BadgeCheck, Lock, Scan, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

interface VerificationSectionProps {
  onOpenAuth: () => void;
}

const VerificationSection = ({ onOpenAuth }: VerificationSectionProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handlePreview = () => {
    if (showResult) {
      onOpenAuth();
      return;
    }
    
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 2500);
  };

  const resetPreview = () => {
    setShowResult(false);
    setIsScanning(false);
  };

  const benefits = [
    { icon: Shield, text: "Priority in search & discovery" },
    { icon: BadgeCheck, text: "Exclusive verified badge" },
    { icon: Zap, text: "Premium creator tools" },
    { icon: TrendingUp, text: "Higher reward multipliers" },
  ];

  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              VERIFICATION
            </motion.span>

            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Get <span className="gradient-text-primary">Verified</span>
              <br />
              <span className="text-muted-foreground text-2xl md:text-3xl font-medium">Stand out from the crowd</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Join the exclusive club of verified creators. Unlock premium features, 
              higher visibility, and enhanced earning potential.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Interactive card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-gold p-[1px] rounded-3xl">
                <div className="absolute inset-[1px] bg-card rounded-3xl" />
              </div>

              <div className="relative p-8 min-h-[400px] flex items-center justify-center">
                {/* Scanning overlay */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      className="absolute inset-0 z-20 flex items-center justify-center bg-background/90 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center relative"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Scan className="w-10 h-10 text-white" />
                        </motion.div>
                        <p className="text-lg font-semibold mb-2">Analyzing Profile</p>
                        <p className="text-sm text-muted-foreground">Checking eligibility...</p>
                        
                        {/* Scan line */}
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                          animate={{ top: ["0%", "100%"] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result overlay */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      className="absolute inset-0 z-20 flex items-center justify-center bg-background/95 backdrop-blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center px-8">
                        <motion.div
                          className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center relative"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.6 }}
                        >
                          <Lock className="w-10 h-10 text-white" />
                          <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-gold/50"
                            animate={{ scale: [1, 1.15], opacity: [1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h3 className="text-2xl font-black mb-2 gradient-text-gold">Eligible!</h3>
                          <p className="text-muted-foreground mb-6">
                            Create an account to unlock your verification status
                          </p>
                          
                          <div className="flex gap-3 justify-center">
                            <motion.button
                              onClick={onOpenAuth}
                              className="px-6 py-3 rounded-xl font-semibold gradient-gold text-black"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Unlock Now
                            </motion.button>
                            <motion.button
                              onClick={resetPreview}
                              className="px-6 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground transition-colors"
                              whileHover={{ scale: 1.02 }}
                            >
                              Try Again
                            </motion.button>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Default content */}
                <div className="text-center">
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center relative"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 hsl(210 100% 55% / 0)",
                        "0 0 0 15px hsl(210 100% 55% / 0.1)",
                        "0 0 0 0 hsl(210 100% 55% / 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BadgeCheck className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2">Ready for Verification?</h3>
                  <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                    See if you qualify for CARA's exclusive verification badge
                  </p>

                  <motion.button
                    onClick={handlePreview}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold gradient-primary text-white"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 40px hsl(210 100% 55% / 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isScanning}
                  >
                    <Sparkles className="w-5 h-5" />
                    Preview My Verification
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
