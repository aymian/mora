import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const taglines = [
  "Grow fast. Get verified. Get rewarded.",
  "Your followers officially matter now.",
  "Build influence. Earn status.",
  "The platform where creators thrive."
];

const AnimatedTagline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          className="text-lg md:text-xl text-muted-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {taglines[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTagline;
