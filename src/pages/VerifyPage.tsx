import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MoraLogo } from "../components/MoraLogo";
import { Button } from "../components/ui/button";
import { supabase } from "../lib/supabase";

export const VerifyPage = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<'pending' | 'verifying' | 'verified'>('pending');

    useEffect(() => {
        const checkVerification = async () => {
            // Check if we have a session (link clicked)
            const { data: { session }, error } = await supabase.auth.getSession();

            if (session) {
                setStatus('verified');
                // Wait 5 seconds then redirect
                setTimeout(() => {
                    navigate('/onboarding');
                }, 5000);
            } else {
                // No session, check if we have a hash token at least (in process of verify)
                // or just standard pending state
                const hash = window.location.hash;
                if (hash && hash.includes('access_token')) {
                    setStatus('verifying');
                    // The supabase client usually handles this automatically and updates session
                    // We'll let the onAuthStateChange listener or next render catch it if needed,
                    // but usually getSession above handles it if the client initialized correctly.
                }
            }
        };

        // Also listen for auth state changes (e.g. if the hash is processed slightly after mount)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setStatus('verified');
                setTimeout(() => {
                    navigate('/onboarding');
                }, 5000);
            }
        });

        checkVerification();

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

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
                        <div className="bg-[#0a0a0f]/90 rounded-[20px] p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">

                            <AnimatePresence mode="wait">
                                {status === 'verified' ? (
                                    <motion.div
                                        key="verified"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex flex-col items-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                                            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)] mb-6"
                                        >
                                            <Check className="w-12 h-12 text-black" strokeWidth={3} />
                                        </motion.div>
                                        <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
                                        <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
                                            Redirecting you to onboarding in 5 seconds...
                                        </p>
                                        <Loader2 className="w-6 h-6 text-white/50 animate-spin" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="pending"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--mora-accent))]/10 flex items-center justify-center mb-6 ring-1 ring-[hsl(var(--mora-accent))]/20">
                                            <CheckCircle className="w-8 h-8 text-[hsl(var(--mora-accent))]" />
                                        </div>

                                        <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
                                        <p className="text-muted-foreground text-sm mb-8 max-w-xs leading-relaxed">
                                            We've sent a confirmation link via our mailed service (Supabase). Please <strong>click confirm</strong> in that email.
                                        </p>
                                        <p className="text-xs text-muted-foreground/50">
                                            You will be automatically redirected once verified.
                                        </p>

                                        <div className="mt-8 w-full">
                                            <Link to="/">
                                                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                                                    Back to Login
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
