"use client";

import { Button } from "@/components/ui/Button";
import { submitListing } from "@/app/actions/listings";
// @ts-ignore
import { useFormState } from "react-dom";
import { CheckCircle2, AlertCircle, TrendingUp, Zap, ShieldCheck } from "lucide-react";
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
                <div className="bg-green-50 border-2 border-black p-12 shadow-neo flex flex-col items-center">
                    <div className="mb-8 w-64 h-64 relative bg-white border-2 border-black p-2 shadow-neo-sm rotate-1">
                        <img src="/submitted-review.png" alt="Submitted for Review" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-4xl font-black mb-4">Listing Submitted!</h1>
                    <p className="text-xl text-gray-600 mb-8 font-bold leading-relaxed">
                        Your asset has been submitted for review. Our team will verify your data and proofs shortly.
                    </p>
                    <Link href="/">
                        <Button size="lg" className="h-16 px-12 text-xl shadow-neo">Back to Marketplace</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Sell Your Asset</h1>
                <p className="text-xl text-gray-600 font-bold">List your business in minutes. Get in front of 20,000+ buyers.</p>
            </div>

            <form action={formAction} className="bg-white border-4 border-black p-8 md:p-12 shadow-neo space-y-12">

                {state?.error && (
                    <div className="p-4 bg-red-50 border-2 border-black flex gap-3 items-center shadow-neo-sm">
                        <AlertCircle className="text-red-600 shrink-0" size={24} />
                        <p className="text-sm font-black uppercase text-red-700">{state.error}</p>
                    </div>
                )}

                {/* Section 1: Basics */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-black border-b-4 border-black pb-2 uppercase tracking-tight">1. The Basics</h3>

                    <div>
                        <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Project Name</label>
                        <input
                            name="title"
                            required
                            type="text"
                            placeholder="e.g. Acme SaaS"
                            className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Type</label>
                            <select name="type" className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors appearance-none">
                                <option value="SaaS">SaaS</option>
                                <option value="Newsletter">Newsletter</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Community">Community</option>
                                <option value="Micro-SaaS">Micro-SaaS</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Asking Price ($)</label>
                            <input
                                name="price"
                                required
                                type="number"
                                min="0"
                                placeholder="50000"
                                className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">One-Line Pitch</label>
                        <input
                            name="short_description"
                            required
                            type="text"
                            maxLength={120}
                            placeholder="e.g. AI-powered design tool for social media posts."
                            className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                        />
                        <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest text-right">Max 120 characters</p>
                    </div>
                </div>

                {/* Section 2: Details */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-black border-b-4 border-black pb-2 uppercase tracking-tight">2. The Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Monthly Revenue ($)</label>
                            <input
                                name="revenue"
                                required
                                type="number"
                                min="0"
                                placeholder="1200"
                                className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Customers / Subscribers</label>
                            <input
                                name="customers"
                                required
                                type="number"
                                min="0"
                                placeholder="150"
                                className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Date Founded</label>
                        <input
                            name="founded_date"
                            required
                            type="date"
                            className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Full Description</label>
                        <textarea
                            name="description"
                            required
                            rows={6}
                            placeholder="Tell us the story. What is the product? How does it make money? Why are you selling?"
                            className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase mb-2 tracking-widest text-gray-500">Tech Stack</label>
                        <input
                            name="tech_stack"
                            required
                            type="text"
                            placeholder="Next.js, Supabase, Stripe (comma separated)"
                            className="w-full border-2 border-black p-4 font-bold bg-white focus:outline-none focus:bg-blue-50 transition-colors"
                        />
                    </div>
                </div>

                {/* Section 3: Proofs */}
                <div className="space-y-8">
                    <div className="border-b-4 border-black pb-2">
                        <h3 className="text-2xl font-black uppercase tracking-tight">3. Verification Proofs (Optional)</h3>
                        <p className="text-sm text-gray-500 font-bold mt-1">Upload screenshots to build trust. These are only visible after NDA signature.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Revenue Proof */}
                        <div className="border-2 border-black p-6 bg-blue-50 shadow-neo-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp size={20} className="text-blue-600" />
                                <label className="text-xs font-black uppercase tracking-widest">Revenue Proof</label>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <select name="revenue_source" className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none">
                                        <option value="">Select Source</option>
                                        <option value="Stripe">Stripe</option>
                                        <option value="PayPal">PayPal</option>
                                        <option value="Razorpay">Razorpay</option>
                                        <option value="LemonSqueezy">LemonSqueezy</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input
                                        name="revenue_file"
                                        type="file"
                                        accept="image/*,.pdf"
                                        className="w-full border-2 border-dashed border-black p-2 text-[10px] font-black uppercase bg-white file:mr-4 file:py-1 file:px-3 file:border-2 file:border-black file:text-[10px] file:font-black file:bg-amber-400 file:cursor-pointer"
                                    />
                                </div>
                                <input
                                    name="revenue_notes"
                                    placeholder="Brief explanation of the revenue data..."
                                    className="w-full border-2 border-black p-3 text-sm font-bold focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Traffic Proof */}
                        <div className="border-2 border-black p-6 bg-green-50 shadow-neo-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap size={20} className="text-green-600" />
                                <label className="text-xs font-black uppercase tracking-widest">Traffic / Usage Proof</label>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <select name="traffic_source" className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none">
                                        <option value="">Select Source</option>
                                        <option value="Google Analytics">Google Analytics</option>
                                        <option value="Plausible">Plausible</option>
                                        <option value="Search Console">Search Console</option>
                                        <option value="Newsletter Tool">Newsletter Tool</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input
                                        name="traffic_file"
                                        type="file"
                                        accept="image/*,.pdf"
                                        className="w-full border-2 border-dashed border-black p-2 text-[10px] font-black uppercase bg-white file:mr-4 file:py-1 file:px-3 file:border-2 file:border-black file:text-[10px] file:font-black file:bg-amber-400 file:cursor-pointer"
                                    />
                                </div>
                                <input
                                    name="traffic_notes"
                                    placeholder="Brief explanation of the traffic data..."
                                    className="w-full border-2 border-black p-3 text-sm font-bold focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Ownership Proof */}
                        <div className="border-2 border-black p-6 bg-orange-50 shadow-neo-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck size={20} className="text-orange-600" />
                                <label className="text-xs font-black uppercase tracking-widest">Ownership Proof</label>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <select name="ownership_source" className="w-full border-2 border-black p-3 font-bold bg-white focus:outline-none">
                                        <option value="">Select Source</option>
                                        <option value="Domain Registrar">Domain Registrar</option>
                                        <option value="GitHub/Repo">GitHub/Repo</option>
                                        <option value="AWS/Hosting">AWS/Hosting</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <input
                                        name="ownership_file"
                                        type="file"
                                        accept="image/*,.pdf"
                                        className="w-full border-2 border-dashed border-black p-2 text-[10px] font-black uppercase bg-white file:mr-4 file:py-1 file:px-3 file:border-2 file:border-black file:text-[10px] file:font-black file:bg-amber-400 file:cursor-pointer"
                                    />
                                </div>
                                <input
                                    name="ownership_notes"
                                    placeholder="Brief explanation (e.g. Domain registered at Namecheap)"
                                    className="w-full border-2 border-black p-3 text-sm font-bold focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col items-center border-t-4 border-black">
                    <Button className="w-full text-2xl h-20 font-black uppercase shadow-neo hover:translate-x-1 hover:-translate-y-1 transition-all" type="submit">
                        Submit Listing for Review
                    </Button>
                    <p className="mt-6 text-center text-xs text-gray-400 font-bold uppercase tracking-widest max-w-sm">
                        By submitting, you agree to our terms. Proofs will be stored securely and only shown to verified buyers.
                    </p>
                </div>
            </form>
        </div>
    );
}
