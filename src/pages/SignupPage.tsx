import { motion } from "framer-motion";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { SignupCard } from "../components/SignupCard";
import { MoraLogo } from "../components/MoraLogo";

export const SignupPage = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Main Content */}
            <div className="relative z-10 min-h-screen w-full">
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
                    {/* Left Side - Preview/Feature Showcase */}
                    <div className="flex items-center justify-center p-12 xl:p-24 relative">
                        {/* Decorative glow behind text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--mora-accent))] blur-[120px] opacity-20 pointer-events-none rounded-full" />

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="max-w-xl relative z-10"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-8"
                            >
                                <h2 className="text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                                    <span className="text-gradient">Join.</span>
                                    <br />
                                    <span className="text-gradient">Build.</span>
                                    <br />
                                    <span className="text-white">Thrive.</span>
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                                    Start your journey with MORA today. Create your profile and begin shaping the future of social influence.
                                </p>

                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-3 pt-4">
                                    {[
                                        "Exclusive Access",
                                        "Monetization",
                                        "Creator Tools",
                                        "Community",
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={feature}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            className="glass-card px-5 py-2.5 rounded-full text-sm font-medium text-white/90 border border-white/5 hover:border-white/20 transition-colors cursor-default"
                                        >
                                            {feature}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5"
                                >
                                    {[
                                        { value: "0", label: "Limits" },
                                        { value: "100%", label: "Ownership" },
                                        { value: "∞", label: "Potential" },
                                    ].map((stat) => (
                                        <div key={stat.label} className="space-y-1">
                                            <div className="text-3xl font-bold text-gradient">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm font-medium text-muted-foreground">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Side - Signup Card */}
                    <div className="flex flex-col items-center justify-center p-12 bg-white/[0.02] relative">
                        {/* Branding Above Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-center space-y-4 mb-8 -mt-20 relative z-20"
                        >
                            <div className="flex justify-center">
                                <MoraLogo size="lg" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold tracking-tight text-white">
                                    MORA
                                </h1>
                                <p className="text-sm text-neutral-400 font-medium">
                                    Join the revolution
                                </p>
                            </div>
                        </motion.div>

                        <div className="w-full flex justify-center relative z-10">
                            <SignupCard />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden min-h-screen flex flex-col justify-center px-6 py-12 relative">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[hsl(var(--background))] to-transparent z-0" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--background))] to-transparent z-0" />

                    <div className="w-full max-w-md mx-auto space-y-8 relative z-10 -mt-12 transition-all">
                        {/* Mobile Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center space-y-4 mb-2"
                        >
                            <div className="flex justify-center">
                                <MoraLogo size="md" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-4xl font-bold tracking-tight">
                                    <span className="text-gradient">MORA</span>
                                </h2>
                                <p className="text-base text-muted-foreground font-medium">
                                    Start your journey
                                </p>
                            </div>
                        </motion.div>

                        {/* Signup Card */}
                        <SignupCard />

                        {/* Mobile Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5"
                        >
                            {[
                                { value: "0", label: "Limits" },
                                { value: "100%", label: "Ownership" },
                                { value: "∞", label: "Potential" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center space-y-1">
                                    <div className="text-xl font-bold text-gradient">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
