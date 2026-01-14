"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
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

    const clearFilters = () => {
        setQ("");
        setRevenue("any");
        setType("any");
        router.push("/listings");
    };

    const hasFilters = q || revenue !== "any" || type !== "any";

    // Update internal state if URL changes externally
    useEffect(() => {
        setQ(searchParams.get("q") || "");
        setRevenue(searchParams.get("revenue") || "any");
        setType(searchParams.get("type") || "any");
    }, [searchParams]);

    return (
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-8 mb-8 shadow-soft-xl relative overflow-hidden group">
            {/* Subtle interactive accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-20 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-col lg:flex-row gap-6 items-end">
                {/* Search Input */}
                <div className="flex-1 w-full space-y-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                        Search Keywords
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
                            placeholder="Try 'SaaS', 'AI', 'Ecommerce'..."
                            className="w-full rounded-2xl border-2 border-gray-100 h-14 px-5 pl-12 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-gray-300"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Revenue Filter */}
                <div className="w-full lg:w-56 space-y-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                        Monthly Revenue
                    </label>
                    <div className="relative">
                        <select
                            value={revenue}
                            onChange={(e) => setRevenue(e.target.value)}
                            className="w-full rounded-2xl border-2 border-gray-100 h-14 px-5 text-sm font-medium bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 appearance-none cursor-pointer transition-all"
                        >
                            <option value="any">Any Revenue</option>
                            <option value="0-1000">$0 - $1k/mo</option>
                            <option value="1000-5000">$1k - $5k/mo</option>
                            <option value="5000-any">$5k+/mo</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <SlidersHorizontal size={16} />
                        </div>
                    </div>
                </div>

                {/* Type Filter */}
                <div className="w-full lg:w-56 space-y-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                        Asset Class
                    </label>
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full rounded-2xl border-2 border-gray-100 h-14 px-5 text-sm font-medium bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 appearance-none cursor-pointer transition-all"
                        >
                            <option value="any">All Assets</option>
                            <option value="SaaS">SaaS Platform</option>
                            <option value="Newsletter">Newsletter</option>
                            <option value="Community">Community</option>
                            <option value="E-commerce">Ecommerce</option>
                            <option value="Micro-SaaS">Micro-SaaS</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <Search size={16} className="rotate-90" />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full lg:w-auto">
                    <Button
                        onClick={handleFilter}
                        className="flex-1 lg:flex-none h-14 px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl font-black text-sm shadow-glow active:scale-[0.98] transition-all"
                    >
                        Filter
                    </Button>
                    {hasFilters && (
                        <Button
                            onClick={clearFilters}
                            variant="outline"
                            className="h-14 w-14 p-0 rounded-2xl border-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                            title="Clear all filters"
                        >
                            <X size={20} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
