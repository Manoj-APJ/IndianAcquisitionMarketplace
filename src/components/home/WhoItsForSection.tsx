"use client";

import { cn } from "@/lib/utils";
import { Check, ShieldCheck, MessageCircle, DollarSign, Database, Lock, Zap } from "lucide-react";

export function WhoItsForSection() {
    return (
        <section className="py-24 bg-white border-b-2 border-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">

                    {/* Buyers Card */}
                    <div className="flex-1 border-2 border-black p-8 shadow-neo bg-[#f8fafc] group hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-900 text-white p-3 rotate-1">
                                <Database size={24} />
                            </div>
                            <h3 className="text-3xl font-black uppercase text-blue-900">For Buyers</h3>
                        </div>

                        <p className="text-lg font-bold text-gray-700 mb-8 h-14">
                            Find vetted, profitable assets without the broker bloat.
                        </p>

                        <ul className="space-y-4 font-medium text-gray-800">
                            <li className="flex gap-3 items-center">
                                <Check className="text-blue-600 shrink-0" strokeWidth={3} />
                                Verified revenue & traffic data
                            </li>
                            <li className="flex gap-3 items-center">
                                <ShieldCheck className="text-blue-600 shrink-0" strokeWidth={3} />
                                NDA-protected access to proprietary details
                            </li>
                            <li className="flex gap-3 items-center">
                                <MessageCircle className="text-blue-600 shrink-0" strokeWidth={3} />
                                Direct chat with founders
                            </li>
                            <li className="flex gap-3 items-center">
                                <DollarSign className="text-blue-600 shrink-0" strokeWidth={3} />
                                Zero broker fees on your purchase
                            </li>
                        </ul>
                    </div>

                    {/* Sellers Card */}
                    <div className="flex-1 border-2 border-black p-8 shadow-neo bg-[#fffbeb] group hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-amber-500 text-black p-3 -rotate-1">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-3xl font-black uppercase text-amber-600">For Sellers</h3>
                        </div>

                        <p className="text-lg font-bold text-gray-700 mb-8 h-14">
                            Sell on your terms. Keep 100% of the profit.
                        </p>

                        <ul className="space-y-4 font-medium text-gray-800">
                            <li className="flex gap-3 items-center">
                                <Check className="text-amber-500 shrink-0" strokeWidth={3} />
                                Keep 100% of your sale (0% commission)
                            </li>
                            <li className="flex gap-3 items-center">
                                <Lock className="text-amber-500 shrink-0" strokeWidth={3} />
                                Privacy-first listing process
                            </li>
                            <li className="flex gap-3 items-center">
                                <Zap className="text-amber-500 shrink-0" strokeWidth={3} />
                                Close 3x faster with direct deal rooms
                            </li>
                            <li className="flex gap-3 items-center">
                                <ShieldCheck className="text-amber-500 shrink-0" strokeWidth={3} />
                                We vet buyers before they see data
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}
