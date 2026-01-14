import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
    ArrowRight,
    Shield,
    MessageSquare,
    FileText,
    Zap,
    TrendingUp,
    Lock,
    CheckCircle,
    Sparkles,
    Users,
    DollarSign,
    BarChart3,
    Globe,
    Star,
    Search,
    UserCheck,
    MousePointer2
} from "lucide-react";
import { ListingCard } from "@/components/ListingCard";

export const revalidate = 0;

export default async function Home() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch dynamic listings
    const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .eq("status", "live")
        .order("created_at", { ascending: false })
        .limit(6);

    const { data: blogs } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);

    if (user) {
        return <LoggedInDashboard user={user} listings={listings || []} blogs={blogs} />;
    }

    const featuredListings = (listings || []).slice(0, 3);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Gradient Orbs */}
                    <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-400/30 rounded-full blur-[100px] animate-pulse-slow" />
                    <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-[80px] animate-float" />
                    <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-orange-400/20 rounded-full blur-[90px] animate-float-delayed" />
                    <div className="absolute -bottom-20 right-10 w-96 h-96 bg-pink-400/15 rounded-full blur-[100px]" />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 pattern-dots opacity-50" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            {/* Floating Badge */}
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 px-5 py-2.5 rounded-full mb-8 animate-float">
                                <Sparkles size={16} className="text-emerald-600" />
                                <span className="text-sm font-semibold text-emerald-700">
                                    The New Way to Acquire Digital Businesses
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                                Buy & Sell
                                <span className="block mt-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                    Profitable Businesses
                                </span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                                The trusted marketplace for acquiring and selling established digital businesses.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                                <Link href="/listings">
                                    <Button className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl hover:shadow-glow-lg transition-all group">
                                        Explore Marketplace
                                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/sell">
                                    <Button
                                        variant="outline"
                                        className="h-14 px-8 text-lg font-semibold border-2 border-gray-200 rounded-2xl hover:border-emerald-300 hover:bg-emerald-50 transition-all font-bold"
                                    >
                                        <DollarSign size={20} className="mr-2" />
                                        List Your Business
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Stats */}
                            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                <StatBadge icon={<Shield />} value="NDA Protected" label="Secure Data" />
                                <StatBadge icon={<MessageSquare />} value="Direct Chat" label="No Middlemen" />
                                <StatBadge icon={<CheckCircle />} value="Verified Only" label="Quality Listings" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* FEATURED LISTINGS */}
            {featuredListings.length > 0 && (
                <section className="py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                            <div>
                                <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
                                    <TrendingUp size={16} />
                                    Fresh Opportunities
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Recently Listed
                                </h2>
                            </div>
                            <Link href="/login">
                                <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                                    View All Listings
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </Link>
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
                    </div>
                </section>
            )}

            {/* FEATURES SECTION */}
            <FeaturesSection />

            {/* HOW IT WORKS */}
            <HowItWorksSection />

            <BlogSection blogs={blogs} />
            <ReadyToStartCTA />
        </div>
    );
}

// Logged-in Dashboard
function LoggedInDashboard({ user, listings, blogs }: { user: any, listings: any[], blogs: any[] | null }) {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50/50 border-b border-gray-100 py-12">
                <div className="container mx-auto px-4">
                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-black shadow-glow">
                                {user.email?.[0].toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Welcome back, <span className="text-emerald-600">Founder</span>
                                </h1>
                                <p className="text-gray-500 font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/sell">
                                <Button className="h-12 px-6 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all">
                                    List New Business
                                </Button>
                            </Link>
                            <Link href="/profile">
                                <Button variant="outline" className="h-12 px-6 rounded-xl border-2 border-gray-200 font-bold hover:border-emerald-200 hover:bg-white transition-all">
                                    View Profile
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <QuickActionCard
                            href="/listings"
                            icon={<TrendingUp size={28} />}
                            title="Marketplace"
                            description="Discover high-growth assets"
                            gradient="from-emerald-500 to-teal-500"
                        />
                        <QuickActionCard
                            href="/messages"
                            icon={<MessageSquare size={28} />}
                            title="Your Messages"
                            description="View recent conversations"
                            gradient="from-orange-500 to-pink-500"
                        />
                        <QuickActionCard
                            href="/profile#offers"
                            icon={<DollarSign size={28} />}
                            title="Active Offers"
                            description="Manage your deal flow"
                            gradient="from-cyan-500 to-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Dynamic Listings Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Recommended Deals</h2>
                            <p className="text-gray-500 font-medium text-sm">Targeted opportunities based on your interest.</p>
                        </div>
                        <Link href="/listings" className="text-emerald-600 font-black text-sm uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                            Browse All <ArrowRight size={16} />
                        </Link>
                    </div>

                    {listings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {listings.map(listing => (
                                <ListingCard
                                    key={listing.id}
                                    listing={listing}
                                    isLoggedIn={true}
                                    isFavorite={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-[32px] p-16 text-center border-2 border-dashed border-gray-200">
                            <Search className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No listings found</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">The marketplace is currently quiet. Check back soon for fresh opportunities.</p>
                            <Link href="/sell">
                                <Button className="bg-emerald-500 text-white font-black rounded-xl px-8 h-12 uppercase tracking-wide shadow-glow">
                                    Start Your Listing
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <HowItWorksSection />
            <BlogSection blogs={blogs} />
            <ReadyToStartCTA />
        </div>
    );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                {icon}
            </div>
            <div className="text-left">
                <p className="font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    );
}

function FeaturesSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 rounded-full blur-[120px] opacity-30 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
                        <Shield size={16} />
                        Trust & Security
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                        Built for Business Acquisitions
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={<Lock className="text-white" />}
                        title="NDA Protected"
                        description="Sensitive metrics unlocked only after digital NDA signature."
                        gradient="from-emerald-500 to-teal-500"
                    />
                    <FeatureCard
                        icon={<MessageSquare className="text-white" />}
                        title="Direct Messaging"
                        description="Chat with founders directly. No brokers, no delays."
                        gradient="from-cyan-500 to-blue-500"
                    />
                    <FeatureCard
                        icon={<FileText className="text-white" />}
                        title="Verified Data"
                        description="All listings reviewed & verified before going live."
                        gradient="from-orange-500 to-pink-500"
                    />
                    <FeatureCard
                        icon={<DollarSign className="text-white" />}
                        title="Zero Commission"
                        description="Flat listing fee only. Keep 100% of your sale."
                        gradient="from-purple-500 to-indigo-500"
                    />
                </div>
            </div>
        </section>
    );
}

function HowItWorksSection() {
    return (
        <section className="py-24 bg-gray-50/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
                        <BarChart3 size={16} />
                        Success Framework
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        How <span className="text-emerald-600">AcquireX</span> Works
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                        A high-velocity acquisition lifecycle optimized for professional results.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-24">
                    {/* Acquirer Path */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">For Acquirers</span>
                            <div className="h-px bg-emerald-100 flex-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <HowItWorksStep
                                number="01"
                                title="Smarter Discovery"
                                desc="Filter through verified high-growth listings by revenue and price."
                                icon={<Search size={24} />}
                                color="emerald"
                            />
                            <HowItWorksStep
                                number="02"
                                title="NDA Access"
                                desc="Unlock proprietary financials with a single-click digital NDA."
                                icon={<Lock size={24} />}
                                color="teal"
                            />
                            <HowItWorksStep
                                number="03"
                                title="Founder Chat"
                                desc="Communicate directly with asset owners through private messaging."
                                icon={<MessageSquare size={24} />}
                                color="cyan"
                            />
                            <HowItWorksStep
                                number="04"
                                title="Acquisition"
                                desc="Facilitate smooth asset transfers and secure payments safely."
                                icon={<MousePointer2 size={24} />}
                                color="emerald"
                            />
                        </div>
                    </div>

                    {/* Seller Path */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px bg-orange-100 flex-1" />
                            <span className="text-xs font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest">For Sellers</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <HowItWorksStep
                                number="01"
                                title="Instant Listing"
                                desc="Onboard your asset with automated metric syncing in minutes."
                                icon={<Zap size={24} />}
                                color="orange"
                            />
                            <HowItWorksStep
                                number="02"
                                title="Vetting"
                                desc="Our team verifies your data to ensure maximum buyer trust."
                                icon={<Shield size={24} />}
                                color="emerald"
                            />
                            <HowItWorksStep
                                number="03"
                                title="Filtering"
                                desc="Receive inquiries only from pre-verified, serious acquirers."
                                icon={<UserCheck size={24} />}
                                color="teal"
                            />
                            <HowItWorksStep
                                number="04"
                                title="Rapid Exit"
                                desc="Close your deal up to 3x faster than traditional marketplaces."
                                icon={<TrendingUp size={24} />}
                                color="cyan"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BlogSection({ blogs }: { blogs: any[] | null }) {
    if (!blogs || blogs.length === 0) return null;
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
                            <Sparkles size={16} />
                            Knowledge Base
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Acquisition <span className="text-emerald-600">Insights</span>
                        </h2>
                    </div>
                    <Link href="/blog">
                        <Button variant="outline" className="rounded-xl border-2 border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 font-bold transition-all">
                            View All Articles
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog: any) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group h-full">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden h-full flex flex-col hover:shadow-soft-lg transition-all group-hover:-translate-y-1">
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    {blog.cover_image ? (
                                        <img
                                            src={blog.cover_image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
                                            <FileText size={40} className="text-emerald-600/20" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center text-emerald-600 font-bold text-sm">
                                        Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ReadyToStartCTA() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto relative px-4 md:px-0">
                    <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-[40px] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[80px] -ml-24 -mb-24" />

                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-emerald-400/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <Zap size={40} className="text-yellow-300 fill-yellow-300" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                                Ready to Start?
                            </h2>
                            <p className="text-xl md:text-2xl text-emerald-50/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                Join founders who are buying and selling digital businesses with confidence.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-5">
                                <Link href="/listings">
                                    <Button className="h-16 px-12 text-lg font-bold bg-[#047857] hover:bg-[#065f46] text-white rounded-[20px] transition-all shadow-xl hover:shadow-glow-emerald active:scale-95 border border-emerald-500/30">
                                        Browse Marketplace
                                    </Button>
                                </Link>
                                <Link href="/sell">
                                    <Button className="h-16 px-12 text-lg font-bold bg-transparent text-white border-2 border-emerald-400/50 rounded-[20px] hover:bg-white/10 transition-all active:scale-95">
                                        List Your Business
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode; title: string; description: string; gradient: string }) {
    return (
        <div className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-1">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function HowItWorksStep({ number, title, desc, icon, color }: { number: string; title: string; desc: string; icon: React.ReactNode; color: string }) {
    const colors: Record<string, string> = {
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        teal: "bg-teal-50 text-teal-600 border-teal-100",
        cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
        orange: "bg-orange-50 text-orange-600 border-orange-100",
    };

    return (
        <div className="group bg-white border border-gray-100 rounded-[32px] p-8 shadow-soft hover:shadow-soft-xl transition-all hover:-translate-y-2">
            <div className="flex items-center justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${colors[color]} shadow-sm group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <span className="text-5xl font-black text-gray-50 group-hover:text-emerald-50/50 transition-colors uppercase select-none">{number}</span>
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors uppercase">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{desc}</p>
        </div>
    );
}

function QuickActionCard({ href, icon, title, description, gradient }: { href: string; icon: React.ReactNode; title: string; description: string; gradient: string }) {
    return (
        <Link href={href} className="group">
            <div className="bg-white rounded-[24px] p-6 shadow-soft hover:shadow-glow transition-all hover:-translate-y-1 border border-gray-100 h-full">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                    {icon}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm font-medium">{description}</p>
            </div>
        </Link>
    );
}
