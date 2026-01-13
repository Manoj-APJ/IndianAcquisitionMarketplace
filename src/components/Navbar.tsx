import Link from "next/link";
import { Button } from "./ui/Button";
import { createClient } from "@/lib/supabase/server";

export const Navbar = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="w-full border-b-2 border-black bg-white py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:underline">
                    MarketX
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center">
                    <a href="/listings" className="text-sm font-bold uppercase tracking-wider hover:underline">Browse</a>
                    <Link href="/sell" className="text-sm font-bold hover:underline">
                        Sell an Asset
                    </Link>
                    <a href="/how-it-works" className="text-sm font-bold uppercase tracking-wider hover:underline">How it works</a>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold truncate max-w-[150px] hidden md:block">
                                {user.email}
                            </span>
                            <form action="/auth/signout" method="post">
                                <Button size="sm" variant="outline" className="h-9">Sign Out</Button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-bold hover:underline">
                                Log In
                            </Link>
                            <Link href="/login">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
