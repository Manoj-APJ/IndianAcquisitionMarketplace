import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="container mx-auto px-4 text-center mb-16 max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-black mb-6">How MarketX Works</h1>
                <p className="text-xl text-gray-600 mb-8">
                    We've simplified the process of buying and selling digital assets.
                    No brokers, no hidden fees, just direct deals.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/listings">
                        <Button size="lg" className="h-14 px-8 text-lg">Browse Listings</Button>
                    </Link>
                    <Link href="/sell">
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg">Sell a Business</Button>
                    </Link>
                </div>
            </div>

            <HowItWorksSection />

            <div className="container mx-auto px-4 py-24 text-center">
                <div className="bg-blue-900 text-white p-12 border-2 border-black shadow-neo max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black mb-4">Questions?</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Our support team is here to help you navigate your first acquisition or exit.
                    </p>
                    <Link href="mailto:support@marketx.com">
                        <Button className="bg-amber-500 text-black border-white hover:bg-amber-400">Contact Support</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
