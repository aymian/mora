import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface LogoHeaderProps {
  onOpenAuth: () => void;
}

const LogoHeader = ({ onOpenAuth }: LogoHeaderProps) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Glassmorphic background */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-white/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
          >
            {/* Premium logo mark */}
            <div className="relative">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-gold flex items-center justify-center relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    "0 0 20px hsl(210 100% 55% / 0.4)",
                    "0 0 35px hsl(270 80% 60% / 0.4)",
                    "0 0 20px hsl(210 100% 55% / 0.4)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                <Zap className="w-5 h-5 text-white fill-white relative z-10" />
              </motion.div>
              
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-xl border border-primary/50"
                animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            {/* Logo text */}
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none">
                CARA
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
                Creator Hub
              </span>
            </div>
          </motion.div>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {["Explore", "Creators", "Rewards", "Verify"].map((item, i) => (
              <motion.button
                key={item}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ y: -1 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {item}
                <motion.span 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300"
                />
              </motion.button>
            ))}
          </nav>

          {/* Right side - Auth buttons */}
          <div className="flex items-center gap-3">
            {/* Mobile menu hint */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl text-sm font-semibold gradient-primary text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join
              </motion.button>
            </div>

            {/* Desktop auth buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -1 }}
              >
                Sign In
              </motion.button>
              
              <motion.button
                onClick={onOpenAuth}
                className="relative px-5 py-2.5 rounded-xl text-sm font-semibold overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] group-hover:animate-shimmer" />
                
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "radial-gradient(circle at center, hsl(210 100% 55% / 0.3), transparent 70%)"
                  }}
                />
                
                <span className="relative z-10 text-white flex items-center gap-1.5">
                  Get Started
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default LogoHeader;
