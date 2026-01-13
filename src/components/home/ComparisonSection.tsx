"use client";

import { useState } from "react";
import { COMPARISON_FEATURES } from "@/lib/landing-data";
import { Check, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComparisonSection() {
    return (
        <section className="py-20 bg-gray-50 border-y-2 border-black">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black mb-4">Why MarketX is Safer</h2>
                        <p className="text-gray-600">We prioritize data security and deal integrity over volume.</p>
                    </div>

                    <div className="bg-white border-2 border-black shadow-neo overflow-hidden">
                        <div className="grid grid-cols-3 bg-black text-white font-bold text-sm md:text-base">
                            <div className="p-4 flex items-center">Feature</div>
                            <div className="p-4 border-l-2 border-white/20 flex items-center justify-center bg-blue-600">MarketX</div>
                            <div className="p-4 border-l-2 border-white/20 flex items-center justify-center text-gray-400">Others</div>
                        </div>

                        {COMPARISON_FEATURES.map((feature, idx) => (
                            <div
                                key={feature.name}
                                className={cn(
                                    "grid grid-cols-3 transition-colors hover:bg-blue-50/50",
                                    idx !== COMPARISON_FEATURES.length - 1 && "border-b border-gray-100"
                                )}
                            >
                                <div className="p-4 font-bold text-sm md:text-base flex items-center border-r border-gray-100">
                                    {feature.name}
                                </div>
                                <div className="p-4 flex items-center justify-center border-r border-gray-100">
                                    {feature.us ? <Check className="text-green-600" size={20} /> : <X className="text-red-400" size={20} />}
                                </div>
                                <div className="p-4 flex items-center justify-center text-gray-400">
                                    {feature.others ? <Check size={20} /> : <X size={20} />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center gap-6 text-sm font-bold text-gray-500">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-600" size={16} /> Verified Identities
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-600" size={16} /> Legal-Grade NDAs
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
