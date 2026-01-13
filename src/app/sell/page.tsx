"use client";

import { Button } from "@/components/ui/Button";
import { submitListing } from "@/app/actions/listings";
// @ts-ignore
import { useFormState } from "react-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const initialState = {
    error: null,
    success: false
};

export default function SellPage() {
    const [state, formAction] = useFormState(submitListing as any, initialState);

    // Scroll to top on success
    useEffect(() => {
        if (state?.success) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [state?.success]);

    if (state?.success) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
                <div className="bg-green-50, border-2 border-black p-12 shadow-neo flex flex-col items-center">
                    {/* <CheckCircle2 size={64} className="text-green-500 mb-6" /> */}
                    <div className="mb-8 w-64 h-64 relative bg-white border-2 border-black p-2 shadow-neo-sm rotate-1">
                        <img src="/submitted-review.png" alt="Submitted for Review" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-4xl font-black mb-4">Listing Submitted!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Your asset has been submitted for review. Our team will verify your revenue and traffic stats shortly.
                    </p>
                    <Link href="/">
                        <Button size="lg">Back to Marketplace</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Sell Your Asset</h1>
                <p className="text-xl text-gray-600">Get in front of 20,000+ buyers in 10 minutes.</p>
            </div>

            <form action={formAction} className="bg-white border-2 border-black p-8 shadow-neo space-y-8">

                {state?.error && (
                    <div className="p-4 bg-red-50 border-2 border-red-500 flex gap-2 items-start">
                        <AlertCircle className="text-red-500 shrink-0" size={20} />
                        <p className="text-sm font-bold text-red-700">{state.error}</p>
                    </div>
                )}

                {/* Section 1: Basics */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black border-b-2 border-black pb-2">1. The Basics</h3>

                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">Project Name</label>
                        <input
                            name="title"
                            required
                            type="text"
                            placeholder="e.g. Acme SaaS"
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold uppercase mb-2">Type</label>
                            <select name="type" className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 ring-blue-600/20">
                                <option value="SaaS">SaaS</option>
                                <option value="Newsletter">Newsletter</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Community">Community</option>
                                <option value="Micro-SaaS">Micro-SaaS</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase mb-2">Asking Price ($)</label>
                            <input
                                name="price"
                                required
                                type="number"
                                min="0"
                                placeholder="50000"
                                className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">One-Line Pitch</label>
                        <input
                            name="short_description"
                            required
                            type="text"
                            maxLength={120}
                            placeholder="e.g. AI-powered design tool for social media posts."
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                        />
                        <p className="text-xs text-gray-400 mt-1 font-bold text-right">Max 120 chars</p>
                    </div>
                </div>

                {/* Section 2: Details */}
                <div className="space-y-6">
                    <h3 className="text-xl font-black border-b-2 border-black pb-2">2. The Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold uppercase mb-2">Monthly Revenue ($)</label>
                            <input
                                name="revenue"
                                required
                                type="number"
                                min="0"
                                placeholder="1200"
                                className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase mb-2">Customers / Subscribers</label>
                            <input
                                name="customers"
                                required
                                type="number"
                                min="0"
                                placeholder="150"
                                className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">Date Founded</label>
                        <input
                            name="founded_date"
                            required
                            type="date"
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">Full Description</label>
                        <textarea
                            name="description"
                            required
                            rows={6}
                            placeholder="Tell us the story. What is the product? How does it make money? Why are you selling? (Markdown supported)"
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold uppercase mb-2">Tech Stack</label>
                        <input
                            name="tech_stack"
                            required
                            type="text"
                            placeholder="Next.js, Supabase, Stripe (comma separated)"
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 ring-blue-600/20"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <Button className="w-full text-lg h-14" type="submit">
                        Submit Listing for Review
                    </Button>
                    <p className="mt-4 text-center text-xs text-gray-500 font-bold">
                        By submitting, you agree to our Terms of Service.
                    </p>
                </div>
            </form>
        </div>
    );
}
