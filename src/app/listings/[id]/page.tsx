import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NDAForm, NDAStatus } from "@/components/NDAForm";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getFavoriteIds } from "@/app/actions/favorites";
import {
    ArrowLeft,
    CheckCircle2,
    TrendingUp,
    Users,
    Calendar,
    Lock,
    ExternalLink,
    Zap,
    ShieldCheck,
    FileText
} from "lucide-react";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function ListingPage({ params }: PageProps) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Fetch Public Data
    const { data: publicListing } = await supabase
        .from('listings')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!publicListing) {
        notFound();
    }

    // 2. Fetch Favorite Status
    const favoriteIds = user ? await getFavoriteIds() : [];
    const isFavorite = favoriteIds.includes(publicListing.id);

    // 3. Fetch Proof Metadata (Always allowed for summary signaling)
    const { data: proofs } = await supabase
        .from('listing_proofs')
        .select('proof_type, source, id')
        .eq('listing_id', params.id);

    // 4. Check NDA Status
    let privateData = null;
    let hasSignedNDA = false;
    let ndaDate = null;
    let proofsWithUrls: any[] = [];

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

            // 5. Fetch Private Data
            const { data: secureData } = await supabase
                .from('listing_private_data')
                .select('*')
                .eq('listing_id', params.id)
                .single();

            if (secureData) {
                privateData = secureData;
            }

            // 6. Fetch Full Proofs with Signed URLs
            const { data: fullProofs } = await supabase
                .from('listing_proofs')
                .select('*')
                .eq('listing_id', params.id);

            if (fullProofs) {
                proofsWithUrls = await Promise.all(fullProofs.map(async (p) => {
                    const { data } = await supabase.storage
                        .from('proofs')
                        .createSignedUrl(p.file_url, 3600);
                    return { ...p, signedUrl: data?.signedUrl };
                }));
            }
        }
    }

    const mask = (val: any) => "🔒 Locked";

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/listings" className="inline-flex items-center gap-2 font-black uppercase text-xs tracking-widest mb-8 hover:text-blue-600 transition-colors">
                <ArrowLeft size={14} /> Back to Listings
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border-2 border-black p-8 md:p-12 shadow-neo relative overflow-hidden">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        {/* Favorite Button */}
                        <div className="absolute top-8 right-8 z-10">
                            <FavoriteButton
                                listingId={publicListing.id}
                                initialIsFavorite={isFavorite}
                                isLoggedIn={!!user}
                            />
                        </div>

                        <div className="flex items-start justify-between mb-8">
                            <div className="pr-16">
                                <Badge color="blue" className="mb-4">{publicListing.listing_type}</Badge>
                                {hasSignedNDA && ndaDate && <NDAStatus date={ndaDate} />}

                                <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter leading-tight">{publicListing.title}</h1>
                                <p className="text-xl text-gray-500 font-bold leading-relaxed">{publicListing.short_description}</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Asking Price</p>
                                <p className="text-4xl font-black tracking-tighter">${publicListing.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="border-t-2 border-black my-8 opacity-10"></div>

                        {/* GATED CONTENT SECTION */}
                        {!hasSignedNDA ? (
                            <div className="text-center py-16 bg-amber-50/50 border-2 border-black border-dashed">
                                <div className="bg-white border-2 border-black w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-neo-sm rotate-3">
                                    <Lock size={32} className="text-black" />
                                </div>
                                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Technical Data Locked</h3>
                                <p className="max-w-md mx-auto text-gray-500 font-bold mb-8 text-sm">
                                    Full description, revenue proofs, traffic data, and tech stack are only visible to verified buyers under NDA.
                                </p>
                                {user ? (
                                    <NDAForm listingId={publicListing.id} />
                                ) : (
                                    <Link href={`/login?next=/listings/${params.id}`}>
                                        <Button className="h-14 px-8 font-black uppercase shadow-neo">Log in to Request Access</Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                                <div className="prose prose-lg max-w-none">
                                    <h3 className="font-black text-black text-2xl mb-6 uppercase tracking-tight flex items-center gap-3">
                                        <FileText size={24} className="text-blue-600" />
                                        About the business
                                    </h3>
                                    <div className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap text-base">
                                        {privateData?.description_sensitive || publicListing.description}
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="pt-8 border-t-2 border-black/5">
                                    <h4 className="font-black text-black text-sm mb-4 uppercase tracking-widest">Tech Stack & Infrastructure</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {(privateData?.tech_stack || publicListing.tech_stack)?.map((tech: string) => (
                                            <span key={tech} className="bg-white border-2 border-black px-4 py-2 text-xs font-black uppercase shadow-neo-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Seller Proofs Section */}
                                {proofsWithUrls.length > 0 && (
                                    <div className="pt-12 border-t-2 border-black/10">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h3 className="font-black text-2xl uppercase tracking-tight">Seller-Provided Proofs</h3>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Verification signals provided by the founder</p>
                                            </div>
                                            <Badge color="amber" className="h-fit">NDA RESTRICTED</Badge>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {proofsWithUrls.map((proof) => (
                                                <div key={proof.id} className="border-2 border-black p-6 bg-gray-50 group hover:bg-white transition-colors">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-white border-2 border-black p-2 shadow-neo-sm">
                                                                {proof.proof_type === 'revenue' && <TrendingUp size={18} className="text-blue-600" />}
                                                                {proof.proof_type === 'traffic' && <Zap size={18} className="text-green-600" />}
                                                                {proof.proof_type === 'ownership' && <ShieldCheck size={18} className="text-orange-600" />}
                                                                {proof.proof_type === 'other' && <FileText size={18} className="text-gray-600" />}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-black uppercase text-xs tracking-wider">{proof.proof_type} Proof</h4>
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase">{proof.source}</p>
                                                            </div>
                                                        </div>
                                                        <a
                                                            href={proof.signedUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-black transition-colors"
                                                            title="View Full Resolution"
                                                        >
                                                            <ExternalLink size={16} />
                                                        </a>
                                                    </div>

                                                    {proof.notes && (
                                                        <p className="text-xs font-bold text-gray-600 mb-4 bg-white/50 p-2 border border-black/5 italic">
                                                            "{proof.notes}"
                                                        </p>
                                                    )}

                                                    {proof.signedUrl && proof.file_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                                        <div className="bg-white border-2 border-black p-1 shadow-neo-sm aspect-video overflow-hidden">
                                                            <img
                                                                src={proof.signedUrl}
                                                                alt={`${proof.proof_type} proof`}
                                                                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="bg-white border-2 border-black p-4 shadow-neo-sm text-center">
                                                            <FileText size={32} className="mx-auto mb-2 text-gray-300" />
                                                            <p className="text-[10px] font-black uppercase text-gray-500">Document Uploaded</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                                            MarketX facilitates data sharing but does not guarantee the authenticity of seller-provided screenshots. Review carefully.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar / CTA */}
                <div className="space-y-6">
                    <div className="bg-white border-2 border-black p-6 md:p-8 shadow-neo sticky top-24">
                        <div className="md:hidden mb-6 border-b-2 border-black pb-6">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Asking Price</p>
                            <p className="text-4xl font-black">${publicListing.price.toLocaleString()}</p>
                        </div>

                        {!hasSignedNDA ? (
                            <Button disabled className="w-full text-lg h-16 mb-4 bg-gray-100 text-gray-300 border-2 border-black/10 cursor-not-allowed uppercase font-black">
                                <Lock size={20} className="mr-2" /> Locked Data
                            </Button>
                        ) : (
                            <Button className="w-full text-lg h-16 mb-4 uppercase font-black shadow-neo border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-all">
                                Contact Seller
                            </Button>
                        )}

                        <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {hasSignedNDA ? "Gated Access Active" : "Sign NDA to contact seller"}
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black shadow-neo-sm">
                                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-wider text-gray-400">
                                    <TrendingUp size={16} className="text-blue-600" /> Revenue
                                </div>
                                <span className="font-black text-xl">
                                    {hasSignedNDA
                                        ? `$${(privateData?.exact_monthly_revenue || publicListing.monthly_revenue).toLocaleString()}/mo`
                                        : mask("Revenue")
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black shadow-neo-sm">
                                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-wider text-gray-400">
                                    <Users size={16} className="text-green-600" /> Customers
                                </div>
                                <span className="font-black text-xl">
                                    {hasSignedNDA
                                        ? (privateData?.exact_customers_count || publicListing.customers_count).toLocaleString()
                                        : mask("Users")
                                    }
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black shadow-neo-sm">
                                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-wider text-gray-400">
                                    <Calendar size={16} className="text-orange-600" /> Age
                                </div>
                                <span className="font-black text-xl">
                                    {publicListing.founded_date ? `${Math.floor((new Date().getTime() - new Date(publicListing.founded_date).getTime()) / (1000 * 60 * 60 * 24 * 365))} Yrs` : 'N/A'}
                                </span>
                            </div>
                        </div>

                        {/* Trust Signals (Dynamic) */}
                        <div className="mt-8 pt-8 border-t-2 border-black">
                            <h4 className="font-black mb-4 text-[10px] uppercase tracking-widest text-gray-400">Seller-Provided Proofs</h4>
                            <ul className="space-y-3">
                                {proofs && proofs.some(p => p.proof_type === 'revenue') ? (
                                    <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-blue-600" /> <span className="font-black text-[10px] uppercase tracking-tight">Revenue Proof Uploaded</span></li>
                                ) : (
                                    <li className="flex items-center gap-3 opacity-30"><FileText size={16} className="text-gray-400" /> <span className="font-black text-[10px] uppercase tracking-tight">Revenue Not Proven</span></li>
                                )}

                                {proofs && proofs.some(p => p.proof_type === 'traffic') ? (
                                    <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-600" /> <span className="font-black text-[10px] uppercase tracking-tight">Traffic Proof Uploaded</span></li>
                                ) : (
                                    <li className="flex items-center gap-3 opacity-30"><FileText size={16} className="text-gray-400" /> <span className="font-black text-[10px] uppercase tracking-tight text-gray-400">Traffic Not Proven</span></li>
                                )}

                                {proofs && proofs.some(p => p.proof_type === 'ownership') ? (
                                    <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-orange-600" /> <span className="font-black text-[10px] uppercase tracking-tight">Ownership Proof Uploaded</span></li>
                                ) : (
                                    <li className="flex items-center gap-3 opacity-30"><FileText size={16} className="text-gray-400" /> <span className="font-black text-[10px] uppercase tracking-tight text-gray-400">Ownership Not Proven</span></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
