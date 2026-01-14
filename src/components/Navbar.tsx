import Link from "next/link";
import { Button } from "./ui/Button";
import { createClient } from "@/lib/supabase/server";
import { User, LogOut, MessageCircle, Zap, Search, PlusCircle, Menu } from "lucide-react";

export const Navbar = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo - Strong Branding */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                        <Zap size={22} className="text-white" fill="white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            AcquireX
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 -mt-1 tracking-wide">
                            MARKETPLACE
                        </span>
                    </div>
                </Link>

                {/* Center Nav - Clean & Organized */}
                <div className="hidden lg:flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1.5">
                    <Link
                        href="/listings"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white rounded-full transition-all"
                    >
                        <Search size={16} />
                        Browse
                    </Link>
                    <Link
                        href="/sell"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white rounded-full transition-all"
                    >
                        <PlusCircle size={16} />
                        Sell
                    </Link>
                    <Link
                        href="/how-it-works"
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white rounded-full transition-all"
                    >
                        How it Works
                    </Link>
                    {user && (
                        <Link
                            href="/messages"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white rounded-full transition-all relative"
                        >
                            <MessageCircle size={16} />
                            Messages
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        </Link>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            {/* Profile Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-soft-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                                        <p className="text-xs text-gray-500">Member</p>
                                    </div>
                                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <User size={16} />
                                        My Profile
                                    </Link>
                                    <Link href="/messages" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors lg:hidden">
                                        <MessageCircle size={16} />
                                        Messages
                                    </Link>
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <form action="/auth/signout" method="post">
                                            <button
                                                type="submit"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors hidden sm:block">
                                Log In
                            </Link>
                            <Link href="/login">
                                <Button className="h-10 px-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-glow transition-all">
                                    Get Started
                                    <Zap size={16} className="ml-1.5" fill="currentColor" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
