import { Button } from "@/components/ui/Button";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CheckCircle2, DollarSign, Zap } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Dynamic

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            {/* 1. High-Conversion Hero */}
            <section className="relative pt-20 pb-32 overflow-hidden border-b-2 border-black bg-[#fafafa]">
                <div className="container mx-auto px-4 relative z-10 text-center">

                    <div className="inline-flex items-center gap-2 bg-green-100 border-2 border-green-600 text-green-800 px-4 py-2 font-black text-sm uppercase mb-8 shadow-neo-sm transform -rotate-2">
                        <DollarSign size={16} strokeWidth={3} /> 0% Commission Fees
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                        Sell your SaaS. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Keep 100% Profit.</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-gray-600 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
                        The only acquisition marketplace that doesn't take a cut of your exit.
                        Direct deals. Verified buyers. Bank-level security.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/listings">
                            <Button size="lg" className="h-16 px-10 text-xl shadow-neo border-2 border-black">Browse Active Listings</Button>
                        </Link>
                        <Link href="/sell">
                            <Button size="lg" variant="outline" className="h-16 px-10 text-xl border-2 border-black bg-white hover:bg-gray-50">Sell a Business</Button>
                        </Link>
                    </div>

                    <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-500 uppercase tracking-wide">
                        <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> No Success Fees</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Buyer Verification</span>
                        <span className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Instant Deal Rooms</span>
                    </div>
                </div>

                {/* Abstract Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 20%)' }}>
                </div>
            </section>

            {/* 2. Value Proposition Grid */}
            <section className="py-24 bg-black text-white border-b-2 border-black">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center p-6 border border-white/20 bg-white/5">
                            <div className="w-16 h-16 bg-blue-600 border-2 border-white flex items-center justify-center mx-auto mb-6 text-white rotate-3">
                                <DollarSign size={32} strokeWidth={3} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Zero Commissions</h3>
                            <p className="text-gray-400">Other marketplaces take 10-15%. We take 0%. Your exit money belongs to you.</p>
                        </div>
                        <div className="text-center p-6 border border-white/20 bg-white/5">
                            <div className="w-16 h-16 bg-green-500 border-2 border-white flex items-center justify-center mx-auto mb-6 text-white -rotate-2">
                                <Zap size={32} strokeWidth={3} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Speed to Close</h3>
                            <p className="text-gray-400">Direct connection to verified buyers means deals close in days, not months.</p>
                        </div>
                        <div className="text-center p-6 border border-white/20 bg-white/5">
                            <div className="w-16 h-16 bg-orange-500 border-2 border-white flex items-center justify-center mx-auto mb-6 text-white rotate-2">
                                <CheckCircle2 size={32} strokeWidth={3} />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Vetted Quality</h3>
                            <p className="text-gray-400">No starter sites. We only list profitable, operational businesses.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Social Proof / Ticker (Visual placeholder) */}
            <div className="py-6 border-b-2 border-black bg-yellow-300 overflow-hidden">
                <div className="flex justify-center items-center gap-12 font-black text-2xl uppercase tracking-widest whitespace-nowrap opacity-80">
                    <span>SaaS</span> • <span>Newsletters</span> • <span>Communities</span> • <span>E-commerce</span> • <span>Plugins</span> • <span>Mobile Apps</span> • <span>SaaS</span>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <HowItWorksSection />

            {/* COMPARISON */}
            <ComparisonSection />

            {/* CTA Break */}
            <section className="py-24 bg-blue-600 text-white text-center border-y-2 border-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-6xl font-black mb-8">Stop paying 15% fees.</h2>
                    <Link href="/sell">
                        <Button size="lg" className="h-20 px-12 text-2xl bg-white text-black border-2 border-black hover:bg-gray-100 hover:scale-105 transition-transform shadow-neo">
                            List Your Business Free
                        </Button>
                    </Link>
                    <p className="mt-6 font-bold opacity-80 uppercase tracking-widest text-sm">Limited time offer</p>
                </div>
            </section>

            {/* FAQ */}
            <FAQSection />

            {/* Final Footer CTA */}
            <section className="py-20 bg-white text-center">
                <h2 className="text-4xl font-black mb-6">Still have questions?</h2>
                <p className="text-gray-600 mb-10 text-xl">
                    Our support team is run by founders, for founders.
                </p>
                <Button variant="outline" size="lg">Contact Support</Button>
            </section>
        </div>
    );
}
