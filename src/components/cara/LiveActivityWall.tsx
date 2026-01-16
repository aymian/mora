import { motion } from "framer-motion";
import { BadgeCheck, Coins, Trophy, TrendingUp } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: BadgeCheck,
    text: "Sarah just got verified",
    subtext: "Premium Creator",
    color: "text-primary",
    bgColor: "bg-primary/10",
    position: { top: "5%", left: "5%" },
    delay: 0,
  },
  {
    id: 2,
    icon: Coins,
    text: "Creator earned RWF 15,000",
    subtext: "This month",
    color: "text-gold",
    bgColor: "bg-gold/10",
    position: { top: "25%", right: "8%" },
    delay: 0.5,
  },
  {
    id: 3,
    icon: Trophy,
    text: "Top Creator — Kigali",
    subtext: "Local Region",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    position: { bottom: "30%", left: "3%" },
    delay: 1,
  },
  {
    id: 4,
    icon: TrendingUp,
    text: "+2,500 followers today",
    subtext: "Trending",
    color: "text-success",
    bgColor: "bg-success/10",
    position: { bottom: "15%", right: "5%" },
    delay: 1.5,
  },
];

const LiveActivityWall = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          className="absolute activity-card max-w-[220px]"
          style={activity.position as any}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.95],
            y: [20, 0, 0, -10]
          }}
          transition={{
            duration: 4,
            delay: activity.delay,
            repeat: Infinity,
            repeatDelay: 4,
            times: [0, 0.1, 0.9, 1]
          }}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.subtext}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-orb" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-orb-delayed" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gold/5 rounded-full blur-3xl animate-orb-slow" />
    </div>
  );
};

export default LiveActivityWall;
