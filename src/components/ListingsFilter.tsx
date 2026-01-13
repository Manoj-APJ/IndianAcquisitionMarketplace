"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export function ListingsFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [q, setQ] = useState(searchParams.get("q") || "");
    const [revenue, setRevenue] = useState(searchParams.get("revenue") || "any");
    const [type, setType] = useState(searchParams.get("type") || "any");

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (revenue !== "any") params.set("revenue", revenue);
        if (type !== "any") params.set("type", type);

        router.push(`/listings?${params.toString()}`);
    };

    // Update internal state if URL changes externally
    useEffect(() => {
        setQ(searchParams.get("q") || "");
        setRevenue(searchParams.get("revenue") || "any");
        setType(searchParams.get("type") || "any");
    }, [searchParams]);

    return (
        <section className="mb-12 border-2 border-black bg-white p-6 shadow-neo sticky top-24 z-20">
            <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-bold uppercase mb-2">Search</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
                            placeholder="Search assets..."
                            className="w-full border-2 border-black h-12 px-4 pl-10 font-bold focus:outline-none focus:ring-4 ring-blue-600/20 transition-all placeholder:text-gray-300"
                        />
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="w-full md:w-64">
                    <label className="block text-sm font-bold uppercase mb-2">Revenue Range</label>
                    <select
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        className="w-full border-2 border-black h-12 px-4 font-bold bg-white focus:outline-none appearance-none cursor-pointer"
                    >
                        <option value="any">Any Revenue</option>
                        <option value="0-1000">$0 - $1k/mo</option>
                        <option value="1000-5000">$1k - $5k/mo</option>
                        <option value="5000-any">$5k+/mo</option>
                    </select>
                </div>

                <div className="w-full md:w-64">
                    <label className="block text-sm font-bold uppercase mb-2">Asset Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full border-2 border-black h-12 px-4 font-bold bg-white focus:outline-none appearance-none cursor-pointer"
                    >
                        <option value="any">All Types</option>
                        <option value="SaaS">SaaS</option>
                        <option value="Newsletter">Newsletter</option>
                        <option value="Community">Community</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Micro-SaaS">Micro-SaaS</option>
                    </select>
                </div>

                <Button
                    onClick={handleFilter}
                    className="w-full md:w-auto px-10 h-12 uppercase tracking-widest"
                >
                    Filter
                </Button>
            </div>
        </section>
    );
}
