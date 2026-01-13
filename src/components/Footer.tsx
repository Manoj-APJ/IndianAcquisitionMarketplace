import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t-2 border-black pt-20 pb-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-3xl font-black uppercase tracking-tighter mb-6 block">MarketX</Link>
                        <p className="text-gray-600 font-medium max-w-sm mb-8">
                            The curated marketplace for buying and selling profitable digital businesses. Zero commissions. 100% Secure.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6 uppercase">Marketplace</h4>
                        <ul className="space-y-3 font-medium text-gray-600">
                            <li><Link href="/listings" className="hover:text-black hover:underline">Browse Listings</Link></li>
                            <li><Link href="/sell" className="hover:text-black hover:underline">Sell Your Business</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-black hover:underline">How It Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-black hover:underline">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6 uppercase">Company</h4>
                        <ul className="space-y-3 font-medium text-gray-600">
                            <li><Link href="/about" className="hover:text-black hover:underline">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-black hover:underline">Blog</Link></li>
                            <li><Link href="/terms" className="hover:text-black hover:underline">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-black hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t-2 border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-gray-400">
                    <p>© {new Date().getFullYear()} MarketX Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-black">Privacy</Link>
                        <Link href="/terms" className="hover:text-black">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
