import { LISTINGS } from "@/lib/data";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="mb-20 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                    Buy & Sell <span className="bg-blue-600 text-white px-2">Micro-SaaS</span> Without The Bullshit.
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 font-medium mb-10 max-w-2xl mx-auto">
                    The curated marketplace for indie hackers, side-project builders, and bootstrap founders. No escrow fees, direct intros.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button size="lg">Browse Listings</Button>
                    <Button size="lg" variant="outline">List a Project</Button>
                </div>
            </section>

            {/* Filters (Visual Only) */}
            <section className="mb-12 border-2 border-black bg-white p-6 shadow-neo">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-bold uppercase mb-2">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search assets..."
                                className="w-full border-2 border-black h-12 px-4 pl-10 font-bold focus:outline-none focus:ring-4 ring-blue-600/20 transition-all"
                            />
                            <Search className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    <div className="w-full md:w-64">
                        <label className="block text-sm font-bold uppercase mb-2">Revenue Range</label>
                        <select className="w-full border-2 border-black h-12 px-4 font-bold bg-white focus:outline-none">
                            <option>Any Revenue</option>
                            <option>$0 - $1k/mo</option>
                            <option>$1k - $5k/mo</option>
                            <option>$5k+/mo</option>
                        </select>
                    </div>

                    <div className="w-full md:w-64">
                        <label className="block text-sm font-bold uppercase mb-2">Asset Type</label>
                        <select className="w-full border-2 border-black h-12 px-4 font-bold bg-white focus:outline-none">
                            <option>All Types</option>
                            <option>SaaS</option>
                            <option>Newsletter</option>
                            <option>Community</option>
                        </select>
                    </div>

                    <Button className="w-full md:w-auto">Filter</Button>
                </div>
            </section>

            {/* Listings Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black">Featured Listings</h2>
                    <span className="text-sm font-bold text-gray-500">Showing {LISTINGS.length} assets</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {LISTINGS.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </section>
        </div>
    );
}
