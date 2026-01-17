import { motion } from "framer-motion";

interface MoraLogoProps {
    size?: "sm" | "md" | "lg";
    animated?: boolean;
}

export const MoraLogo = ({ size = "md", animated = true }: MoraLogoProps) => {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    const LogoSVG = (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={sizes[size]}
        >
            <defs>
                <linearGradient id="moraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--mora-gradient-start))" />
                    <stop offset="100%" stopColor="hsl(var(--mora-gradient-end))" />
                </linearGradient>
            </defs>

            {/* M letter - stylized and modern */}
            <path
                d="M20 70V30L35 50L50 30L65 50L80 30V70"
                stroke="url(#moraGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Accent dot */}
            <circle
                cx="50"
                cy="20"
                r="4"
                fill="url(#moraGradient)"
            />
        </svg>
    );

    if (!animated) {
        return LogoSVG;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.05 }}
        >
            {LogoSVG}
        </motion.div>
    );
};
