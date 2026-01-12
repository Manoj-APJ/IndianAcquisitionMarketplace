import { LISTINGS } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Globe, TrendingUp, Users, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        id: string;
    };
}

export default function ListingPage({ params }: PageProps) {
    const listing = LISTINGS.find((l) => l.id === params.id);

    if (!listing) {
        notFound();
    }

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
                                <Badge color="blue" className="mb-4">{listing.type}</Badge>
                                <h1 className="text-4xl md:text-5xl font-black mb-2">{listing.name}</h1>
                                <p className="text-xl text-gray-500 font-medium">{listing.shortDescription}</p>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-bold text-gray-400 uppercase">Asking Price</p>
                                <p className="text-4xl font-black">${listing.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="border-t-2 border-black my-8"></div>

                        <div className="prose prose-lg max-w-none text-gray-800">
                            <h3 className="font-bold text-black text-2xl mb-4">About the business</h3>
                            <p>{listing.description}</p>
                            <p className="mt-4">
                                This asset is perfect for a buyer looking for a {listing.type.toLowerCase()} with proven traction.
                                The codebase is clean, and the handover process will be smooth.
                            </p>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold text-black text-lg mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {listing.techStack.map((tech) => (
                                    <span key={tech} className="bg-black text-white px-3 py-1 text-sm font-bold">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / CTA */}
                <div className="space-y-6">
                    <div className="bg-white border-2 border-black p-6 shadow-neo sticky top-8">
                        <div className="md:hidden mb-6 border-b-2 border-black pb-6">
                            <p className="text-sm font-bold text-gray-400 uppercase">Asking Price</p>
                            <p className="text-4xl font-black">${listing.price.toLocaleString()}</p>
                        </div>

                        <Button className="w-full text-lg h-14 mb-4">Request Access</Button>
                        <p className="text-center text-xs font-medium text-gray-400">
                            No commitment required. You'll sign an NDA.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                                <div className="flex items-center gap-2 font-bold text-sm">
                                    <TrendingUp size={16} className="text-green-600" /> Revenue
                                </div>
                                <span className="font-black text-lg">${listing.revenue.toLocaleString()}/mo</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                                <div className="flex items-center gap-2 font-bold text-sm">
                                    <Users size={16} className="text-blue-600" /> Customers
                                </div>
                                <span className="font-black text-lg">{listing.customers}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
                                <div className="flex items-center gap-2 font-bold text-sm">
                                    <Calendar size={16} className="text-orange-600" /> Founded
                                </div>
                                <span className="font-black text-lg">{new Date(listing.foundedDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold mb-2 text-sm uppercase">Verified by MarketX</h4>
                            <ul className="text-sm space-y-2">
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600" /> <span className="font-bold text-gray-600">Identity Verified</span></li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600" /> <span className="font-bold text-gray-600">Revenue Verified</span></li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600" /> <span className="font-bold text-gray-600">Ownership Verified</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
