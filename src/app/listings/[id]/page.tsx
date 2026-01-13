import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Calendar, Lock } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NDAForm, NDAStatus } from "@/components/NDAForm";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function ListingPage({ params }: PageProps) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Fetch Public Data (Always available)
    const { data: publicListing } = await supabase
        .from('listings')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!publicListing) {
        notFound();
    }

    // 2. Check NDA Status (Conditional)
    let privateData = null;
    let hasSignedNDA = false;
    let ndaDate = null;

    if (user) {
        const { data: nda } = await supabase
            .from('nda_acceptances')
            .select('*')
            .eq('user_id', user.id)
            .eq('listing_id', params.id)
            .single();

        if (nda) {
            hasSignedNDA = true;
            ndaDate = nda.accepted_at;

            // 3. Fetch Private Data (Only if NDA signed)
            // Note: In a real migration, we would use the separate table created in 0004.
            // For this immediate step, we are simulating the "Unlocked" vs "Locked" state 
            // to ensure the UI flow is correct before fully enforcing the data split.
            // If we strictly used the split table now, existing listings wouldn't have data in it unless we ran migration.

            // Fetching from the PRIVATE table via RLS
            const { data: secureData } = await supabase
                .from('listing_private_data')
                .select('*')
                .eq('listing_id', params.id)
                .single();

            if (secureData) {
                privateData = secureData;
            } else {
                // Fallback if data hasn't been migrated yet, use public data as "private" for demo continuity
                // BUT strictly, we should assume access is granted.
                privateData = {
                    exact_monthly_revenue: publicListing.monthly_revenue,
                    exact_customers_count: publicListing.customers_count,
                    tech_stack: publicListing.tech_stack,
                    description_sensitive: publicListing.description
                };
            }
        }
    }

    // Helper to mask data
    const mask = (val: any) => "🔒 Locked";

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/" className="inline-flex items-center gap-2 font-bold mb-8 hover:underline">
                <ArrowLeft size={16} /> Back to Listings
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border-2 border-black p-8 shadow-neo">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <Badge color="blue" className="mb-4">{publicListing.listing_type}</Badge>
                                {hasSignedNDA && ndaDate && <NDAStatus date={ndaDate} />}

                                <h1 className="text-4xl md:text-5xl font-black mb-2">{publicListing.title}</h1>
                                <p className="text-xl text-gray-500 font-medium">{publicListing.short_description}</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold text-gray-400 uppercase">Asking Price</p>
                                <p className="text-4xl font-black">${publicListing.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="border-t-2 border-black my-8"></div>

                        {/* GATED CONTENT SECTION */}
                        {!hasSignedNDA ? (
                            <div className="text-center py-12 bg-gray-50 border border-gray-200">
                                <Lock size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-2xl font-black mb-2">Detailed Information Locked</h3>
                                <p className="max-w-md mx-auto text-gray-500 mb-6">
                                    To view the full description, exact revenue figures, and tech stack, you must sign a Non-Disclosure Agreement.
                                </p>
                                {user ? (
                                    <NDAForm listingId={publicListing.id} />
                                ) : (
                                    <Link href={`/login?next=/listings/${params.id}`}>
                                        <Button>Log in to Request Access</Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="animate-in fade-in duration-500">
                                <div className="prose prose-lg max-w-none text-gray-800">
                                    <h3 className="font-bold text-black text-2xl mb-4">About the business</h3>
                                    <p className="whitespace-pre-wrap">
                                        {/* Prefer private description if available, else public */}
                                        {privateData?.description_sensitive || publicListing.description}
                                    </p>
                                    <p className="mt-4 italic text-sm text-gray-500 border-l-4 border-black pl-4">
                                        Seller Note: This asset is perfect for a buyer looking for a {publicListing.listing_type.toLowerCase()} with proven traction.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h4 className="font-bold text-black text-lg mb-3">Tech Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Prefer private stack if available */}
                                        {(privateData?.tech_stack || publicListing.tech_stack)?.map((tech: string) => (
                                            <span key={tech} className="bg-black text-white px-3 py-1 text-sm font-bold">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar / CTA */}
                <div className="space-y-6">
                    <div className="bg-white border-2 border-black p-6 shadow-neo sticky top-8">
                        <div className="md:hidden mb-6 border-b-2 border-black pb-6">
                            <p className="text-sm font-bold text-gray-400 uppercase">Asking Price</p>
                            <p className="text-4xl font-black">${publicListing.price.toLocaleString()}</p>
                        </div>

                        {!hasSignedNDA ? (
                            <Button disabled className="w-full text-lg h-14 mb-4 bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed">
                                Request Access (Locked)
                            </Button>
                        ) : (
                            <Button className="w-full text-lg h-14 mb-4">
                                Contact Seller
                            </Button>
                        )}

                        <p className="text-center text-xs font-medium text-gray-400">
                            {hasSignedNDA ? "You have full access." : "Sign NDA to unlock details."}
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                                <div className="flex items-center gap-2 font-bold text-sm">
                                    <TrendingUp size={16} className="text-green-600" /> Revenue
                                </div>
                                <span className="font-black text-lg">
                                    {hasSignedNDA
                                        ? `$${(privateData?.exact_monthly_revenue || publicListing.monthly_revenue).toLocaleString()}/mo`
                                        : mask("Revenue")
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                                <div className="flex items-center gap-2 font-bold text-sm">
                                    <Users size={16} className="text-blue-600" /> Customers
                                </div>
                                <span className="font-black text-lg">
                                    {hasSignedNDA
                                        ? (privateData?.exact_customers_count || publicListing.customers_count)
                                        : mask("Users")
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                                <div className="flex items-center gap-2 font-bold text-sm">
                                    <Calendar size={16} className="text-orange-600" /> Founded
                                </div>
                                <span className="font-black text-lg">
                                    {publicListing.founded_date ? new Date(publicListing.founded_date).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-8">
                            <h4 className="font-bold mb-2 text-sm uppercase">Verified by MarketX</h4>
                            <ul className="text-sm space-y-2">
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600" /> <span className="font-bold text-gray-600">Identity Verified</span></li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600" /> <span className="font-bold text-gray-600">Revenue Verified</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
