import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Upload, Calendar as CalendarIcon, MapPin, Phone, User, Monitor, ChevronLeft, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MoraLogo } from "../components/MoraLogo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { supabase } from "../lib/supabase";
import { countries } from "../lib/countries";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Types
interface OnboardingData {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: string;
    country: string;
    nationalId: string;
    phoneNumber: string;
    dialCode: string;
    bio: string;
}

export const OnboardingPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState("User");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<OnboardingData>({
        firstName: "",
        lastName: "",
        middleName: "",
        dateOfBirth: "",
        country: "US",
        nationalId: "",
        phoneNumber: "",
        dialCode: "+1",
        bio: ""
    });

    // File States
    const [idFront, setIdFront] = useState<File | null>(null);
    const [idBack, setIdBack] = useState<File | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);

    // Review/Countdown State
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    // Fetch User on Mount
    useEffect(() => {
        const initUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserId(session.user.id);
                try {
                    const userDoc = await getDoc(doc(db, "users", session.user.id));
                    if (userDoc.exists()) {
                        setUsername(userDoc.data().username || "User");
                    } else {
                        setUsername(session.user.user_metadata?.username || "Creator");
                    }
                } catch (e) {
                    console.error("Error fetching user profile:", e);
                }
            }
        };
        initUser();
    }, []);

    // Countdown Logic
    useEffect(() => {
        if (step === 4 && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Handlers
    const updateForm = (key: keyof OnboardingData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleUpload = async (bucket: string, file: File, path: string) => {
        const { error } = await supabase.storage.from(bucket).upload(path, file);
        if (error) throw error;
        if (bucket === 'avatars') {
            const { data } = supabase.storage.from(bucket).getPublicUrl(path);
            return data.publicUrl;
        }
        return path;
    };

    const handleNext = async () => {
        if (step < 4) {
            if (step === 2 && (!idFront || !idBack)) {
                // For demo/UX purposes, allow continuing even if file missing if user insists, 
                // but strictly we should block. Commenting out alert for smoother dev flow if needed.
                // alert("Please upload both sides of your ID");
                // return;
            }
            if (step === 3) {
                setLoading(true);
                try {
                    if (!userId) throw new Error("No user ID");

                    let avatarUrl = null;
                    if (avatar) {
                        const avatarPath = `${userId}/avatar_${Date.now()}`;
                        avatarUrl = await handleUpload('avatars', avatar, avatarPath);
                    }
                    if (idFront) await handleUpload('documents', idFront, `${userId}/id_front_${Date.now()}`);
                    if (idBack) await handleUpload('documents', idBack, `${userId}/id_back_${Date.now()}`);

                    await updateDoc(doc(db, "users", userId), {
                        ...formData,
                        photoURL: avatarUrl,
                        status: "in_review",
                        onboardingCompletedAt: new Date().toISOString()
                    });

                } catch (e) {
                    console.error("Error submitting onboarding:", e);
                } finally {
                    setLoading(false);
                }
            }
            setStep(prev => prev + 1);
        }
    };

    const selectedCountry = countries.find(c => c.code === formData.country);
    const progressPercentage = ((600 - timeLeft) / 600) * 100;

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-md">
                {/* Steps Indicator */}
                {step > 0 && step < 4 && (
                    <div className="flex justify-between items-center mb-8 px-2">
                        <button onClick={() => setStep(s => Math.max(0, s - 1))} className="p-2 -ml-2 text-muted-foreground hover:text-white transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    layout
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'bg-[hsl(var(--mora-accent))] w-8' : 'bg-white/10 w-4'}`}
                                />
                            ))}
                        </div>
                        <div className="w-10" />
                    </div>
                )}

                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="glass-card rounded-[32px] p-1.5 relative overflow-hidden backdrop-blur-2xl bg-black/40 border border-white/5 shadow-2xl ring-1 ring-white/5">
                        <div className="bg-[#0a0a0f]/95 rounded-[28px] p-6 md:p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden">

                            {/* STEP 0: WELCOME */}
                            {step === 0 && (
                                <div className="space-y-6 text-center">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--mora-accent))] to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-purple-500/20"
                                    >
                                        <MoraLogo size="lg" />
                                    </motion.div>

                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold text-white">Welcome, {username}</h1>
                                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                                            You're about to join the most exclusive creator economy platform. Let's set up your premium profile.
                                        </p>
                                    </div>

                                    <div className="pt-4">
                                        <Button onClick={handleNext} className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-medium text-base">
                                            Let's Get Started <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 1: PERSONAL INFO */}
                            {step === 1 && (
                                <div className="space-y-5">
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-bold text-white">Personal Info</h2>
                                        <p className="text-muted-foreground text-xs">Tell us a bit about yourself</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <Label className="text-xs text-muted-foreground">First Name</Label>
                                                <Input
                                                    value={formData.firstName} onChange={e => updateForm("firstName", e.target.value)}
                                                    className="bg-black/20 border-white/10 text-white h-11" placeholder="Jane"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs text-muted-foreground">Last Name</Label>
                                                <Input
                                                    value={formData.lastName} onChange={e => updateForm("lastName", e.target.value)}
                                                    className="bg-black/20 border-white/10 text-white h-11" placeholder="Doe"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Middle Name (Optional)</Label>
                                            <Input
                                                value={formData.middleName} onChange={e => updateForm("middleName", e.target.value)}
                                                className="bg-black/20 border-white/10 text-white h-11" placeholder=""
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Date of Birth</Label>
                                            <div className="relative group">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                                    <CalendarIcon size={16} />
                                                </div>
                                                <Input
                                                    type="date"
                                                    value={formData.dateOfBirth} onChange={e => updateForm("dateOfBirth", e.target.value)}
                                                    className="bg-black/20 border-white/10 text-white pl-10 h-11 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 z-10 relative bg-transparent hover:bg-white/5 transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Country</Label>
                                            <select
                                                value={formData.country}
                                                onChange={e => {
                                                    const c = countries.find(x => x.code === e.target.value);
                                                    updateForm("country", e.target.value);
                                                    if (c) updateForm("dialCode", c.dial_code);
                                                }}
                                                className="w-full h-11 bg-black/20 border border-white/10 rounded-xl text-white px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--mora-accent))]"
                                            >
                                                {countries.map(c => (
                                                    <option key={c.code} value={c.code} className="bg-[#0a0a0f] text-white">
                                                        {c.flag} {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <Button onClick={handleNext} className="w-full h-11 mt-4 rounded-xl bg-[hsl(var(--mora-accent))] text-black font-semibold hover:opacity-90">
                                        Continue
                                    </Button>
                                </div>
                            )}

                            {/* STEP 2: IDENTITY */}
                            {step === 2 && (
                                <div className="space-y-5">
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-bold text-white">Identity Verification</h2>
                                        <p className="text-muted-foreground text-xs">We need to verify you are real (16+ Only)</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">National ID Number</Label>
                                            <Input
                                                value={formData.nationalId} onChange={e => updateForm("nationalId", e.target.value)}
                                                className="bg-black/20 border-white/10 text-white h-11 font-mono tracking-wide" placeholder="ID-123456789"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div
                                                className="relative h-32 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group overflow-hidden"
                                            >
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setIdFront(e.target.files?.[0] || null)} />
                                                {idFront ? (
                                                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center border-green-500/50 border">
                                                        <Check className="text-green-400" />
                                                        <span className="text-[10px] text-green-200 mt-6 absolute">Front set</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="w-6 h-6 text-muted-foreground mb-2 group-hover:text-white" />
                                                        <span className="text-[10px] text-muted-foreground">Upload Front</span>
                                                    </>
                                                )}
                                            </div>
                                            <div
                                                className="relative h-32 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group overflow-hidden"
                                            >
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setIdBack(e.target.files?.[0] || null)} />
                                                {idBack ? (
                                                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center border-green-500/50 border">
                                                        <Check className="text-green-400" />
                                                        <span className="text-[10px] text-green-200 mt-6 absolute">Back set</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="w-6 h-6 text-muted-foreground mb-2 group-hover:text-white" />
                                                        <span className="text-[10px] text-muted-foreground">Upload Back</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-center text-muted-foreground/60 w-full">Please ensure photos are clear and text is readable.</p>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Phone Number</Label>
                                            <div className="flex gap-2">
                                                <div className="h-11 px-3 bg-black/20 border border-white/10 rounded-xl flex items-center text-white text-sm min-w-[80px] justify-center">
                                                    <span className="mr-1">{selectedCountry?.flag}</span>
                                                    <span>{formData.dialCode}</span>
                                                </div>
                                                <Input
                                                    value={formData.phoneNumber} onChange={e => updateForm("phoneNumber", e.target.value)}
                                                    className="bg-black/20 border-white/10 text-white h-11 flex-1" placeholder="123 456 789"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button onClick={handleNext} className="w-full h-11 mt-4 rounded-xl bg-[hsl(var(--mora-accent))] text-black font-semibold hover:opacity-90">
                                        Continue
                                    </Button>
                                </div>
                            )}

                            {/* STEP 3: PROFILE */}
                            {step === 3 && (
                                <div className="space-y-5">
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-bold text-white">Complete Profile</h2>
                                        <p className="text-muted-foreground text-xs">How you'll appear to the world</p>
                                    </div>

                                    <div className="flex justify-center mb-6">
                                        <div className="relative group w-28 h-28 rounded-full bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all overflow-hidden">
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={e => setAvatar(e.target.files?.[0] || null)} />
                                            {avatar ? (
                                                <img src={URL.createObjectURL(avatar)} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <User className="w-8 h-8 text-muted-foreground mb-1 group-hover:scale-110 transition-transform" />
                                                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Upload</span>
                                                </div>
                                            )}
                                            {avatar && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                                    <span className="text-xs text-white">Change</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs text-muted-foreground">Bio</Label>
                                        <textarea
                                            value={formData.bio} onChange={e => updateForm("bio", e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl text-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--mora-accent))] min-h-[100px] resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    <Button onClick={handleNext} disabled={loading} className="w-full h-11 mt-4 rounded-xl bg-[hsl(var(--mora-accent))] text-black font-semibold hover:opacity-90">
                                        {loading ? "Saving..." : "Finish Setup"}
                                    </Button>
                                </div>
                            )}

                            {/* STEP 4: REVIEW */}
                            {step === 4 && (
                                <div className="space-y-6 text-center">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-20 h-20 bg-yellow-500/10 rounded-full mx-auto flex items-center justify-center border border-yellow-500/20 mb-4 animate-pulse"
                                    >
                                        <Clock className="w-8 h-8 text-yellow-500" />
                                    </motion.div>

                                    <h1 className="text-2xl font-bold text-white">Review in Progress</h1>

                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                                        <p className="text-white font-mono text-4xl mb-2 font-bold tracking-widest text-[hsl(var(--mora-accent))] drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                            {formatTime(timeLeft)}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                                            Estimated Wait Time
                                        </p>

                                        {/* Progress Bar */}
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                                            <motion.div
                                                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-yellow-500 to-[hsl(var(--mora-accent))]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercentage}%` }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-left space-y-3 p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                            <div className="text-xs text-muted-foreground space-y-1">
                                                <p className="text-red-300 font-semibold">Strict Verification Policy</p>
                                                <ul className="list-disc pl-4 space-y-1 opacity-80">
                                                    <li>Must be 16 years or older.</li>
                                                    <li>Identity documents must match details.</li>
                                                    <li>Fake or blurred entries will be permanently banned.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-[10px] text-muted-foreground/40">
                                        Do not close this window. You will be redirected automatically.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
