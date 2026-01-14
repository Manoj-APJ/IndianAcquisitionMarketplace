import Link from "next/link";
import { ArrowRight, TrendingUp, CheckCircle, Zap, Shield } from "lucide-react";
import { Listing } from "@/types/database";
import { FavoriteButton } from "@/components/FavoriteButton";

interface ListingCardProps {
    listing: Listing;
    isFavorite?: boolean;
    isLoggedIn?: boolean;
    hasRevenueProof?: boolean;
    hasTrafficProof?: boolean;
    hasOwnershipProof?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
    listing,
    isFavorite = false,
    isLoggedIn = false,
    hasRevenueProof = false,
    hasTrafficProof = false,
    hasOwnershipProof = false
}) => {
    return (
        <div className="relative group h-full">
            <div className="absolute top-4 right-4 z-20">
                <FavoriteButton listingId={listing.id} initialIsFavorite={isFavorite} isLoggedIn={isLoggedIn} />
            </div>
            <Link href={`/listings/${listing.id}`} className="block h-full">
                <div className="flex h-full flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all hover:-translate-y-2 border border-gray-100 group-hover:border-emerald-200">
                    {/* Card Header - Gradient Bar */}
                    <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                                    {listing.listing_type}
                                </span>
                                {hasRevenueProof && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold border border-emerald-100">
                                        <CheckCircle size={12} strokeWidth={3} /> Rev Verified
                                    </span>
                                )}
                                {hasTrafficProof && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold border border-cyan-100">
                                        <CheckCircle size={12} strokeWidth={3} /> Traffic
                                    </span>
                                )}
                                {hasOwnershipProof && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold border border-orange-100">
                                        <Shield size={12} strokeWidth={3} /> Owner Verified
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2">
                                {listing.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                                {listing.short_description}
                            </p>

                            {/* Tech Stack */}
                            {listing.tech_stack && listing.tech_stack.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {listing.tech_stack.slice(0, 3).map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {listing.tech_stack.length > 3 && (
                                        <span className="text-xs text-gray-400 px-2 py-1">
                                            +{listing.tech_stack.length - 3} more
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer with metrics */}
                        <div className="pt-4 mt-auto border-t border-gray-100">
                            <div className="flex items-end justify-between mb-3">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1 font-medium">Asking Price</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${listing.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1 flex items-center justify-end gap-1 font-medium">
                                        <TrendingUp size={12} className="text-emerald-500" /> Revenue/mo
                                    </p>
                                    <p className="text-lg font-bold text-emerald-600">
                                        ${listing.monthly_revenue.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-orange-500" />
                                    <span className="text-xs text-gray-500 font-medium">
                                        {listing.founded_date ? `Est. ${new Date(listing.founded_date).getFullYear()}` : 'View Details'}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                                    View
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
