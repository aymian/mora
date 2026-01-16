import { motion } from "framer-motion";
import { BadgeCheck, Crown, Sparkles, Star } from "lucide-react";
import { useState, useEffect } from "react";

const statusTiers = [
  {
    id: "free",
    name: "Free",
    icon: Star,
    badge: "badge-free",
    cardClass: "status-card",
    followers: "0 - 1K",
    multiplier: "1×",
    description: "Start your journey",
    iconColor: "text-muted-foreground",
  },
  {
    id: "pro",
    name: "Pro",
    icon: BadgeCheck,
    badge: "badge-pro",
    cardClass: "status-card",
    followers: "1K - 10K",
    multiplier: "2×",
    description: "Rising creator",
    iconColor: "text-primary",
    glow: true,
  },
  {
    id: "premium",
    name: "Premium",
    icon: Sparkles,
    badge: "badge-premium",
    cardClass: "status-card",
    followers: "10K - 100K",
    multiplier: "5×",
    description: "Established influence",
    iconColor: "text-secondary",
    glow: true,
  },
  {
    id: "golden",
    name: "Golden",
    icon: Crown,
    badge: "badge-golden",
    cardClass: "status-card-golden",
    followers: "100K+",
    multiplier: "10×",
    description: "Elite creator status",
    iconColor: "text-gold",
    isGolden: true,
  },
];

const AnimatedCounter = ({ end, duration = 2000 }: { end: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * numericEnd));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [numericEnd, duration]);

  return <span>{count.toLocaleString()}{end.includes('K') ? 'K' : end.includes('+') ? '+' : ''}</span>;
};

const StatusPreviewCards = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Your <span className="gradient-text-primary">Status</span> Awaits
        </h2>
        <p className="text-muted-foreground">Unlock rewards as you grow</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusTiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            className={tier.cardClass}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredCard(tier.id)}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ y: -5 }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${tier.badge}`}>
              <tier.icon className="w-3 h-3" />
              {tier.name}
            </div>

            {/* Follower count animation */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">Followers</p>
              <p className={`text-lg font-bold ${tier.iconColor}`}>
                {hoveredCard === tier.id ? (
                  <AnimatedCounter end={tier.followers.split(' ')[0]} duration={1000} />
                ) : (
                  tier.followers
                )}
              </p>
            </div>

            {/* Multiplier */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">Reward Multiplier</p>
              <motion.p 
                className={`text-2xl font-black ${tier.isGolden ? 'gradient-text-gold' : tier.iconColor}`}
                animate={hoveredCard === tier.id ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {tier.multiplier}
              </motion.p>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground">{tier.description}</p>

            {/* Glow effect for premium tiers */}
            {tier.glow && (
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 pointer-events-none ${
                  tier.id === 'pro' ? 'glow-primary-sm' : 'glow-secondary'
                }`}
                animate={{ opacity: hoveredCard === tier.id ? 0.5 : 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatusPreviewCards;
