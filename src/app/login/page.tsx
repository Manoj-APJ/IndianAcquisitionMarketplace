"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import {
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    ShieldCheck,
    ArrowRightLeft,
    Lock,
    Zap,
    Star
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
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
                window.location.href = "/";
            }
        }
        setIsLoading(false);
    };

    if (message) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <div className="bg-green-50 border-2 border-black p-12 shadow-neo max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-white border-2 border-black flex items-center justify-center mx-auto mb-6 shadow-neo-sm rotate-3">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black mb-4 uppercase">Success!</h2>
                    <p className="text-gray-600 font-bold mb-8">{message}</p>
                    <Button
                        variant="outline"
                        className="w-full font-black uppercase border-2 border-black h-12"
                        onClick={() => setMessage(null)}
                    >
                        Back to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Column - Marketing Content */}
            <div className="hidden lg:flex flex-col justify-between bg-blue-900 text-white p-10 xl:p-16 2xl:p-24 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />

                <div className="relative z-10">
                    <Link href="/" className="text-2xl xl:text-3xl font-black tracking-tighter uppercase mb-12 xl:mb-20 block group">
                        Market<span className="text-amber-400 group-hover:text-amber-300 transition-colors">X</span>
                    </Link>

                    <div className="inline-flex items-center gap-2 bg-amber-500 text-black px-3 py-1.5 xl:px-4 xl:py-2 font-black text-[10px] xl:text-xs uppercase mb-6 xl:mb-8 shadow-neo-sm">
                        <Star size={14} fill="currentColor" />
                        Voted #1 Acquisition Platform
                    </div>

                    <h1 className="text-4xl xl:text-5xl 2xl:text-7xl font-black leading-[0.95] mb-8 xl:mb-12 tracking-tight">
                        Built for <br />
                        <span className="text-amber-400">Serious</span> <br />
                        Founders.
                    </h1>

                    <div className="space-y-6 xl:space-y-10 max-w-sm xl:max-w-md">
                        <div className="flex gap-4 xl:gap-6 group">
                            <div className="bg-white/10 p-3 xl:p-4 h-fit border-2 border-black shadow-neo-sm group-hover:-translate-y-1 transition-all">
                                <TrendingUp className="text-amber-400" size={20} />
                            </div>
                            <div>
                                <h3 className="text-base xl:text-xl font-black uppercase tracking-tight mb-1">Verified Data Only</h3>
                                <p className="text-blue-100 text-xs xl:text-base font-bold leading-relaxed">Direct data sync with Stripe and GA4 for 100% accuracy.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 xl:gap-6 group">
                            <div className="bg-white/10 p-3 xl:p-4 h-fit border-2 border-black shadow-neo-sm group-hover:-translate-y-1 transition-all">
                                <Lock className="text-amber-400" size={20} />
                            </div>
                            <div>
                                <h3 className="text-base xl:text-xl font-black uppercase tracking-tight mb-1">NDA-Gated Privacy</h3>
                                <p className="text-blue-100 text-xs xl:text-base font-bold leading-relaxed">Your data is only visible to buyers you verify.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 xl:gap-6 group">
                            <div className="bg-white/10 p-3 xl:p-4 h-fit border-2 border-black shadow-neo-sm group-hover:-translate-y-1 transition-all">
                                <Zap className="text-amber-400" size={20} />
                            </div>
                            <div>
                                <h3 className="text-base xl:text-xl font-black uppercase tracking-tight mb-1">0% Commission</h3>
                                <p className="text-blue-100 text-xs xl:text-base font-bold leading-relaxed">Keep every cent of your hard-earned exit.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs font-black uppercase tracking-widest text-blue-300">
                    <span>© {new Date().getFullYear()} MarketX International</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>

            {/* Right Column - Auth Form */}
            <div className="flex items-center justify-center p-6 bg-amber-50 relative overflow-hidden">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-1/2 -translate-x-1/2">
                    <Link href="/" className="text-2xl font-black tracking-tighter uppercase">MarketX</Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-white border-2 border-black p-6 md:p-8 shadow-neo-sm relative z-10">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-black uppercase mb-1 tracking-tighter">
                                {mode === "signin" ? "Welcome Back" : "Join MarketX"}
                            </h2>
                            <p className="text-gray-500 text-sm font-bold">
                                {mode === "signin"
                                    ? "Securely login to your dashboard."
                                    : "Start your journey to a successful exit."}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-50 border-2 border-black text-red-600 flex gap-3 items-center shadow-neo-sm">
                                <AlertCircle size={18} strokeWidth={3} />
                                <p className="text-xs font-black uppercase">{error}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Social Auth */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-11 border-2 border-black bg-white hover:bg-gray-100 font-black uppercase flex items-center justify-center gap-2 transition-all text-xs"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </Button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t-2 border-black/10"></div>
                                <span className="flex-shrink mx-4 text-[10px] font-black uppercase text-gray-400">Or use email</span>
                                <div className="flex-grow border-t-2 border-black/10"></div>
                            </div>

                            {/* Email Form */}
                            <form onSubmit={handleEmailAuth} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1.5 tracking-widest text-gray-500">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border-2 border-black p-3 text-sm font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                                        placeholder="founder@company.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
                                        {mode === "signin" && (
                                            <Link href="/forgot-password" className="text-[10px] font-black uppercase underline text-gray-400 hover:text-black">
                                                Forgot?
                                            </Link>
                                        )}
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full border-2 border-black p-3 text-sm font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
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
                                    className="w-full h-12 text-sm font-black uppercase shadow-neo-sm hover:translate-x-0.5 hover:-translate-y-0.5 transition-all bg-black text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "One moment..."
                                        : mode === "signin" ? "Sign In" : "Create Account"}
                                </Button>
                            </form>

                            <div className="pt-2 border-t-2 border-black/5">
                                <Button
                                    onClick={() => {
                                        setMode(mode === "signin" ? "signup" : "signin");
                                        setError(null);
                                    }}
                                    variant="outline"
                                    className="w-full h-12 text-xs font-black uppercase border-2 border-black bg-amber-100 hover:bg-amber-200"
                                >
                                    {mode === "signin"
                                        ? "New here? Build your profile"
                                        : "Already a member? Sign in now"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Trust Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-[10px] font-bold text-gray-400 flex items-center justify-center gap-2 uppercase tracking-tighter">
                            <ShieldCheck size={12} className="text-green-600" />
                            Secure authentication by Supabase
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
