import { motion } from "framer-motion";
import { MoraLogo } from "../components/MoraLogo";
import { Button } from "../components/ui/button";
import { LogOut, Home, User, Settings, Bell } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <nav className="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MoraLogo size="sm" />
                        <span className="font-bold tracking-tight">MORA</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" className="text-muted-foreground hover:text-white"><Home size={20} /></Button>
                        <Button variant="ghost" className="text-muted-foreground hover:text-white"><Bell size={20} /></Button>
                        <Button variant="ghost" className="text-muted-foreground hover:text-white"><Settings size={20} /></Button>
                        <div className="w-px h-6 bg-white/10" />
                        <Button variant="ghost" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <LogOut size={18} className="mr-2" /> Logout
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-gradient-to-r from-[hsl(var(--mora-accent))] to-purple-600 rounded-[32px] p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />

                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Welcome to Mora</h1>
                            <p className="text-white/80 text-lg leading-relaxed mb-8">
                                Your account is fully verified and active. You now have exclusive access to the creator economy platform.
                            </p>
                            <Button className="bg-white text-black hover:bg-white/90 rounded-xl h-12 px-8 font-semibold">
                                Explore Marketplace
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group cursor-pointer">
                                <div className="w-12 h-12 rounded-xl bg-white/5 mb-4 flex items-center justify-center group-hover:bg-[hsl(var(--mora-accent))]/20 transition-colors">
                                    <User className="text-muted-foreground group-hover:text-[hsl(var(--mora-accent))]" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Feature Block {i}</h3>
                                <p className="text-sm text-muted-foreground">Placeholder content for the dashboard features.</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
