import { ListingCard } from "@/components/ListingCard";
import { ListingsFilter } from "@/components/ListingsFilter";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { getFavoriteIds } from "@/app/actions/favorites";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles, Search, TrendingUp } from "lucide-react";

// Force dynamic rendering so new listings appear
export const revalidate = 0;

export default async function ListingsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login?next=/listings");
    }

    // Parse filters from URL
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';
    const revenueRange = typeof searchParams.revenue === 'string' ? searchParams.revenue : 'any';
    const assetType = typeof searchParams.type === 'string' ? searchParams.type : 'any';

    // Fetch favorites if user is logged in
    const favoriteIds = user ? await getFavoriteIds() : [];

    // Build Base Query
    let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'live');

    // Apply Keyword Search
    if (q) {
        query = query.or(`title.ilike.%${q}%,short_description.ilike.%${q}%,description.ilike.%${q}%`);
    }

    // Apply Revenue Filter
    if (revenueRange === '0-1000') {
        query = query.gte('monthly_revenue', 0).lte('monthly_revenue', 1000);
    } else if (revenueRange === '1000-5000') {
        query = query.gt('monthly_revenue', 1000).lte('monthly_revenue', 5000);
    } else if (revenueRange === '5000-any') {
        query = query.gt('monthly_revenue', 5000);
    }

    // Apply Asset Type Filter
    if (assetType !== 'any') {
        query = query.eq('listing_type', assetType);
    }

    // Order and Execute
    query = query.order('created_at', { ascending: false });

    const { data: listings } = await query;
    const displayListings = listings && listings.length > 0 ? listings : [];

    // Fetch proof indicator for these listings
    let proofIndicators: any[] = [];
    if (displayListings.length > 0) {
        const { data } = await supabase
            .from('listing_proofs')
            .select('listing_id, proof_type')
            .in('listing_id', displayListings.map(l => l.id));
        proofIndicators = data || [];
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pattern-grid">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full blur-[60px]" />

                <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                                <Sparkles size={12} />
                                Verified Marketplace
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                                Explore <span className="text-emerald-600">Opportunities</span>
                            </h1>
                            <p className="text-gray-500 text-lg font-medium">
                                Discover profitable digital businesses and SaaS platforms for sale.
                            </p>
                        </div>
                        <div className="hidden lg:block pb-1">
                            <Link href="/sell">
                                <Button className="h-14 px-8 bg-gray-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all">
                                    List Your Asset <TrendingUp size={20} className="text-emerald-400" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                {/* Filters Row */}
                <div className="mb-10">
                    <ListingsFilter />
                </div>

                {/* Results Count & Sort */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-sm font-black text-gray-400 uppercase tracking-widest">
                        <Search size={14} />
                        Found {displayListings.length} {displayListings.length === 1 ? 'business' : 'businesses'}
                    </div>
                    {/* Add more sort options if needed */}
                </div>

                {/* Listings Grid */}
                {displayListings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-gray-100 shadow-soft max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Search size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                            No listings match your search
                        </h3>
                        <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">
                            Try expanding your search criteria or adjust the filters. Be the first to list a business like this!
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/listings">
                                <Button variant="outline" className="h-14 px-8 rounded-2xl font-bold">
                                    Clear All Filters
                                </Button>
                            </Link>
                            <Link href="/sell">
                                <Button className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold shadow-glow">
                                    Start Selling
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayListings.map((listing) => {
                            const listingProofs = proofIndicators?.filter(p => p.listing_id === listing.id) || [];
                            return (
                                <ListingCard
                                    key={listing.id}
                                    listing={listing}
                                    isFavorite={favoriteIds.includes(listing.id)}
                                    isLoggedIn={!!user}
                                    hasRevenueProof={listingProofs.some(p => p.proof_type === 'revenue')}
                                    hasTrafficProof={listingProofs.some(p => p.proof_type === 'traffic')}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
