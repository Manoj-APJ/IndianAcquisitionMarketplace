import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Listing } from "@/types/database"; // Need to update this import source

interface ListingCardProps {
    listing: any; // Using any temporarily until we strictly map database types to frontend components
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
    return (
        <Link href={`/listings/${listing.id}`} className="group block h-full">
            <div className="flex h-full flex-col justify-between border-2 border-black bg-white p-6 transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-neo">
                <div>
                    <div className="flex items-start justify-between">
                        <Badge color="blue">{listing.listing_type}</Badge>
                        <span className="text-sm font-bold text-gray-500">
                            {listing.founded_date ? new Date(listing.founded_date).getFullYear() : 'N/A'}
                        </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black group-hover:text-blue-600 group-hover:underline">
                        {listing.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {listing.short_description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {listing.tech_stack?.slice(0, 3).map((tech: string) => (
                            <span key={tech} className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-sm border border-black/20">
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
    );
};
