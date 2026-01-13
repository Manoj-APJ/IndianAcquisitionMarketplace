"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Search,
    FileText,
    UserCheck,
    ArrowRightLeft,
    ShieldCheck,
    Zap,
    MessagesSquare,
    CheckCircle2
} from "lucide-react";

const STEPS = {
    buyers: [
        {
            title: "Browse Assets",
            desc: "Filter through vetted listings by revenue models, tech stack, and growth potential.",
            icon: Search,
            color: "bg-blue-100"
        },
        {
            title: "Request Data",
            desc: "Sign a one-click digital NDA to unlock verified P&L reports and internal metrics.",
            icon: FileText,
            color: "bg-amber-100"
        },
        {
            title: "Direct Access",
            desc: "Skip the brokers. Chat directly with founders in our secure message center.",
            icon: MessagesSquare,
            color: "bg-green-100"
        },
        {
            title: "Secure Closing",
            desc: "Finalize the deal using our standardized checklists and transfer workflows.",
            icon: ArrowRightLeft,
            color: "bg-purple-100"
        },
    ],
    sellers: [
        {
            title: "Quick Listing",
            desc: "Submit your project details and revenue proof in under 10 minutes.",
            icon: Zap,
            color: "bg-amber-100"
        },
        {
            title: "Admin Review",
            desc: "Our team verifies your traffic, revenue, and identity to build buyer trust.",
            icon: ShieldCheck,
            color: "bg-blue-100"
        },
        {
            title: "Receive Offers",
            desc: "Get notified as buyers review your data and request introductions.",
            icon: UserCheck,
            color: "bg-green-100"
        },
        {
            title: "Hassle-free Exit",
            desc: "Follow our guided escrow and asset transfer process to get paid safely.",
            icon: CheckCircle2,
            color: "bg-orange-100"
        },
    ]
};

export function HowItWorksSection() {
    const [tab, setTab] = useState<'buyers' | 'sellers'>('buyers');

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
                            How it <span className="text-blue-600">works</span>
                        </h2>
                        <p className="text-xl text-gray-600 font-medium">
                            We've eliminated the middlemen and the high fees.
                            Our platform is built for fast, secure, and transparent acquisitions.
                        </p>
                    </div>

                    <div className="flex border-4 border-black bg-white p-1 shadow-neo-sm">
                        <button
                            onClick={() => setTab('buyers')}
                            className={cn(
                                "px-8 py-3 font-black uppercase text-sm transition-all",
                                tab === 'buyers' ? "bg-black text-white" : "text-black hover:bg-gray-100"
                            )}
                        >
                            I want to Buy
                        </button>
                        <button
                            onClick={() => setTab('sellers')}
                            className={cn(
                                "px-8 py-3 font-black uppercase text-sm transition-all",
                                tab === 'sellers' ? "bg-black text-white" : "text-black hover:bg-gray-100"
                            )}
                        >
                            I want to Sell
                        </button>
                    </div>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS[tab].map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center">

                            {/* Connector Line (Desktop) */}
                            {idx < 3 && (
                                <div className="hidden lg:block absolute top-[60px] left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-black/10 border-t-2 border-dashed border-black/20" />
                            )}

                            {/* Step Card */}
                            <div className="w-full bg-white border-2 border-black p-8 shadow-neo-sm hover:shadow-neo transition-all group hover:-translate-y-1 z-10">

                                {/* Step Icon & Number */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className={cn(
                                        "w-16 h-16 border-2 border-black flex items-center justify-center shadow-neo-sm transform transition-transform group-hover:rotate-6",
                                        step.color
                                    )}>
                                        <step.icon size={28} className="text-black" />
                                    </div>
                                    <span className="text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors">
                                        0{idx + 1}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black mb-4 uppercase leading-tight group-hover:text-blue-600 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 font-bold leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Mobile Connector */}
                            {idx < 3 && (
                                <div className="lg:hidden h-8 w-0.5 border-l-2 border-dashed border-black/20 my-2" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Final reassurance */}
                <div className="mt-20 p-8 border-2 border-black bg-amber-50 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm rotate-3">
                        <ShieldCheck className="text-black" />
                    </div>
                    <div>
                        <p className="text-lg font-black uppercase tracking-tight">
                            Identity & Revenue are verified for every listing
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}
