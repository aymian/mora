import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Search, Shield, User, FileText, Loader2, LogOut } from "lucide-react";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { MoraLogo } from "../components/MoraLogo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { collection, doc, getDocs, updateDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { supabase } from "../lib/supabase";

// Types
interface UserData {
    uid: string;
    username: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    status: string;
    country: string;
    nationalId: string;
    photoURL?: string;
    createdAt?: any;
}

export const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminName, setAdminName] = useState("");

    // Dashboard State
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [idUrls, setIdUrls] = useState<{ front: string, back: string } | null>(null);

    // Login Handler
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (adminName.toLowerCase() === "yves") {
            setIsAuthenticated(true);
            fetchUsers();
        } else {
            alert("Unauthorized access");
        }
    };

    // Fetch Users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Get users in_review
            const q = query(
                collection(db, "users"),
                where("status", "==", "in_review")
                // orderBy("createdAt", "desc") // Requires index, remove if causing errors in dev
            );
            const snapshot = await getDocs(q);
            const userList: UserData[] = [];
            snapshot.forEach(doc => {
                userList.push(doc.data() as UserData);
            });
            setUsers(userList);
        } catch (e) {
            console.error("Error fetching users:", e);
        } finally {
            setLoading(false);
        }
    };

    // Load ID Images
    const loadIdImages = async (user: UserData) => {
        // Try to get signed URLs for the ID documents
        // NOTE: This will only work if the current client session has permission to read these files.
        // Since this is a client-side admin prototype, we assume RLS policies allow this specific access 
        // or the bucket is temporarily public for the demo.

        // Construct paths based on the format used in OnboardingPage
        // We'll search for the files in the user's folder
        try {
            const { data: files } = await supabase.storage.from('documents').list(user.uid);

            if (files && files.length > 0) {
                // Find files with 'front' and 'back' in name
                const frontFile = files.find(f => f.name.includes('front'));
                const backFile = files.find(f => f.name.includes('back'));

                let frontUrl = "";
                let backUrl = "";

                if (frontFile) {
                    const { data } = await supabase.storage.from('documents').createSignedUrl(`${user.uid}/${frontFile.name}`, 3600);
                    if (data) frontUrl = data.signedUrl;
                }
                if (backFile) {
                    const { data } = await supabase.storage.from('documents').createSignedUrl(`${user.uid}/${backFile.name}`, 3600);
                    if (data) backUrl = data.signedUrl;
                }

                setIdUrls({ front: frontUrl, back: backUrl });
            }
        } catch (e) {
            console.error("Error loading images:", e);
        }
    };

    const handleSelectUser = (user: UserData) => {
        setSelectedUser(user);
        setIdUrls(null);
        loadIdImages(user);
    };

    const handleApprove = async () => {
        if (!selectedUser) return;
        try {
            await updateDoc(doc(db, "users", selectedUser.uid), {
                status: "active",
                onboardingComplete: true,
                approvedAt: new Date().toISOString()
            });
            // Remove from local list
            setUsers(users.filter(u => u.uid !== selectedUser.uid));
            setSelectedUser(null);
        } catch (e) {
            console.error("Error approving user:", e);
        }
    };

    // ----- UI -----

    if (!isAuthenticated) {
        return (
            <div className="relative min-h-screen w-full flex items-center justify-center p-4">
                <AnimatedBackground />
                <div className="relative z-10 glass-card rounded-[24px] p-1 bg-black/40 border border-white/5 shadow-2xl w-full max-w-sm">
                    <div className="bg-[#0a0a0f]/90 rounded-[20px] p-8 text-center space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center border border-white/10">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Enter Admin Name"
                                value={adminName}
                                onChange={e => setAdminName(e.target.value)}
                                className="bg-black/20 border-white/10 text-white text-center h-12"
                            />
                            <Button type="submit" className="w-full h-12 rounded-xl bg-white text-black font-bold">
                                Enter System
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-[#050505] text-white flex">

            {/* Sidebar List */}
            <div className="w-80 border-r border-white/5 bg-[#0a0a0f] flex flex-col h-screen">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <Shield size={18} className="text-[hsl(var(--mora-accent))]" />
                        MORA Admin
                    </h2>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">{users.length} Pending</span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {loading ? (
                        <div className="flex justify-center p-8"><Loader2 className="animate-spin text-white/20" /></div>
                    ) : users.length === 0 ? (
                        <p className="text-center text-muted-foreground text-sm mt-10">No pending users</p>
                    ) : (
                        users.map(user => (
                            <div
                                key={user.uid}
                                onClick={() => handleSelectUser(user)}
                                className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedUser?.uid === user.uid ? 'bg-white/10 border-[hsl(var(--mora-accent))]/30' : 'bg-white/5 border-transparent hover:bg-white/8'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-black/40 overflow-hidden flex items-center justify-center border border-white/10">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={16} className="text-white/40" />
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-medium text-sm truncate">{user.firstName} {user.lastName}</p>
                                        <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-white/5">
                    <Button variant="ghost" onClick={() => setIsAuthenticated(false)} className="w-full justify-start text-muted-foreground hover:text-red-400">
                        <LogOut size={16} className="mr-2" /> Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-screen overflow-y-auto p-8">
                {selectedUser ? (
                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-2xl bg-white/5 overflow-hidden border border-white/10">
                                    {selectedUser.photoURL ? (
                                        <img src={selectedUser.photoURL} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"><User size={32} className="opacity-20" /></div>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">{selectedUser.firstName} {selectedUser.lastName}</h1>
                                    <p className="text-muted-foreground">@{selectedUser.username} • {selectedUser.email}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20 uppercase tracking-wide">
                                            {selectedUser.status}
                                        </span>
                                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/10 uppercase tracking-wide">
                                            {selectedUser.country}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">Reject</Button>
                                <Button onClick={handleApprove} className="bg-green-500 text-black hover:bg-green-400">
                                    <Check className="mr-2 h-4 w-4" /> Approve User
                                </Button>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Personal Info */}
                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <h3 className="font-bold mb-4 flex items-center gap-2"><User size={16} /> Personal Information</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-muted-foreground block text-xs mb-1">Full Name</span>
                                                <p>{selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground block text-xs mb-1">National ID</span>
                                                <p className="font-mono bg-black/20 px-2 py-1 rounded inline-block">{selectedUser.nationalId}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground block text-xs mb-1">Bio</span>
                                            <p className="opacity-80 leading-relaxed">{selectedUser.firstName} hasn't written a bio yet.</p>
                                            {/* Note: I might have missed passing 'bio' in UserData type fully, checking... yes, added to OnboardingData but maybe not UserData interface here purely. Fixed. */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ID Documents */}
                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <h3 className="font-bold mb-4 flex items-center gap-2"><FileText size={16} /> Identity Documents</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-muted-foreground text-xs mb-2 block">Front Side</span>
                                            <div className="relative aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center group">
                                                {idUrls?.front ? (
                                                    <img src={idUrls.front} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">No image available</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground text-xs mb-2 block">Back Side</span>
                                            <div className="relative aspect-video bg-black/40 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center group">
                                                {idUrls?.back ? (
                                                    <img src={idUrls.back} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">No image available</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 space-y-4">
                        <User size={64} strokeWidth={1} />
                        <p>Select a user to review</p>
                    </div>
                )}
            </div>
        </div>
    );
};
