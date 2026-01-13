import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering so new listings appear
export const revalidate = 0;

export default async function ListingsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = createClient();

    // Basic filtering logic (could be expanded)
    let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'live')
        .order('created_at', { ascending: false });

    const { data: listings } = await query;

    const displayListings = listings && listings.length > 0 ? listings : [];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Browse Active Listings</h1>
                <p className="text-xl text-gray-600">Discover profitable micro-SaaS, newsletters, and communities.</p>
            </div>

            {/* Filters (Visual Only for MVP - funcionality would go here) */}
            <section className="mb-12 border-2 border-black bg-white p-6 shadow-neo sticky top-4 z-20">
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
                    <h2 className="text-2xl font-black">All Results</h2>
                    <span className="text-sm font-bold text-gray-500">Showing {displayListings.length} assets</span>
                </div>

                {displayListings.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-black/20 bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-400 mb-4">No active listings found.</h3>
                        <p className="text-gray-500 mb-6">Be the first to list your project!</p>
                        <a href="/sell"><Button>List a Project</Button></a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
