import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

interface CTAButtonsProps {
  onOpenAuth: () => void;
}

const CTAButtons = ({ onOpenAuth }: CTAButtonsProps) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <motion.button
        onClick={onOpenAuth}
        className="btn-hero group flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Building Influence
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.span>
      </motion.button>

      <motion.button
        className="btn-secondary-hero group flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <Play className="w-4 h-4 fill-current" />
        </motion.div>
        See How Creators Earn
      </motion.button>
    </motion.div>
  );
};

export default CTAButtons;
