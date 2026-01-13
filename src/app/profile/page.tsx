import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { User, Heart, Settings, LogOut, LayoutDashboard, Inbox, DollarSign, MessageCircle } from "lucide-react";
import { OfferActionButtons } from "@/components/OfferActionButtons";

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

    // --- NEW FETCHES ---
    // Fetch Conversations
    const { data: conversations } = await supabase
        .from("conversations")
        .select(`*, listing:listings(title), buyer:buyer_id(email), seller:seller_id(email)`)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

    // Fetch Offers Sent
    const { data: offersSent } = await supabase
        .from("offers")
        .select(`*, listing:listings(title)`)
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

    // Fetch Offers Received
    const { data: offersReceived } = await supabase
        .from("offers")
        .select(`*, listing:listings(title), buyer:buyer_id(email)`)
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

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

                    {/* Active Conversations */}
                    {conversations && conversations.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black flex items-center gap-2 mb-8 uppercase tracking-tight">
                                Active Conversations <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{conversations.length}</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {conversations.map((conv: any) => {
                                    const otherEmail = conv.buyer_id === user.id ? conv.seller?.email : conv.buyer?.email;
                                    return (
                                        <Link href={`/messages/${conv.id}`} key={conv.id}>
                                            <div className="border-2 border-black p-6 bg-white shadow-neo hover:translate-x-1 hover:-translate-y-1 transition-all">
                                                <h3 className="font-black uppercase text-sm mb-1">{conv.listing?.title}</h3>
                                                <p className="text-xs font-bold text-gray-500 mb-4">With: {otherEmail}</p>
                                                <Button size="sm" variant="outline" className="w-full border-2 border-black font-bold">Open Chat</Button>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Offers Received */}
                    {offersReceived && offersReceived.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black flex items-center gap-2 mb-8 uppercase tracking-tight text-blue-900 border-b-2 border-dashed border-blue-900/20 pb-2 w-fit">
                                Offers Received <DollarSign size={20} />
                            </h2>
                            <div className="space-y-4">
                                {offersReceived.map((offer: any) => (
                                    <div key={offer.id} className="border-2 border-black p-6 bg-blue-50/50 shadow-neo-sm">
                                        <div className="flex flex-wrap justify-between items-start gap-4">
                                            <div>
                                                <h3 className="font-black uppercase text-lg">{offer.listing?.title}</h3>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">From: {offer.buyer?.email}</p>
                                                <div className="mt-4">
                                                    <span className="text-3xl font-black text-blue-600">${offer.amount.toLocaleString()}</span>
                                                </div>
                                                {offer.message && (
                                                    <p className="mt-4 p-3 bg-white border-2 border-black/10 text-sm font-medium italic text-gray-600">"{offer.message}"</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 text-xs font-black uppercase border-2 ${offer.status === 'accepted' ? 'bg-green-100 text-green-800 border-green-800' :
                                                        offer.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-800' :
                                                            offer.status === 'withdrawn' ? 'bg-gray-100 text-gray-500 border-gray-500' :
                                                                'bg-yellow-100 text-yellow-800 border-yellow-800'
                                                    }`}>
                                                    {offer.status}
                                                </span>
                                                <div className="mt-4">
                                                    <OfferActionButtons offer={offer} isSeller={true} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Offers Sent */}
                    {offersSent && offersSent.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black flex items-center gap-2 mb-8 uppercase tracking-tight text-gray-500">
                                Offers Sent
                            </h2>
                            <div className="space-y-4">
                                {offersSent.map((offer: any) => (
                                    <div key={offer.id} className="border-2 border-black p-6 bg-gray-50 shadow-neo-sm opacity-90 hover:opacity-100 transition-opacity">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-black uppercase text-sm mb-1">{offer.listing?.title}</h3>
                                                <p className="text-2xl font-black">${offer.amount.toLocaleString()}</p>
                                                {offer.message && <p className="text-xs text-gray-500 mt-1 italic max-w-md truncate">"{offer.message}"</p>}
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 ${offer.status === 'accepted' ? 'bg-green-500 text-white border-green-700' : 'bg-white border-black text-gray-500'
                                                    }`}>
                                                    {offer.status}
                                                </span>
                                                <div className="mt-2">
                                                    <OfferActionButtons offer={offer} isSeller={false} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}


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
