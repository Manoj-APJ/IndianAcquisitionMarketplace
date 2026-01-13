import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ListingStatus } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { AdminActions } from "./_components/AdminActions";
import Link from "next/link";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default async function AdminDashboard() {
    const supabase = createClient();

    // 1. Secure Route Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-4xl font-black mb-4">Unauthorized</h1>
                <p className="text-xl">You do not have permission to view this page.</p>
            </div>
        );
    }

    // 2. Fetch Pending Listings
    const { data: pendingListings } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "submitted")
        .order("created_at", { ascending: true });

    // 3. Fetch Proof Metadata for these listings
    const { data: proofs } = await supabase
        .from("listing_proofs")
        .select("listing_id, proof_type")
        .in("listing_id", pendingListings?.map(l => l.id) || []);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between border-b-4 border-black pb-4 mb-12 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-5xl font-black uppercase tracking-tighter">
                        Command Center
                    </h1>
                    <Badge color="blue" className="text-xl px-4 py-1">ADMIN</Badge>
                </div>
                <Link href="/admin/blogs">
                    <Button variant="outline" className="border-2 border-black bg-white hover:bg-gray-50">
                        Manage Blogs
                    </Button>
                </Link>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    Pending Approvals
                    <Badge color="yellow">{pendingListings?.length || 0}</Badge>
                </h2>

                {!pendingListings?.length ? (
                    <div className="p-8 bg-gray-50 border-2 border-black/10 text-center font-bold text-gray-500">
                        No pending listings to review.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pendingListings.map((listing) => (
                            <div key={listing.id} className="bg-white border-2 border-black p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-neo-sm">
                                <div>
                                    <div className="flex gap-2 mb-2">
                                        <Badge>{listing.listing_type}</Badge>
                                        <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 border border-black/20">
                                            {listing.id.slice(0, 8)}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black mb-1">{listing.title}</h3>
                                    <p className="text-sm text-gray-500 font-bold max-w-xl truncate mb-4">{listing.short_description}</p>

                                    <div className="flex flex-wrap gap-4 items-center">
                                        <div className="flex gap-4 text-sm font-black uppercase tracking-tight">
                                            <span className="text-gray-400">PRICE: <span className="text-black">${listing.price.toLocaleString()}</span></span>
                                            <span className="text-gray-400">REV: <span className="text-green-600">${listing.monthly_revenue}/mo</span></span>
                                        </div>

                                        <div className="h-4 w-px bg-black/10 hidden md:block" />

                                        <div className="flex gap-2">
                                            {['revenue', 'traffic', 'ownership'].map(type => {
                                                const hasProof = proofs?.some(p => p.listing_id === listing.id && p.proof_type === type);
                                                return (
                                                    <div
                                                        key={type}
                                                        className={`flex items-center gap-1 border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase ${hasProof ? 'bg-amber-100' : 'bg-gray-100 opacity-30 cursor-not-allowed'}`}
                                                        title={hasProof ? `Has ${type} proof` : `Missing ${type} proof`}
                                                    >
                                                        {hasProof ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                                        {type.slice(0, 3)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <Link href={`/listings/${listing.id}`} target="_blank">
                                        <Button variant="outline" size="sm" className="h-10 px-4 font-black uppercase shadow-neo-sm">Review</Button>
                                    </Link>
                                    <AdminActions listingId={listing.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
