import { motion } from "framer-motion";
import { BadgeCheck, Crown, Sparkles, Star, ArrowRight } from "lucide-react";

const statusTiers = [
  {
    id: "free",
    name: "Starter",
    icon: Star,
    followers: "0 - 1K",
    multiplier: "1×",
    description: "Begin your journey",
    color: "text-muted-foreground",
    bgGradient: "from-muted/50 to-muted/30",
    borderColor: "border-white/5",
  },
  {
    id: "pro",
    name: "Rising",
    icon: BadgeCheck,
    followers: "1K - 10K",
    multiplier: "2×",
    description: "Growing influence",
    color: "text-primary",
    bgGradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/20",
    glow: "glow-primary-sm",
  },
  {
    id: "premium",
    name: "Verified",
    icon: Sparkles,
    followers: "10K - 100K",
    multiplier: "5×",
    description: "Established creator",
    color: "text-secondary",
    bgGradient: "from-secondary/20 to-secondary/5",
    borderColor: "border-secondary/20",
    glow: "glow-secondary",
  },
  {
    id: "golden",
    name: "Elite",
    icon: Crown,
    followers: "100K+",
    multiplier: "10×",
    description: "Top-tier status",
    color: "text-gold",
    bgGradient: "from-gold/20 via-amber-500/10 to-orange-500/5",
    borderColor: "border-gold/30",
    isGolden: true,
  },
];

interface StatusPreviewCardsProps {
  onOpenAuth?: () => void;
}

const StatusPreviewCards = ({ onOpenAuth }: StatusPreviewCardsProps) => {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            CREATOR TIERS
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Unlock Your <span className="gradient-text-primary">Status</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Level up your creator journey. Each tier unlocks exclusive rewards, higher multipliers, and premium features.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statusTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={`relative p-6 rounded-2xl border ${tier.borderColor} bg-gradient-to-b ${tier.bgGradient} backdrop-blur-sm overflow-hidden group cursor-pointer`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Hover glow */}
              {tier.glow && (
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${tier.glow}`}
                />
              )}
              
              {/* Golden shimmer effect */}
              {tier.isGolden && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              )}

              {/* Icon badge */}
              <motion.div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  tier.isGolden 
                    ? "bg-gradient-to-br from-gold to-amber-600" 
                    : tier.id === "pro" 
                      ? "gradient-primary"
                      : tier.id === "premium"
                        ? "bg-secondary"
                        : "bg-muted"
                }`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <tier.icon className={`w-6 h-6 ${tier.isGolden || tier.id === "pro" || tier.id === "premium" ? "text-white" : "text-muted-foreground"}`} />
              </motion.div>

              {/* Tier name */}
              <h3 className={`text-lg font-bold mb-1 ${tier.color}`}>{tier.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{tier.description}</p>

              {/* Stats */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Followers</p>
                  <p className="font-semibold">{tier.followers}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Reward Boost</p>
                  <motion.p 
                    className={`text-2xl font-black ${tier.isGolden ? "gradient-text-gold" : tier.color}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tier.multiplier}
                  </motion.p>
                </div>
              </div>

              {/* Arrow indicator */}
              <motion.div 
                className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity ${tier.color}`}
                initial={{ x: -5 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>See Your Potential Tier</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatusPreviewCards;
