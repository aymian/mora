import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BadgeCheck, Lock, Scan, Sparkles } from "lucide-react";

interface VerificationPreviewProps {
  onOpenAuth: () => void;
}

const VerificationPreview = ({ onOpenAuth }: VerificationPreviewProps) => {
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

  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="glass-strong rounded-3xl p-6 relative overflow-hidden">
        {/* Scanning overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Scan className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-sm text-muted-foreground">Analyzing your profile...</p>
                
                {/* Scan line effect */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
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
              className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center px-6">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <Lock className="w-8 h-8 text-gold" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gold/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-bold mb-2 gradient-text-gold">Eligible for Verification!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create an account to unlock your verification status
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={onOpenAuth}
                      className="btn-gold text-sm"
                    >
                      Unlock Now
                    </button>
                    <button
                      onClick={resetPreview}
                      className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default content */}
        <div className="text-center">
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
            animate={{ 
              boxShadow: [
                "0 0 0 0 hsl(210 100% 55% / 0)",
                "0 0 0 10px hsl(210 100% 55% / 0.1)",
                "0 0 0 0 hsl(210 100% 55% / 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BadgeCheck className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h3 className="text-lg font-bold mb-2">Ready for Verification?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            See if you qualify for CARA's exclusive verification badge
          </p>

          <motion.button
            onClick={handlePreview}
            className="btn-hero w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isScanning}
          >
            <Sparkles className="w-5 h-5" />
            Preview My Verification
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationPreview;
