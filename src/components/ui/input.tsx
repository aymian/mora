import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, icon, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false)

        return (
            <div className="relative w-full">
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {icon}
                        </div>
                    )}
                    <motion.input
                        type={type}
                        className={cn(
                            "flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--mora-accent))] focus-visible:ring-offset-0 focus-visible:border-[hsl(var(--mora-accent))] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                            icon && "pl-11",
                            error && "border-destructive focus-visible:ring-destructive",
                            className
                        )}
                        ref={ref}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...props}
                    />
                    <AnimatePresence>
                        {isFocused && (
                            <motion.div
                                className="absolute inset-0 rounded-xl pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    boxShadow: `0 0 0 3px hsla(var(--mora-accent), 0.1)`,
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-destructive mt-1.5 ml-1"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
