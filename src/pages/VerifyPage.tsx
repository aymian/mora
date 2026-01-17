import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MoraLogo } from "../components/MoraLogo";
import { Button } from "../components/ui/button";

export const VerifyPage = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center space-y-6"
                >
                    <MoraLogo size="lg" />

                    <div className="glass-card rounded-[24px] p-1.5 relative overflow-hidden backdrop-blur-2xl bg-black/40 border border-white/5 shadow-2xl ring-1 ring-white/5 w-full">
                        <div className="bg-[#0a0a0f]/90 rounded-[20px] p-8 relative overflow-hidden flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 ring-1 ring-green-500/20">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>

                            <h1 className="text-2xl font-bold text-white mb-2">Registration Successful</h1>
                            <p className="text-muted-foreground text-sm mb-8 max-w-xs leading-relaxed">
                                Your account has been created and is currently <span className="text-white font-medium">pending verification</span>. You will be notified once your account is active.
                            </p>

                            <Link to="/" className="w-full">
                                <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl h-12 font-medium">
                                    Return to Login
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground/60">
                        Need help? <a href="#" className="hover:text-white transition-colors">Contact Support</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
