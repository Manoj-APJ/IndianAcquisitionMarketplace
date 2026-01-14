import Link from "next/link";
import { Zap, Twitter, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Main Footer */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-glow">
                                <Zap size={22} className="text-white" fill="white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold tracking-tight text-white">
                                    AcquireX
                                </span>
                                <span className="text-[10px] font-semibold text-gray-500 -mt-1 tracking-wide">
                                    MARKETPLACE
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                            The trusted marketplace for buying and selling verified digital businesses.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
                            <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
                            <SocialLink href="https://github.com" icon={<Github size={18} />} />
                            <SocialLink href="mailto:hello@acquirex.com" icon={<Mail size={18} />} />
                        </div>
                    </div>

                    {/* Marketplace Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-5">Marketplace</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/listings">Browse Listings</FooterLink>
                            <FooterLink href="/sell">Sell Your Business</FooterLink>
                            <FooterLink href="/how-it-works">How It Works</FooterLink>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-5">Company</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-5">Resources</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/help">Help Center</FooterLink>
                            <FooterLink href="/security">Security</FooterLink>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} AcquireX. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                            Terms
                        </Link>
                        <Link href="/cookies" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1 group text-sm"
            >
                {children}
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
        </li>
    );
}
