"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CheckCircle2, AlertCircle, TrendingUp, ShieldCheck, ArrowRightLeft } from "lucide-react";
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

        // Default to 'buyer' role - permissions are action-based now
        const defaultRole = 'buyer';

        if (mode === "signup") {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                    data: {
                        role: defaultRole,
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
            <div className="container mx-auto px-4 py-20 flex flex-col items-center max-w-lg text-center">
                <div className="bg-green-50, border-2 border-black p-8 shadow-neo w-full">
                    <CheckCircle2 size={48} className="text-green-600 mb-4 mx-auto" />
                    <h2 className="text-2xl font-black mb-2">Success</h2>
                    <p className="text-gray-600 font-bold">{message}</p>
                </div>
                <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setMessage(null)}
                >
                    Back to Login
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Column - Value Props (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col justify-between bg-black text-white p-16 relative overflow-hidden">
                <div className="relative z-10">
                    <Link href="/" className="text-3xl font-black tracking-tighter uppercase mb-12 block">MarketX</Link>

                    <h1 className="text-5xl font-black leading-tight mb-8">
                        Buy & Sell Profitable <br />
                        <span className="text-blue-500">Online Businesses.</span>
                    </h1>

                    <div className="space-y-8 max-w-md">
                        <div className="flex gap-4">
                            <div className="bg-white/10 p-3 h-fit border border-white/20">
                                <TrendingUp className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Discover Profitable Projects</h3>
                                <p className="text-gray-400">Browse vetted micro-SaaS, newsletters, and communities generating real revenue.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white/10 p-3 h-fit border border-white/20">
                                <ArrowRightLeft className="text-green-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Negotiate Safely</h3>
                                <p className="text-gray-400">Structure offers and counter-offers directly on the platform without the chaos.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white/10 p-3 h-fit border border-white/20">
                                <ShieldCheck className="text-orange-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Transfer with Confidence</h3>
                                <p className="text-gray-400">Use our secure deal rooms and transfer checklists to close the deal.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm font-medium text-gray-500">
                    © {new Date().getFullYear()} MarketX Inc.
                </div>

                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/4"></div>
            </div>

            {/* Right Column - Auth Form */}
            <div className="flex items-center justify-center p-8 lg:p-16 bg-[#fdfbf7]">
                <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-neo">
                    <div className="lg:hidden mb-8 text-center">
                        <Link href="/" className="text-2xl font-black tracking-tighter uppercase">MarketX</Link>
                    </div>

                    <h2 className="text-3xl font-black mb-2 text-center">
                        {mode === "signin" ? "Welcome Back" : "Join the Marketplace"}
                    </h2>
                    <p className="text-center text-gray-500 font-medium mb-8">
                        {mode === "signin" ? "Login to manage your listings and offers." : "Create an account to start buying or selling."}
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 flex gap-2 items-start">
                            <AlertCircle className="text-red-500 shrink-0" size={20} />
                            <p className="text-sm font-bold text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12 relative bg-white hover:bg-gray-50"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t-2 border-black/10"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#fdfbf7] px-2 text-gray-400 font-bold">Or with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                                    disabled={isLoading}
                                />
                                {mode === "signin" && (
                                    <div className="text-right mt-1">
                                        <Link href="/forgot-password" className="text-xs font-bold text-gray-400 hover:text-black">Forgot password?</Link>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-lg"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Processing..."
                                    : mode === "signin" ? "Sign In" : "Create Account"
                                }
                            </Button>
                        </form>

                        <div className="text-center pt-2">
                            <button
                                onClick={() => {
                                    setMode(mode === "signin" ? "signup" : "signin");
                                    setError(null);
                                }}
                                className="text-sm font-bold underline hover:text-blue-600"
                            >
                                {mode === "signin"
                                    ? "New to MarketX? Create Account"
                                    : "Already have an account? Sign In"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
