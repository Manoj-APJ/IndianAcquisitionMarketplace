import Link from "next/link";
import { Button } from "./ui/Button";
import { createClient } from "@/lib/supabase/server";
import { User, LogOut } from "lucide-react";

export const Navbar = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="w-full border-b-2 border-black bg-white py-4 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:text-blue-600 transition-colors">
                    MarketX
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link href="/listings" className="text-sm font-bold uppercase tracking-wider hover:text-blue-600 transition-colors">
                        Browse
                    </Link>
                    <Link href="/sell" className="text-sm font-bold uppercase tracking-wider hover:text-blue-600 transition-colors">
                        Sell an Asset
                    </Link>
                    <Link href="/how-it-works" className="text-sm font-bold uppercase tracking-wider hover:text-blue-600 transition-colors">
                        How it works
                    </Link>
                </div>

                {/* CTA / Profile */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile">
                                <Button variant="outline" size="sm" className="h-9 border-2 border-black font-bold flex items-center gap-2">
                                    <User size={16} />
                                    Profile
                                </Button>
                            </Link>
                            <form action="/auth/signout" method="post" className="hidden sm:block">
                                <button type="submit" className="text-gray-500 hover:text-red-600 transition-colors p-2" title="Sign Out">
                                    <LogOut size={18} />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-bold hover:underline">
                                Log In
                            </Link>
                            <Link href="/login">
                                <Button size="sm" className="bg-black text-white hover:bg-gray-800">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
