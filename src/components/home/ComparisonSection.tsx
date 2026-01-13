"use client";

import { cn } from "@/lib/utils";
import { COMPARISON_FEATURES } from "@/lib/landing-data";
import { Check, X, Shield, Lock, FileCheck, Eye } from "lucide-react";

export function ComparisonSection() {
    return (
        <section className="py-24 bg-white border-b-2 border-black">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border-2 border-blue-900 text-blue-900 px-4 py-1 font-black text-sm uppercase mb-6 rounded-full">
                        <Shield size={16} /> Unmatched Security
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6">Why MarketX is Safer</h2>
                    <p className="text-xl text-gray-600">
                        Most marketplaces prioritize volume. We prioritize <span className="text-blue-900 font-bold underline decoration-4 decoration-amber-400">deal integrity.</span>
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Visual Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-blue-900 text-white p-6 border-2 border-black shadow-neo -rotate-1 relative z-10">
                            <Lock className="mb-4 text-amber-400" size={32} />
                            <h3 className="text-xl font-bold mb-2">Private by Default</h3>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                Financials and tech stacks are physically separated in our database.
                                Even if you find a vulnerability, the data simply isn't there to steal until an NDA is signed.
                            </p>
                        </div>

                        <div className="bg-white p-6 border-2 border-black shadow-neo rotate-1">
                            <FileCheck className="mb-4 text-green-600" size={32} />
                            <h3 className="text-xl font-bold mb-2">Legal-Grade Audit Trails</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Every view of private data is logged with IP, timestamp, and User Agent.
                                We provide this audit log to sellers for legal enforcement if needed.
                            </p>
                        </div>
                    </div>

                    {/* Right: The Grid */}
                    <div className="lg:col-span-7">
                        <div className="bg-white border-2 border-black shadow-neo overflow-hidden">
                            <div className="grid grid-cols-12 bg-gray-900 text-white font-bold text-sm uppercase tracking-wider">
                                <div className="col-span-6 p-5">Security Feature</div>
                                <div className="col-span-3 p-5 text-center bg-blue-600 border-x border-gray-700">MarketX</div>
                                <div className="col-span-3 p-5 text-center text-gray-400">Others</div>
                            </div>

                            {COMPARISON_FEATURES.map((feature, idx) => (
                                <div
                                    key={feature.name}
                                    className={cn(
                                        "grid grid-cols-12 transition-colors hover:bg-blue-50",
                                        idx !== COMPARISON_FEATURES.length - 1 && "border-b border-gray-200"
                                    )}
                                >
                                    <div className="col-span-6 p-5 font-bold text-gray-800 text-sm md:text-base flex items-center border-r border-gray-100">
                                        {feature.name}
                                    </div>
                                    <div className="col-span-3 p-3 md:p-5 flex items-center justify-center border-r border-gray-100 bg-blue-50/30">
                                        {feature.us ? (
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                                                <Check className="text-green-600" size={18} strokeWidth={3} />
                                            </div>
                                        ) : <X className="text-red-400" size={20} />}
                                    </div>
                                    <div className="col-span-3 p-3 md:p-5 flex items-center justify-center text-gray-300">
                                        {feature.others ? <Check size={20} /> : <X size={20} strokeWidth={3} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
