"use client";

import { Button } from "@/components/ui/Button";
import { submitListing } from "@/app/actions/listings";
// @ts-ignore
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Shield, Sparkles, DollarSign, Lock, Zap, TrendingUp, Globe, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const initialState = {
    error: null,
    success: false
};

export function SellForm() {
    const [state, formAction] = useFormState(submitListing as any, initialState);

    useEffect(() => {
        if (state?.success) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [state?.success]);

    if (state?.success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6">
                <div className="max-w-xs w-full text-center bg-white p-8 rounded-[32px] shadow-soft-xl border border-gray-100 animate-reveal">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                        <CheckCircle2 size={32} className="text-emerald-600" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Listing Sent!</h1>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        We've received your business details. It will be live after a quick review.
                    </p>
                    <div className="space-y-3">
                        <Link href="/listings">
                            <Button className="w-full h-11 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-all shadow-lg">
                                Go to Marketplace
                            </Button>
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full text-xs font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-widest transition-colors py-2"
                        >
                            List another business
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-2xl mx-auto px-4 pt-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">List your business</h1>
                    <p className="text-gray-500 text-lg">
                        Reach serious buyers. Direct deals, no brokers.
                    </p>
                </div>

                <form action={formAction} className="space-y-10">
                    {state?.error && (
                        <div className="p-4 bg-red-50 rounded-xl flex gap-3 items-center border border-red-100 animate-shake">
                            <AlertCircle className="text-red-600 shrink-0" size={20} />
                            <p className="text-sm font-medium text-red-800">{state.error}</p>
                        </div>
                    )}

                    {/* Section 1 */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">The Basics</h2>

                        <div className="grid grid-cols-1 gap-6">
                            <FormField label="Business Name">
                                <input
                                    name="title"
                                    required
                                    placeholder="e.g. Acme SaaS"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                            </FormField>

                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Business Type">
                                    <select
                                        name="type"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium appearance-none"
                                    >
                                        <option value="SaaS">SaaS Platform</option>
                                        <option value="Newsletter">Newsletter</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="Community">Community</option>
                                        <option value="Other">Other Digital Asset</option>
                                    </select>
                                </FormField>

                                <FormField label="Asking Price ($)">
                                    <input
                                        name="price"
                                        required
                                        type="number"
                                        placeholder="Asking Price"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </FormField>
                            </div>

                            <FormField label="One-sentence Pitch">
                                <input
                                    name="short_description"
                                    required
                                    maxLength={120}
                                    placeholder="What does your business do in a few words?"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                            </FormField>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Financials & Details</h2>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField label="Monthly Profit ($)">
                                    <input
                                        name="revenue"
                                        required
                                        type="number"
                                        placeholder="Monthly Average"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </FormField>
                                <FormField label="Total Customers">
                                    <input
                                        name="customers"
                                        required
                                        type="number"
                                        placeholder="User Count"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </FormField>
                            </div>

                            <FormField label="Founded Date">
                                <input
                                    name="founded_date"
                                    required
                                    type="date"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                            </FormField>

                            <FormField label="Tech Stack">
                                <input
                                    name="tech_stack"
                                    required
                                    placeholder="e.g. React, Node.js, Supabase"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                />
                                <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Separate with commas</p>
                            </FormField>

                            <FormField label="Full Description">
                                <textarea
                                    name="description"
                                    required
                                    rows={5}
                                    placeholder="Explain how the business works, its history, and performance."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium resize-none"
                                />
                            </FormField>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Verification</h2>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                                <Lock size={12} /> NDA PROTECTED
                            </div>
                        </div>

                        <div className="space-y-4">
                            <ProofUploadMinimal
                                icon={<TrendingUp size={18} />}
                                label="Financial Proof"
                                sourceField="revenue_source"
                                fileField="revenue_file"
                                notesField="revenue_notes"
                                options={["Stripe", "PayPal", "Bank Statement", "Other"]}
                            />
                            <ProofUploadMinimal
                                icon={<Globe size={18} />}
                                label="Traffic Stats"
                                sourceField="traffic_source"
                                fileField="traffic_file"
                                notesField="traffic_notes"
                                options={["Google Analytics", "Plausible", "Other"]}
                            />
                            <ProofUploadMinimal
                                icon={<Shield size={18} />}
                                label="Ownership"
                                sourceField="ownership_source"
                                fileField="ownership_file"
                                notesField="ownership_notes"
                                options={["DNS Record", "Admin Screenshot", "Other"]}
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <SubmitButton />
                        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-[2px]">
                            Secure NDA Submission
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            type="submit"
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                </>
            ) : (
                "Review & Submit Listing"
            )}
        </Button>
    );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
                {label}
            </label>
            {children}
        </div>
    );
}

function ProofUploadMinimal({ icon, label, sourceField, fileField, notesField, options }: any) {
    return (
        <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50">
            <div className="flex items-center gap-2 mb-4">
                <div className="text-emerald-600 font-bold">{icon}</div>
                <span className="text-sm font-bold text-gray-900">{label}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
                <select
                    name={sourceField}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-emerald-500"
                >
                    <option value="">Select source</option>
                    {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
                </select>
                <input
                    name={fileField}
                    type="file"
                    className="text-[10px] font-bold uppercase file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-200 file:text-gray-700 cursor-pointer text-gray-400 tracking-wider"
                />
            </div>
            <input
                name={notesField}
                placeholder="Optional notes..."
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-emerald-500"
            />
        </div>
    );
}
