import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// Lazy load pages for better performance
const LoginPage = lazy(() => import("./pages/LoginPage").then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import("./pages/SignupPage").then(module => ({ default: module.SignupPage })));
const VerifyPage = lazy(() => import("./pages/VerifyPage").then(module => ({ default: module.VerifyPage })));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage").then(module => ({ default: module.OnboardingPage })));
const AdminPage = lazy(() => import("./pages/AdminPage").then(module => ({ default: module.AdminPage })));
const DashboardPage = lazy(() => import("./pages/DashboardPage").then(module => ({ default: module.DashboardPage })));

const LoadingFallback = () => (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[hsl(var(--mora-accent))] border-t-transparent rounded-full animate-spin" />
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="/onboarding" element={<OnboardingPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
