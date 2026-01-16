import { motion } from "framer-motion";
import { Twitter, Instagram, Youtube, Linkedin, Zap, ArrowUpRight, Sparkles, Heart, Send } from "lucide-react";

const footerLinks = {
  product: ["Features", "Creators", "Verification", "Rewards", "Pricing"],
  resources: ["Blog", "Help Center", "API Docs", "Community", "Status"],
  company: ["About", "Careers", "Press", "Contact"],
  legal: ["Privacy", "Terms", "Cookies"],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const AnimatedFooter = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        
        {/* Floating elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${5 + (i * 5) % 90}%`,
              top: `${10 + (i * 7) % 80}%`,
            }}
            animate={{
              y: [0, -20 - (i % 3) * 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Large gradient orbs */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* CTA Section */}
        <motion.div
          className="py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-gold p-[1px] rounded-3xl">
              <div className="absolute inset-[1px] bg-card rounded-3xl" />
            </div>
            
            <div className="relative p-8 md:p-12 text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-sm font-medium">Ready to transform your influence?</span>
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Join <span className="gradient-text-primary">50,000+</span> Creators
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Start building your presence today. Get verified, earn rewards, and be part of the fastest-growing creator community.
              </p>

              {/* Email signup */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <div className="relative flex-1 w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm placeholder:text-muted-foreground"
                  />
                </div>
                <motion.button
                  className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold gradient-primary text-white flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px hsl(210 100% 55% / 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 py-12 border-t border-white/5">
          {/* Brand column */}
          <div className="col-span-2">
            <motion.div 
              className="flex items-center gap-2.5 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-gold flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="text-xl font-black">CARA</span>
                <span className="block text-[10px] text-muted-foreground tracking-widest uppercase">Creator Hub</span>
              </div>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              The platform where creators grow, get verified, and earn real rewards for their influence.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <div key={title} className={colIndex === 3 ? "col-span-2 md:col-span-1" : ""}>
              <h4 className="font-semibold mb-4 text-sm capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 border-t border-white/5">
          <div className="flex items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © 2026 CARA. All rights reserved.
            </p>
          </div>
          
          <motion.div 
            className="flex items-center gap-1 text-sm text-muted-foreground"
            whileHover={{ scale: 1.02 }}
          >
            <span>Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-destructive fill-destructive inline" />
            </motion.span>
            <span>for creators worldwide</span>
          </motion.div>
        </div>
      </div>

      {/* Animated bottom gradient line */}
      <motion.div
        className="h-1 bg-gradient-to-r from-primary via-secondary to-gold"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        style={{ backgroundSize: "200% 100%" }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
    </footer>
  );
};

export default AnimatedFooter;
