import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowRight, TrendingUp, Check, Zap } from "lucide-react";
import { Listing } from "@/types/database";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ListingCardProps {
    listing: Listing;
    isFavorite?: boolean;
    isLoggedIn?: boolean;
    hasRevenueProof?: boolean;
    hasTrafficProof?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
    listing,
    isFavorite = false,
    isLoggedIn = false,
    hasRevenueProof = false,
    hasTrafficProof = false
}) => {
    return (
        <div className="relative group h-full">
            <div className="absolute top-4 right-4 z-20">
                <FavoriteButton listingId={listing.id} initialIsFavorite={isFavorite} isLoggedIn={isLoggedIn} />
            </div>
            <Link href={`/listings/${listing.id}`} className="block h-full">
                <div className="flex h-full flex-col justify-between border-2 border-black bg-white p-6 transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-neo">
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex flex-wrap gap-2">
                                <Badge color="blue">{listing.listing_type}</Badge>
                                {hasRevenueProof && (
                                    <Badge color="amber" className="flex items-center gap-1">
                                        <Check size={10} strokeWidth={4} /> REVENUE PROOF
                                    </Badge>
                                )}
                                {hasTrafficProof && (
                                    <Badge color="green" className="flex items-center gap-1">
                                        <Check size={10} strokeWidth={4} /> TRAFFIC PROOF
                                    </Badge>
                                )}
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                {listing.founded_date ? new Date(listing.founded_date).getFullYear() : 'N/A'}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                            {listing.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500 font-bold line-clamp-2 leading-relaxed">
                            {listing.short_description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {listing.tech_stack?.slice(0, 3).map((tech: string) => (
                                <span key={tech} className="text-[10px] font-black uppercase bg-gray-50 border border-black/10 px-2 py-1 tracking-widest">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 border-t-2 border-black pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Asking Price</p>
                                <p className="text-xl font-black">${listing.price.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                                    <TrendingUp size={12} /> Revenue/Mo
                                </p>
                                <p className="text-xl font-black text-green-600">${listing.monthly_revenue.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end font-bold text-sm group-hover:underline">
                            View Details <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
