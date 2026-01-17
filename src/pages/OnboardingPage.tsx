import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MoraLogo } from "../components/MoraLogo";
import { supabase } from "../lib/supabase";

export const OnboardingPage = () => {
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        // Build a robust verification check
        const verifyUser = async () => {
            // Supabase handles the token parsing from the URL automatically
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Verification error:", error);
                setVerifying(false); // verification failed logic could go here
                return;
            }

            if (session) {
                // User is authenticated and email is verified
                setVerified(true);
                setVerifying(false);

                // Optionally update Firestore here if needed
                // const user = session.user;
                // updateDoc(doc(db, "users", user.id), { status: "active" });
            } else {
                // No session found, maybe just landed here directly?
                setVerifying(false);
            }
        };

        verifyUser();
    }, []);

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

                            {verifying ? (
                                <div className="flex flex-col items-center space-y-4">
                                    <Loader2 className="w-12 h-12 text-[hsl(var(--mora-accent))] animate-spin" />
                                    <p className="text-muted-foreground">Verifying your email...</p>
                                </div>
                            ) : verified ? (
                                <div className="flex flex-col items-center space-y-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                                    >
                                        <Check className="w-12 h-12 text-black" strokeWidth={3} />
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-white mt-4">Verified!</h2>
                                    <p className="text-muted-foreground text-sm">Welcome to MORA. Redirecting...</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                                        <span className="text-2xl">?</span>
                                    </div>
                                    <p className="text-muted-foreground">Verification session not found.</p>
                                </div>
                            )}

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
