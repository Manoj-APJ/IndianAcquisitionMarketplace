"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Search, FileText, UserCheck, ArrowRightLeft } from "lucide-react";

const STEPS = {
    buyers: [
        { title: "Browse", desc: "Filter vetted listings by revenue and type.", icon: Search },
        { title: "Review", desc: "Sign NDA to unlock verified P&L data.", icon: FileText },
        { title: "Connect", desc: "Chat directly with the founder.", icon: UserCheck },
        { title: "Acquire", desc: "Use our deal room to close safely.", icon: ArrowRightLeft },
    ],
    sellers: [
        { title: "List", desc: "Submit your project in 10 minutes.", icon: FileText },
        { title: "Verify", desc: "We verify your identity and revenue.", icon: ShieldCheck }, // Need to import ShieldCheck or use another
        { title: "Negotiate", desc: "Receive offers from verified buyers.", icon: UserCheck },
        { title: "Exit", desc: "Transfer assets using our checklist.", icon: ArrowRightLeft },
    ]
};

import { ShieldCheck } from "lucide-react"; // Import added

export function HowItWorksSection() {
    const [tab, setTab] = useState<'buyers' | 'sellers'>('buyers');

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black mb-6">How It Works</h2>
                    <div className="inline-flex border-2 border-black bg-white p-1">
                        <button
                            onClick={() => setTab('buyers')}
                            className={cn(
                                "px-6 py-2 font-bold transition-all",
                                tab === 'buyers' ? "bg-black text-white" : "text-gray-500 hover:text-black"
                            )}
                        >
                            For Buyers
                        </button>
                        <button
                            onClick={() => setTab('sellers')}
                            className={cn(
                                "px-6 py-2 font-bold transition-all",
                                tab === 'sellers' ? "bg-black text-white" : "text-gray-500 hover:text-black"
                            )}
                        >
                            For Sellers
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {STEPS[tab].map((step, idx) => (
                        <div key={idx} className="relative group">
                            {/* Connector Line */}
                            <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"
                                style={{ display: idx === 3 ? 'none' : 'block' }}></div>

                            <div className="bg-white border-2 border-black p-6 h-full shadow-neo transition-transform hover:-translate-y-1">
                                <div className="w-16 h-16 bg-blue-50 border-2 border-black flex items-center justify-center mb-6 mx-auto rounded-none">
                                    <step.icon size={28} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-black text-center mb-2">{step.title}</h3>
                                <p className="text-center text-sm text-gray-600 font-medium">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
