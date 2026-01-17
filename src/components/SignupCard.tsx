import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Check, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export const SignupCard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    // Validation states
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Touched states
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const validateUsername = (value: string) => {
        if (!value) return "Username is required";
        if (value.length < 3) return "Min 3 characters";
        return "";
    };

    const validateEmail = (value: string) => {
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email address";
        return "";
    };

    const validatePassword = (value: string) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Min 8 characters";
        return "";
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        if (usernameTouched) setUsernameError(validateUsername(value));
        setGeneralError("");
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (emailTouched) setEmailError(validateEmail(value));
        setGeneralError("");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (passwordTouched) setPasswordError(validatePassword(value));
        setGeneralError("");
    };

    const handleBlur = (field: 'username' | 'email' | 'password') => {
        if (field === 'username') {
            setUsernameTouched(true);
            setUsernameError(validateUsername(username));
        } else if (field === 'email') {
            setEmailTouched(true);
            setEmailError(validateEmail(email));
        } else {
            setPasswordTouched(true);
            setPasswordError(validatePassword(password));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userErr = validateUsername(username);
        const emailErr = validateEmail(email);
        const passErr = validatePassword(password);

        setUsernameError(userErr);
        setEmailError(emailErr);
        setPasswordError(passErr);

        setUsernameTouched(true);
        setEmailTouched(true);
        setPasswordTouched(true);

        if (userErr || emailErr || passErr) return;

        setIsLoading(true);
        setGeneralError("");

        try {
            // 1. Create User in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Create User Document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username: username,
                email: email,
                status: "pending", // As requested
                role: "user",
                createdAt: serverTimestamp(),
                photoURL: user.photoURL || null,
            });

            // 3. Redirect to Verify Page
            navigate("/verify");

        } catch (error: any) {
            console.error("Signup error:", error);
            if (error.code === 'auth/email-already-in-use') {
                setGeneralError("Email is already registered.");
            } else if (error.code === 'auth/invalid-email') {
                setGeneralError("Invalid email address.");
            } else if (error.code === 'auth/weak-password') {
                setGeneralError("Password is too weak.");
            } else {
                setGeneralError(error.message || "Failed to create account. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isValid = (val: string, err: string, touched: boolean) => touched && !err && val.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[340px] mx-auto"
        >
            {/* Main Glass Panel */}
            <div className="glass-card rounded-[22px] p-1.5 relative overflow-hidden backdrop-blur-2xl bg-black/40 border border-white/5 shadow-2xl ring-1 ring-white/5">
                <div className="bg-[#0a0a0f]/90 rounded-[18px] p-5 relative overflow-hidden">
                    {/* Subtle internal glow or texture */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
                        {/* Error Message */}
                        <AnimatePresence>
                            {generalError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 flex items-center gap-2 text-red-400 text-xs mb-2"
                                >
                                    <AlertCircle size={14} />
                                    <span>{generalError}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Social Grid - Top */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                whileTap={{ scale: 0.98 }}
                                className="h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </motion.button>

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                whileTap={{ scale: 0.98 }}
                                className="h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors group relative overflow-hidden"
                            >
                                <svg className="w-5 h-5 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </motion.button>

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                whileTap={{ scale: 0.98 }}
                                className="h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors group relative overflow-hidden"
                            >
                                <svg className="w-5 h-5 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </motion.button>
                        </div>

                        <div className="relative py-1">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/[0.06]" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                                <span className="bg-[#0a0a0f] px-2 text-muted-foreground/60">Or sign up with</span>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div className="group relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-[hsl(var(--mora-accent))]">
                                    <User size={15} />
                                </div>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onBlur={() => handleBlur('username')}
                                    className={`pl-10 h-10 bg-black/20 border-white/5 text-white placeholder:text-muted-foreground/40 focus:bg-black/40 focus:border-[hsl(var(--mora-accent))]/30 transition-all rounded-lg text-xs ${isValid(username, usernameError, usernameTouched) ? 'border-green-500/30 bg-green-500/5' : ''} ${usernameError ? 'border-red-500/30 bg-red-500/5' : ''}`}
                                />
                            </div>

                            <div className="group relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-[hsl(var(--mora-accent))]">
                                    <Mail size={15} />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={() => handleBlur('email')}
                                    className={`pl-10 h-10 bg-black/20 border-white/5 text-white placeholder:text-muted-foreground/40 focus:bg-black/40 focus:border-[hsl(var(--mora-accent))]/30 transition-all rounded-lg text-xs ${isValid(email, emailError, emailTouched) ? 'border-green-500/30 bg-green-500/5' : ''} ${emailError ? 'border-red-500/30 bg-red-500/5' : ''}`}
                                />
                            </div>

                            <div className="group relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition-colors group-focus-within:text-[hsl(var(--mora-accent))]">
                                    <Lock size={15} />
                                </div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={() => handleBlur('password')}
                                    className={`pl-10 pr-10 h-10 bg-black/20 border-white/5 text-white placeholder:text-muted-foreground/40 focus:bg-black/40 focus:border-[hsl(var(--mora-accent))]/30 transition-all rounded-lg text-xs ${passwordError ? 'border-red-500/30 bg-red-500/5' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 mt-1 bg-gradient-to-r from-[hsl(var(--mora-gradient-start))] to-[hsl(var(--mora-gradient-end))] hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 rounded-lg font-bold shadow-lg shadow-teal-500/20 text-xs tracking-wide text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </Button>

                        <div className="flex items-center justify-center text-[10px] pt-0.5 opacity-80">
                            <span className="text-muted-foreground mr-1">Already have an account?</span>
                            <Link to="/" className="text-[hsl(var(--mora-accent))] hover:text-white transition-colors font-medium">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};
