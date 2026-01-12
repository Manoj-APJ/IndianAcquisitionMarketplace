import Link from "next/link";
import { Button } from "./ui/Button";

export const Navbar = () => {
    return (
        <nav className="w-full border-b-2 border-black bg-white py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black uppercase tracking-tighter hover:underline">
                    MarketX
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-bold hover:underline">
                        Browse Assets
                    </Link>
                    <Link href="/sell" className="text-sm font-bold hover:underline">
                        Sell an Asset
                    </Link>
                    <Link href="#" className="text-sm font-bold hover:underline text-gray-500">
                        How it works
                    </Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <Link href="/sell">
                        <Button size="sm">Start Selling</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
