import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ListingStatus } from "@/types/database";
import { Button } from "@/components/ui/Button"; // We'll need client components for the actions buttons
import { AdminActions } from "./_components/AdminActions"; // Refactor into client component

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
        .eq("status", "submitted") // Explicitly waiting for approval
        .order("created_at", { ascending: true });

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-black mb-8 border-b-2 border-black pb-4">
                Admin Dashboard
            </h1>

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
                                    <h3 className="text-xl font-black">{listing.title}</h3>
                                    <p className="text-sm text-gray-600 max-w-xl truncate">{listing.short_description}</p>
                                    <div className="flex gap-4 mt-2 text-sm font-bold">
                                        <span className="text-green-600">${listing.monthly_revenue}/mo</span>
                                        <span>${listing.price}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <a href={`/listings/${listing.id}`} target="_blank">
                                        <Button variant="outline" size="sm">View</Button>
                                    </a>
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
