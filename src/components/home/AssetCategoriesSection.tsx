"use client";

import { ASSET_TYPES } from "@/lib/landing-data-v2";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function AssetCategoriesSection() {
    return (
        <section className="py-24 bg-gray-50 border-b-2 border-black">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">We Support All Profitable Assets</h2>
                    <p className="text-xl text-gray-500 font-medium">If it makes money online, you can sell it here.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {ASSET_TYPES.map((type) => (
                        <Link href={`/listings?type=${type.label}`} key={type.label} className="group">
                            <div className="bg-white border-2 border-black p-6 h-full flex flex-col items-center justify-center text-center transition-all hover:shadow-neo hover:-translate-y-1">
                                <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{type.icon}</span>
                                <h3 className="text-xl font-black mb-1">{type.label}</h3>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{type.desc}</p>
                                {/* <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={20} />
                   </div> */}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/listings">
                        <Button variant="outline" size="lg" className="border-2 border-black">View All Categories</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
