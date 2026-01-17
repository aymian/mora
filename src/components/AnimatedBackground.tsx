import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const AnimatedBackground = () => {
    // Use MotionValues to avoid React re-renders on mouse move
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the mouse follower
    const springConfig = { damping: 30, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update motion values directly
            mouseX.set(e.clientX - 150);
            mouseY.set(e.clientY - 150);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#050505]" />

            {/* Animated gradient orbs */}
            <motion.div
                className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl will-change-transform"
                style={{
                    background: "radial-gradient(circle, hsl(var(--mora-gradient-start)) 0%, transparent 70%)",
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl will-change-transform"
                style={{
                    background: "radial-gradient(circle, hsl(var(--mora-gradient-end)) 0%, transparent 70%)",
                }}
                animate={{
                    x: [0, -80, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl will-change-transform"
                style={{
                    background: "radial-gradient(circle, hsl(var(--mora-accent)) 0%, transparent 70%)",
                    x: "-50%",
                    y: "-50%",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Interactive gradient that follows mouse */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none will-change-transform"
                style={{
                    background: "radial-gradient(circle, hsl(var(--mora-gradient-start)) 0%, transparent 70%)",
                    x: springX,
                    y: springY,
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />
        </div>
    );
};
