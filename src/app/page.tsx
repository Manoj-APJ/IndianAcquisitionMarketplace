import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TRUST_METRICS } from "@/lib/landing-data-v2";
import {
    CheckCircle2,
    MessageCircle,
    ShieldCheck,
    BadgeDollarSign,
    Lock
} from "lucide-react";
import { WhoItsForSection } from "@/components/home/WhoItsForSection";
import { AssetCategoriesSection } from "@/components/home/AssetCategoriesSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FAQSection } from "@/components/home/FAQSection";
import { BlogGrid } from "@/components/home/BlogGrid";
import { ListingCard } from "@/components/ListingCard";

export const revalidate = 0;

export default async function Home() {
    const supabase = createClient();

    const { data: blogs } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);

    // Fetch Top 3 Listings for teaser (only if not logged in)
    let featuredListings: any[] = [];
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        const { data } = await supabase
            .from("listings")
            .select("*")
            .eq("status", "live")
            .order("created_at", { ascending: false })
            .limit(3);
        featuredListings = data || [];
    }

    return (
        <div className="min-h-screen bg-white">

            {/* HERO */}
            <section className="relative pt-24 pb-32 border-b-2 border-black bg-white overflow-hidden">
                <div className="container mx-auto px-4 text-center max-w-6xl relative z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-black px-4 py-2 font-black text-xs uppercase mb-8 shadow-neo-sm">
                        <Lock size={14} />
                        Designed for Serious Buyer–Seller Discussions.
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95]">
                        Buy & Sell <br className="hidden md:block" />
                        <span className="text-blue-900 border-b-4 border-amber-400">
                            Real Digital Businesses
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-600 font-medium mb-12 max-w-4xl mx-auto">
                        SaaS, content sites, newsletters, e-commerce stores, mobile apps & more.
                        <br className="hidden md:block" />
                        Proof-based listings, NDA-gated data, admin-approved deals.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-14">
                        <Link href="/listings">
                            <Button className="h-16 px-10 text-xl font-black bg-amber-500 text-black border-2 border-black shadow-neo hover:translate-x-1 hover:-translate-y-1 transition-all">
                                Browse Listings
                            </Button>
                        </Link>
                        <Link href="/sell">
                            <Button
                                variant="outline"
                                className="h-16 px-10 text-xl font-black border-2 border-black"
                            >
                                List Your Business
                            </Button>
                        </Link>
                    </div>

                    {/* Trust bullets */}
                    <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base font-bold text-gray-700">
                        <span className="flex items-center gap-2">
                            <ShieldCheck size={20} strokeWidth={3} />
                            NDA-protected private data
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 size={20} strokeWidth={3} />
                            Admin-verified listings
                        </span>
                        <span className="flex items-center gap-2">
                            <MessageCircle size={20} strokeWidth={3} />
                            Direct buyer–seller chat
                        </span>
                        <span className="flex items-center gap-2">
                            <BadgeDollarSign size={20} strokeWidth={3} />
                            No commissions
                        </span>
                    </div>
                </div>

                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
            </section>

            {/* TRUST METRICS */}
            <section className="bg-black text-white border-b-2 border-black py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                        {TRUST_METRICS.map((metric) => (
                            <div key={metric.label} className="flex-1 text-center pt-6 md:pt-0">
                                <p className="text-4xl md:text-5xl font-black text-amber-500">
                                    {metric.value}
                                </p>
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                                    {metric.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED LISTINGS (Logged Out Only) */}
            {featuredListings.length > 0 && (
                <section className="py-20 bg-gray-50 border-b-2 border-black">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">New Opportunities</h2>
                            <p className="text-gray-600 font-bold max-w-2xl mx-auto">
                                Fresh profitable businesses just added to the marketplace. Log in to view full details and make offers.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredListings.map(listing => (
                                <ListingCard
                                    key={listing.id}
                                    listing={listing}
                                    isLoggedIn={false}
                                    isFavorite={false}
                                />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href="/login">
                                <Button className="h-14 px-8 font-black uppercase shadow-neo">View All Listings</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <WhoItsForSection />
            <AssetCategoriesSection />
            <HowItWorksSection />
            <ComparisonSection />

            {/* PRICING SIGNAL */}
            <section className="py-20 bg-gray-50 border-t-2 border-black text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                    Simple, transparent pricing
                </h2>
                <p className="text-xl text-gray-600 mb-10">
                    No commissions. No hidden fees.
                </p>
                <div className="flex justify-center gap-6 flex-wrap">
                    <div className="border-2 border-black px-10 py-6 font-black text-xl">
                        $19 / year
                    </div>
                    <div className="border-2 border-black px-10 py-6 font-black text-xl bg-amber-100">
                        $49 lifetime
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 bg-blue-900 text-white text-center border-t-2 border-black">
                <h2 className="text-4xl md:text-6xl font-black mb-8">
                    Close deals with confidence
                </h2>
                <p className="text-gray-300 text-xl mb-12">
                    Safer than open marketplaces. Built for serious buyers and sellers.
                </p>
                <div className="flex justify-center gap-6 flex-wrap">
                    <Link href="/listings">
                        <Button className="h-20 px-12 text-2xl font-black bg-amber-500 text-black border-2 border-white">
                            Browse Listings
                        </Button>
                    </Link>
                    <Link href="/sell">
                        <Button
                            variant="outline"
                            className="h-20 px-12 text-2xl font-black border-2 border-white text-white"
                        >
                            List Your Business
                        </Button>
                    </Link>
                </div>
            </section>

            <BlogGrid blogs={blogs || []} />
            <FAQSection />
        </div>
    );
}
