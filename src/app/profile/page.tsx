import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { User, Heart, LogOut, LayoutDashboard, MessageSquare, DollarSign, Plus, Zap, ArrowRight, Shield } from "lucide-react";
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
        <div className="min-h-screen bg-gray-50/50 py-10 md:py-16 pattern-grid">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Profile Header Card */}
                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-soft-xl mb-10 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center rounded-3xl shadow-glow rotate-3 hover:rotate-0 transition-transform duration-300">
                                <User size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{user.email}</h1>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full">
                                        {profile?.role || "Member"}
                                    </span>
                                    <span className="text-gray-400 text-sm font-medium">Joined {new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {profile?.role === 'admin' && (
                                <Link href="/admin">
                                    <Button variant="outline" className="h-12 rounded-2xl font-bold border-gray-100 hover:border-emerald-200">
                                        <LayoutDashboard size={18} className="mr-2 text-emerald-600" />
                                        Admin Panel
                                    </Button>
                                </Link>
                            )}
                            <form action="/auth/signout" method="post">
                                <Button
                                    variant="outline"
                                    className="h-12 rounded-2xl font-bold border-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                                >
                                    <LogOut size={18} className="mr-2" /> Sign Out
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 gap-10">

                    {/* Active Conversations & Communications */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                        {/* Conversations */}
                        <section className="bg-white rounded-[32px] p-8 shadow-soft-xl border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
                                    <MessageSquare size={24} className="text-emerald-500" />
                                    Active Chats
                                </h2>
                                <span className="bg-gray-50 text-gray-400 text-xs px-3 py-1 rounded-full font-black">
                                    {conversations?.length || 0}
                                </span>
                            </div>

                            {(!conversations || conversations.length === 0) ? (
                                <div className="text-center py-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                                    <p className="text-gray-400 font-bold mb-4">No active conversations</p>
                                    <Link href="/listings">
                                        <Button variant="ghost" className="text-emerald-600 font-black text-xs uppercase tracking-widest">Browse Listings <ArrowRight size={14} className="ml-1" /></Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                    {conversations.map((conv: any) => {
                                        const otherEmail = conv.buyer_id === user.id ? conv.seller?.email : conv.buyer?.email;
                                        return (
                                            <Link href={`/messages/${conv.id}`} key={conv.id}>
                                                <div className="group border-2 border-gray-50 rounded-2xl p-5 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{conv.listing?.title}</h3>
                                                            <p className="text-sm text-gray-400 font-medium mt-1">Chatting with <span className="text-gray-600">{otherEmail}</span></p>
                                                        </div>
                                                        <ArrowRight size={18} className="text-gray-200 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* Offers */}
                        <section className="bg-white rounded-[32px] p-8 shadow-soft-xl border border-gray-100">
                            <h2 className="text-xl font-black text-gray-900 flex items-center gap-3 mb-8 uppercase tracking-tight">
                                <DollarSign size={24} className="text-orange-500" />
                                Recent Offers
                            </h2>

                            <div className="space-y-6">
                                {/* Received */}
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Zap size={12} className="text-orange-400" /> Received
                                    </h3>
                                    {(!offersReceived || offersReceived.length === 0) ? (
                                        <p className="text-sm text-gray-300 font-bold italic ml-2">No offers received yet.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {offersReceived.slice(0, 3).map((offer: any) => (
                                                <div key={offer.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-sm truncate max-w-[150px]">{offer.listing?.title}</span>
                                                        <span className="text-emerald-600 font-black">${offer.amount.toLocaleString()}</span>
                                                    </div>
                                                    <OfferActionButtons offer={offer} isSeller={true} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Sent */}
                                <div className="pt-4 border-t border-gray-50">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Shield size={12} className="text-emerald-400" /> Sent
                                    </h3>
                                    {(!offersSent || offersSent.length === 0) ? (
                                        <p className="text-sm text-gray-300 font-bold italic ml-2">No offers sent yet.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {offersSent.slice(0, 3).map((offer: any) => (
                                                <div key={offer.id} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-bold text-sm truncate max-w-[150px]">{offer.listing?.title}</span>
                                                        <span className="text-gray-900 font-black">${offer.amount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <StatusBadge status={offer.status} />
                                                        <Link href={`/messages`} className="text-[10px] font-black uppercase text-emerald-600 hover:underline">Discuss</Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* My Assets */}
                    <section className="bg-white rounded-[32px] p-8 md:p-12 shadow-soft-xl border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                                    <Zap size={28} className="text-emerald-500" fill="currentColor" />
                                    Your Assets
                                    <span className="bg-emerald-50 text-emerald-600 text-xs px-3 py-1 rounded-full">{myListings?.length || 0}</span>
                                </h2>
                                <p className="text-gray-400 font-medium mt-1">Manage and track your listed digital businesses.</p>
                            </div>
                            <Link href="/sell">
                                <Button className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-black shadow-glow group">
                                    <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform" /> List New Asset
                                </Button>
                            </Link>
                        </div>

                        {(!myListings || myListings.length === 0) ? (
                            <div className="py-20 text-center bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Zap size={32} className="text-gray-200" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No active listings</h3>
                                <p className="text-gray-400 font-medium mb-8 max-w-sm mx-auto">Ready to exit? List your business on AcquireX and get in front of thousands of buyers.</p>
                                <Link href="/sell">
                                    <Button variant="outline" className="h-12 px-6 rounded-xl font-bold">Get Started Now</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {myListings.map(listing => (
                                    <div key={listing.id} className="relative group">
                                        <div className="absolute -top-3 left-6 z-30">
                                            <StatusBadge status={listing.status} />
                                        </div>
                                        <ListingCard
                                            listing={listing}
                                            isLoggedIn={true}
                                            isFavorite={favIds.includes(listing.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Favorites */}
                    <section className="bg-white rounded-[32px] p-8 md:p-12 shadow-soft-xl border border-gray-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Heart size={120} fill="currentColor" className="text-red-500" />
                        </div>

                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
                                <Heart size={24} fill="currentColor" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Saved Assets</h2>
                                <p className="text-gray-400 font-medium">{favoriteListings.length} items watching</p>
                            </div>
                        </div>

                        {(!favoriteListings || favoriteListings.length === 0) ? (
                            <div className="py-16 text-center bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold mb-6">You haven't saved any listings yet.</p>
                                <Link href="/listings">
                                    <Button variant="outline" className="h-12 px-8 rounded-xl font-bold">Explore Marketplace</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
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

function StatusBadge({ status }: { status: string }) {
    const colors = {
        live: "bg-emerald-500 text-white shadow-emerald-200",
        submitted: "bg-orange-500 text-white shadow-orange-200",
        accepted: "bg-blue-500 text-white shadow-blue-200",
        rejected: "bg-red-500 text-white shadow-red-200",
        pending: "bg-yellow-500 text-white shadow-yellow-200",
        withdrawn: "bg-gray-400 text-white shadow-gray-200",
    };

    const colorClass = colors[status as keyof typeof colors] || "bg-gray-500 text-white";

    return (
        <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg ${colorClass} border-2 border-white`}>
            {status}
        </span>
    );
}
