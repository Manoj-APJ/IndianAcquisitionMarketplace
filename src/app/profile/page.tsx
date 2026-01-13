import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { User, Heart, Settings, LogOut, LayoutDashboard } from "lucide-react";

export const revalidate = 0;

export default async function ProfilePage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch My Listings
    const { data: myListings } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    // Fetch Favorites
    const { data: favorites } = await supabase
        .from("favorites")
        .select("listing_id")
        .eq("user_id", user.id);

    const favIds = favorites?.map(f => f.listing_id) || [];

    // Fetch actual listing objects for favorites
    let favoriteListings: any[] = [];
    if (favIds.length > 0) {
        const { data } = await supabase
            .from("listings")
            .select("*")
            .in("id", favIds)
            .order("created_at", { ascending: false });
        favoriteListings = data || [];
    }

    // Get Profile Role
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b-2 border-black pb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-blue-50 border-2 border-black flex items-center justify-center rounded-full shadow-neo">
                            <User size={32} className="text-blue-900" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black">{user.email}</h1>
                            <div className="flex gap-2 mt-1">
                                <span className="bg-gray-100 border border-black px-2 py-0.5 text-xs font-bold uppercase">{profile?.role || "User"}</span>
                                <span className="bg-green-100 border border-black px-2 py-0.5 text-xs font-bold uppercase text-green-800">Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {profile?.role === 'admin' && (
                            <Link href="/admin">
                                <Button variant="outline" className="border-2 border-black font-bold h-11"><LayoutDashboard size={18} className="mr-2" /> Admin Dashboard</Button>
                            </Link>
                        )}
                        <form action="/auth/signout" method="post">
                            <Button variant="outline" className="h-11 border-2 border-black font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors">
                                <LogOut size={18} className="mr-2" /> Sign Out
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Content Tabs / Sections */}
                <div className="space-y-16">

                    {/* My Listings */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black flex items-center gap-2 uppercase tracking-tight">
                                My Listings <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full">{myListings?.length || 0}</span>
                            </h2>
                            <Link href="/sell">
                                <Button size="sm" className="font-bold border-2 border-black">Create New Listing</Button>
                            </Link>
                        </div>

                        {(!myListings || myListings.length === 0) ? (
                            <div className="p-12 text-center bg-gray-50 border-2 border-dashed border-black/20">
                                <p className="text-gray-500 font-bold mb-4">You haven't listed any businesses yet.</p>
                                <Link href="/sell"><Button variant="outline" className="border-2 border-black font-bold">Start Selling</Button></Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {myListings.map(listing => (
                                    <div key={listing.id} className="relative">
                                        <ListingCard
                                            listing={listing}
                                            isLoggedIn={true}
                                            isFavorite={favIds.includes(listing.id)}
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 text-white shadow-sm ${listing.status === 'live' ? 'bg-green-500 border-green-700' :
                                                listing.status === 'submitted' ? 'bg-yellow-500 border-yellow-700' :
                                                    'bg-gray-500 border-gray-700'
                                                }`}>
                                                {listing.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Liked Listings */}
                    <section>
                        <h2 className="text-2xl font-black flex items-center gap-2 mb-8 uppercase tracking-tight">
                            Liked Listings <Heart size={20} className="text-red-500 fill-red-500" /> <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full">{favoriteListings.length}</span>
                        </h2>

                        {(!favoriteListings || favoriteListings.length === 0) ? (
                            <div className="p-12 text-center bg-gray-50 border-2 border-dashed border-black/20">
                                <p className="text-gray-500 font-bold">No favorites yet. Browse listings to find your next acquisition.</p>
                                <div className="mt-4">
                                    <Link href="/listings"><Button variant="outline" className="border-2 border-black font-bold">Browse Listings</Button></Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {favoriteListings.map(listing => (
                                    <ListingCard
                                        key={listing.id}
                                        listing={listing}
                                        isFavorite={true}
                                        isLoggedIn={true}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
