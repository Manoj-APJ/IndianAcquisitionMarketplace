"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import {
    CheckCircle2,
    AlertCircle,
    Shield,
    MessageSquare,
    Lock,
    Zap,
    Sparkles,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const nextPath = searchParams.get("next") || "/listings";

    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (error) setError(error.message);
        setIsLoading(false);
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        if (mode === "signup") {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                    data: {
                        role: 'buyer',
                    },
                },
            });

            if (error) {
                setError(error.message);
            } else {
                setMessage("Check your email for the confirmation link.");
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                // Redirect to intended path or listings
                window.location.href = nextPath;
            }
        }
        setIsLoading(false);
    };

    if (message) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-[32px] p-12 shadow-soft-xl max-w-lg w-full text-center border border-gray-100">
                    <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow">
                        <CheckCircle2 size={40} className="text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Check your email</h2>
                    <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                        We've sent a verification link to your email address.
                        Please click the link to confirm your account.
                    </p>
                    <Button
                        variant="primary"
                        className="w-full font-bold rounded-2xl h-14 text-lg"
                        onClick={() => setMessage(null)}
                    >
                        Return to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex lg:grid lg:grid-cols-2 bg-white selection:bg-emerald-100 overflow-hidden">
            {/* Left Column - Vibrant Branding */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white p-10 xl:p-16 relative overflow-hidden shrink-0">
                {/* Background Details */}
                <div className="absolute inset-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/20 rounded-full blur-[100px] animate-float" />
                    <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-emerald-400/10 rounded-full blur-[80px] animate-float-delayed" />
                    <div className="absolute inset-0 pattern-dots opacity-10" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <Link href="/" className="flex items-center gap-3 mb-12 group self-start">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Zap size={20} className="text-emerald-600" fill="currentColor" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white tracking-tight leading-none">AcquireX</span>
                            <span className="text-[10px] font-bold text-emerald-100/60 mt-0.5 tracking-widest uppercase">Marketplace</span>
                        </div>
                    </Link>

                    <div className="max-w-lg">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full mb-6 backdrop-blur-md">
                            <Sparkles size={14} className="text-yellow-300" />
                            <span className="text-xs font-semibold text-emerald-50">Empowering Next-Gen Acquisitions</span>
                        </div>

                        <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-6 tracking-tight">
                            The journey to your <br />
                            <span className="text-yellow-300">dream exit</span> starts here.
                        </h1>

                        <p className="text-emerald-50/80 text-lg mb-8 leading-relaxed font-medium">
                            Join the world's most focused marketplace for buying and selling digital businesses.
                        </p>

                        <div className="space-y-6">
                            <FeatureItem
                                icon={<Shield size={20} className="text-emerald-400" />}
                                title="NDA Protected Data"
                                description="Your sensitive metrics stay private."
                            />
                            <FeatureItem
                                icon={<MessageSquare size={20} className="text-emerald-400" />}
                                title="Direct Founder Access"
                                description="Skip brokers, talk to owners."
                            />
                            <FeatureItem
                                icon={<Zap size={20} className="text-yellow-300" />}
                                title="Zero Commission"
                                description="Keep every penny of your exit."
                            />
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-emerald-100/50 text-xs font-medium pt-8">
                    <span>© {new Date().getFullYear()} AcquireX Inc.</span>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Elegant Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-8 xl:p-12 bg-gray-50/50 pattern-grid overflow-y-auto">
                <div className="w-full max-w-md my-auto">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-glow">
                                <Zap size={20} className="text-white" fill="currentColor" />
                            </div>
                            <span className="text-xl font-black text-gray-900 tracking-tight">AcquireX</span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-soft-xl border border-gray-100 relative overflow-hidden group">
                        {/* Interactive Border Effect */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
                                {mode === "signin" ? "Welcome back" : "Create account"}
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                {mode === "signin"
                                    ? "Enter your credentials to continue"
                                    : "Start your acquisition journey today"}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 rounded-2xl text-red-600 flex gap-3 items-center border border-red-100">
                                <AlertCircle size={18} className="shrink-0" />
                                <p className="text-xs font-semibold">{error}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Google Auth */}
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full h-12 rounded-2xl border-2 border-gray-100 bg-white hover:bg-gray-50 hover:border-emerald-100 font-bold text-sm text-gray-700 flex items-center justify-center gap-3 transition-all group/btn shadow-sm active:scale-[0.98]"
                            >
                                <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="relative flex items-center py-1">
                                <div className="flex-grow border-t border-gray-100"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">or email</span>
                                <div className="flex-grow border-t border-gray-100"></div>
                            </div>

                            {/* Email Form */}
                            <form onSubmit={handleEmailAuth} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-gray-700 ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-300"
                                        placeholder="name@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="block text-xs font-bold text-gray-700">
                                            Password
                                        </label>
                                        {mode === "signin" && (
                                            <Link href="/forgot-password" title="Wait, I forgot!" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider">
                                                Forgot?
                                            </Link>
                                        )}
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-300"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-2xl font-black text-base bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transform active:scale-[0.98] shadow-glow"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Working..."
                                        : mode === "signin" ? "Sign In" : "Create Account"}
                                    {!isLoading && <ArrowRight size={18} className="ml-2" />}
                                </Button>
                            </form>

                            <div className="text-center pt-2">
                                <button
                                    onClick={() => {
                                        setMode(mode === "signin" ? "signup" : "signin");
                                        setError(null);
                                    }}
                                    className="text-xs font-bold text-gray-500 hover:text-emerald-600 transition-all group"
                                >
                                    {mode === "signin"
                                        ? "New to AcquireX? "
                                        : "Already have an account? "}
                                    <span className="text-emerald-600 underline decoration-2 underline-offset-4 group-hover:text-emerald-700">
                                        {mode === "signin" ? "Join now" : "Log in"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-[10px] font-bold text-gray-300 flex items-center justify-center gap-2 uppercase tracking-widest text-center">
                        <Lock size={10} />
                        Bank-Grade Security & Encryption
                    </p>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex gap-4 items-start bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 shadow-inner">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-white mb-0.5 text-base">{title}</h3>
                <p className="text-emerald-100/60 text-xs leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
