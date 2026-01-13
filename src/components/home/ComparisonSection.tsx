"use client";

import { cn } from "@/lib/utils";
import { COMPARISON_FEATURES, COMPARISON_DATA } from "@/lib/landing-data";
import { Check, X, Shield, Lock, FileCheck, CheckCircle2, AlertCircle } from "lucide-react";

export function ComparisonSection() {
    return (
        <section className="pb-24 pt-8 bg-white border-b-4 border-black">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-amber-50 border-2 border-black text-black px-4 py-1 font-black text-xs uppercase mb-6 shadow-neo-sm">
                        <Shield size={16} className="text-amber-500" /> Market Intelligence
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">How We Stack Up</h2>
                    <p className="text-xl text-gray-600 font-bold leading-relaxed">
                        Most platforms prioritize volume and fees. We prioritize <span className="text-blue-900 underline decoration-4 decoration-amber-400">deal integrity</span> and your bottom line.
                    </p>
                </div>

                {/* Detailed Table */}
                <div className="bg-white border-4 border-black shadow-neo overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="p-6 font-black uppercase text-xs tracking-widest border-r-2 border-white/20">Metric</th>
                                <th className="p-6 font-black uppercase text-sm tracking-widest bg-blue-900 text-center border-r-2 border-white/20">MarketX</th>
                                <th className="p-6 font-black uppercase text-xs tracking-widest text-gray-400 text-center border-r-2 border-white/20">Flippa</th>
                                <th className="p-6 font-black uppercase text-xs tracking-widest text-gray-400 text-center">Acquire</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold">
                            {COMPARISON_DATA.map((row, idx) => (
                                <tr key={row.feature} className={cn("border-b-2 border-black", idx % 2 === 0 ? "bg-white" : "bg-gray-50")}>
                                    <td className="p-6 text-gray-900 text-sm md:text-base border-r-2 border-black">
                                        {row.feature}
                                    </td>
                                    <td className="p-6 text-center text-blue-900 font-black bg-blue-50/50 border-r-2 border-black">
                                        {row.marketx}
                                    </td>
                                    <td className="p-6 text-center text-gray-500 border-r-2 border-black">
                                        {row.flippa}
                                    </td>
                                    <td className="p-6 text-center text-gray-500">
                                        {row.acquire}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Features Checklist */}
                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-blue-900 text-white p-8 border-4 border-black shadow-neo -rotate-1 relative overflow-hidden h-full">
                            <Lock className="mb-6 text-amber-400" size={40} />
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">The Privacy Standard</h3>
                            <p className="text-blue-100 font-bold leading-relaxed mb-6">
                                Sensitive data is physically separated in our database. It's only decrypted for authorized NDA signers.
                            </p>
                            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest">
                                <CheckCircle2 size={16} /> Decryption on Request
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
                        {COMPARISON_FEATURES.map((feature) => (
                            <div key={feature.name} className="bg-white border-2 border-black p-6 flex items-start gap-4 shadow-neo-sm hover:translate-x-1 hover:-translate-y-1 transition-all">
                                {feature.us ? (
                                    <div className="bg-green-100 border-2 border-black p-1 shrink-0">
                                        <Check className="text-black" size={16} strokeWidth={4} />
                                    </div>
                                ) : (
                                    <div className="bg-red-100 border-2 border-black p-1 shrink-0">
                                        <X className="text-black" size={16} strokeWidth={4} />
                                    </div>
                                )}
                                <div>
                                    <p className="font-black uppercase text-xs tracking-tight mb-1">{feature.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">
                                        {feature.us ? "Native Integration" : "Third-party dependency"}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="bg-amber-400 border-4 border-black p-6 shadow-neo rotate-1 flex flex-col justify-center">
                            <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter line-through decoration-black">Fees everywhere.</h4>
                            <p className="font-black text-sm uppercase">Except here. List for a flat fee, sell for $0 commission.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
