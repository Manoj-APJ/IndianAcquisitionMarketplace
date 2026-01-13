import { ListingCard } from "@/components/ListingCard";
import { ListingsFilter } from "@/components/ListingsFilter";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { getFavoriteIds } from "@/app/actions/favorites";

// Force dynamic rendering so new listings appear
export const revalidate = 0;

export default async function ListingsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Parse filters from URL
    const q = typeof searchParams.q === 'string' ? searchParams.q : '';
    const revenueRange = typeof searchParams.revenue === 'string' ? searchParams.revenue : 'any';
    const assetType = typeof searchParams.type === 'string' ? searchParams.type : 'any';

    // Fetch favorites if user is logged in
    const favoriteIds = user ? await getFavoriteIds() : [];

    // 1. Build Base Query
    let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'live');

    // 2. Apply Keyword Search
    if (q) {
        query = query.or(`title.ilike.%${q}%,short_description.ilike.%${q}%,description.ilike.%${q}%`);
    }

    // 3. Apply Revenue Filter
    if (revenueRange === '0-1000') {
        query = query.gte('monthly_revenue', 0).lte('monthly_revenue', 1000);
    } else if (revenueRange === '1000-5000') {
        query = query.gt('monthly_revenue', 1000).lte('monthly_revenue', 5000);
    } else if (revenueRange === '5000-any') {
        query = query.gt('monthly_revenue', 5000);
    }

    // 4. Apply Asset Type Filter
    if (assetType !== 'any') {
        query = query.eq('listing_type', assetType);
    }

    // 5. Order and Execute
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
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Browse Active Listings</h1>
                <p className="text-xl text-gray-600 font-bold">Discover profitable micro-SaaS, newsletters, and communities.</p>
            </div>

            <ListingsFilter />

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
            </section>
        </div>
    );
}
