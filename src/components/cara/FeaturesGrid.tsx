import { motion } from "framer-motion";
import { Coins, TrendingUp, Star, Zap, Gift, Trophy } from "lucide-react";

const features = [
  {
    icon: Coins,
    title: "Earn Real Money",
    description: "Turn your followers into real earnings. Get paid for every milestone you reach.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: TrendingUp,
    title: "Track Growth",
    description: "Real-time analytics to understand your audience and optimize your content.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Star,
    title: "Get Recognized",
    description: "Stand out with verification badges that showcase your authentic influence.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Zap,
    title: "Instant Rewards",
    description: "Automatic payouts when you hit milestones. No waiting, no hassle.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Gift,
    title: "Exclusive Perks",
    description: "Access brand deals, collaborations, and opportunities reserved for top creators.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description: "Join challenges, climb leaderboards, and win bonus rewards.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 px-4 md:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-gold/10 text-gold border border-gold/20 mb-4"
          >
            WHY CARA
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Everything You Need to <span className="gradient-text-gold">Thrive</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built for creators who want more than just followers. We give you the tools to build a sustainable career.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <motion.div 
                className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, hsl(var(--primary) / 0.05), transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
