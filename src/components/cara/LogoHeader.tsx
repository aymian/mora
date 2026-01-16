import { motion } from "framer-motion";

const LogoHeader = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          {/* Logo mark */}
          <div className="relative">
            <motion.div
              className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(210 100% 55% / 0.3)",
                  "0 0 40px hsl(210 100% 55% / 0.5)",
                  "0 0 20px hsl(210 100% 55% / 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xl font-black text-white">C</span>
            </motion.div>
          </div>
          
          {/* Logo text */}
          <span className="text-2xl font-bold tracking-tight">
            <span className="gradient-text-primary">CARA</span>
          </span>
        </motion.div>

        {/* Navigation hints */}
        <div className="hidden md:flex items-center gap-6">
          <motion.span 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            whileHover={{ y: -1 }}
          >
            Creators
          </motion.span>
          <motion.span 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            whileHover={{ y: -1 }}
          >
            Rewards
          </motion.span>
          <motion.span 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            whileHover={{ y: -1 }}
          >
            Verification
          </motion.span>
        </div>
      </div>
    </motion.header>
  );
};

export default LogoHeader;
