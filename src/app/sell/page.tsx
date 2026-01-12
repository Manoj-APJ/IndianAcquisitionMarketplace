"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SellPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 800);
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
                <div className="bg-white border-2 border-black p-12 shadow-neo flex flex-col items-center">
                    <CheckCircle2 size={64} className="text-green-500 mb-6" />
                    <h1 className="text-4xl font-black mb-4">Listing Submitted!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Your asset has been submitted for review. Our team will verify your revenue and traffic stats within 24 hours.
                    </p>
                    <Link href="/">
                        <Button size="lg">Back to Marketplace</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Sell Your Asset</h1>
                <p className="text-xl text-gray-600">Get in front of 20,000+ buyers in 10 minutes.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-8 shadow-neo space-y-6">
                <div>
                    <label className="block text-sm font-bold uppercase mb-2">Project Name</label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. Acme SaaS"
                        className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">Type</label>
                        <select className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 ring-blue-600/20">
                            <option>SaaS</option>
                            <option>Newsletter</option>
                            <option>E-commerce</option>
                            <option>Community</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">Asking Price ($)</label>
                        <input
                            required
                            type="number"
                            placeholder="50000"
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold uppercase mb-2">Monthly Revenue ($)</label>
                    <input
                        required
                        type="number"
                        placeholder="1200"
                        className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold uppercase mb-2">Short Description</label>
                    <textarea
                        required
                        rows={3}
                        placeholder="Describe what your project does in one sentence..."
                        className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold uppercase mb-2">Tech Stack</label>
                    <input
                        required
                        type="text"
                        placeholder="Next.js, Supabase, Stripe (comma separated)"
                        className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                    />
                </div>

                <div className="pt-4">
                    <Button className="w-full text-lg h-12" type="submit">
                        Submit Listing for Review
                    </Button>
                    <p className="mt-4 text-center text-xs text-gray-500 font-bold">
                        By submitting, you agree to our Terms of Service. Listings are reviewed within 24 hours.
                    </p>
                </div>
            </form>
        </div>
    );
}
