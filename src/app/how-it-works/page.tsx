import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
    Search,
    MessageSquare,
    Zap,
    Shield,
    UserCheck,
    ArrowRight,
    Sparkles,
    MousePointer2,
    Lock,
    Rocket,
    CheckCircle2
} from "lucide-react";

const BUYER_STEPS = [
    {
        title: "Smarter Discovery",
        desc: "Filter through verified high-growth listings by revenue, price, and curated business type.",
        icon: Search,
        color: "emerald"
    },
    {
        title: "Secure NDA Access",
        desc: "Unlock proprietary financials and detailed metrics with a single-click, bank-grade digital NDA.",
        icon: Lock,
        color: "teal"
    },
    {
        title: "Founder Chat",
        desc: "Communicate directly with asset owners through our private, end-to-end encrypted messaging.",
        icon: MessageSquare,
        color: "cyan"
    },
    {
        title: "Seamless Acquisition",
        desc: "Facilitate smooth asset transfers and secure payments using integrated escrow protection.",
        icon: MousePointer2,
        color: "emerald"
    },
];

const SELLER_STEPS = [
    {
        title: "Instant Listing",
        desc: "Onboard your asset with automated metric syncing and revenue proof in minutes.",
        icon: Zap,
        color: "orange"
    },
    {
        title: "Expert Verification",
        desc: "Our vetting team verifies your data to ensure maximum trust from institutional buyers.",
        icon: Shield,
        color: "emerald"
    },
    {
        title: "Qualified Interest",
        desc: "Filter out the noise. Receive inquiries only from pre-verified, serious acquirers.",
        icon: UserCheck,
        color: "teal"
    },
    {
        title: "Rapid Liquidity",
        desc: "Close your exit up to 3x faster than traditional brokered marketplaces.",
        icon: Zap,
        color: "cyan"
    },
];

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-emerald-100 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gray-50/50" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-500/5 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-8 font-black text-xs uppercase tracking-widest shadow-sm animate-fade-in-up">
                        <Sparkles size={14} />
                        Efficiency Reimagined
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight animate-fade-in-up delay-100">
                        How <span className="text-emerald-600">AcquireX</span> Works
                    </h1>
                    <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium animate-fade-in-up delay-200">
                        We've optimized the acquisition lifecycle into a seamless, high-velocity experience.
                        No gatekeepers, no commissions, just pure marketplace efficiency.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in-up delay-300">
                        <Link href="/listings">
                            <Button size="lg" className="h-16 px-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-black text-lg shadow-glow hover:scale-105 transition-all">
                                Start Browsing
                            </Button>
                        </Link>
                        <Link href="/sell">
                            <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-gray-100 font-bold hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                                Sell Your Asset
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Buyer Journey */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-fade-in-up">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                                    The <span className="text-emerald-600 italic">Acquirer's</span> Path
                                </h2>
                                <p className="text-lg text-gray-500 font-medium">
                                    A professional workflow designed for serious investors looking for verified returns.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <span className="text-8xl font-black text-emerald-50 opacity-50">BUYER</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {BUYER_STEPS.map((step, idx) => (
                                <StepCard key={idx} step={step} number={idx + 1} delay={idx * 100} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="container mx-auto px-4 py-12">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {/* Seller Journey */}
            <section className="py-24 relative overflow-hidden bg-gray-50/50 pattern-grid">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-right animate-fade-in-up">
                            <div className="hidden md:block">
                                <span className="text-8xl font-black text-orange-50/50">SELLER</span>
                            </div>
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                                    Strategic <span className="text-orange-500 italic">Exits</span>
                                </h2>
                                <p className="text-lg text-gray-500 font-medium">
                                    Maximize your business value and reach thousands of pre-qualified acquirers.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {SELLER_STEPS.map((step, idx) => (
                                <StepCard key={idx} step={step} number={idx + 1} delay={idx * 100} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Redesigned Final CTA */}
            <section className="py-24 lg:py-32 container mx-auto px-4">
                <div className="max-w-5xl mx-auto relative group animate-reveal">
                    {/* Glowing background behind card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-[48px] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                    <div className="relative bg-white border border-gray-100 rounded-[48px] p-12 md:p-20 shadow-soft-xl overflow-hidden">
                        {/* Animated background decoration */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700" />

                        <div className="relative z-10 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mb-10 shadow-glow animate-float">
                                <Rocket className="text-emerald-600" size={40} />
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                                Close your next <span className="text-emerald-600">deal today</span>
                            </h2>
                            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                Thousands of founders and investors are already transacting on AcquireX.
                                Secure your future with the most efficient acquisition platform available.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                                <Link href="/login" className="flex-1 sm:flex-none">
                                    <Button className="w-full sm:w-auto h-16 px-12 bg-gray-900 text-white hover:bg-black rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-[0.98] flex items-center gap-3">
                                        Get Started Free <ArrowRight size={24} className="text-emerald-400" />
                                    </Button>
                                </Link>
                                <Link href="/listings" className="flex-1 sm:flex-none">
                                    <Button variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-2 border-gray-100 font-bold text-lg hover:border-emerald-200 hover:bg-emerald-50 transition-all flex items-center gap-2">
                                        Browse Deals
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60">
                                <div className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
                                    <CheckCircle2 size={16} className="text-emerald-500" /> No Commissions
                                </div>
                                <div className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
                                    <CheckCircle2 size={16} className="text-emerald-500" /> Verified Data
                                </div>
                                <div className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
                                    <CheckCircle2 size={16} className="text-emerald-500" /> Direct Messaging
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StepCard({ step, number, delay }: { step: { title: string; desc: string; icon: any; color: string }; number: number; delay: number }) {
    const Icon = step.icon;
    const colorMap: Record<string, string> = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        teal: "bg-teal-50 text-teal-600 border-teal-100",
        cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
        orange: "bg-orange-50 text-orange-600 border-orange-100",
    };

    return (
        <div
            className="group relative bg-white border border-gray-100 rounded-[32px] p-8 shadow-soft hover:shadow-soft-xl transition-all hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${delay + 400}ms` }}
        >
            <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${colorMap[step.color]} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                </div>
                <span className="text-6xl font-black text-gray-50 group-hover:text-emerald-50/50 transition-colors uppercase select-none">{number}</span>
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors uppercase">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{step.desc}</p>
        </div>
    );
}
