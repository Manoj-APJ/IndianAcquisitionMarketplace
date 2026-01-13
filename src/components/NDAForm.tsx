"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { signNDA } from "@/app/actions/nda";
import { useRouter } from "next/navigation";
import { Lock, FileText, CheckCircle2 } from "lucide-react";

export function NDAForm({ listingId }: { listingId: string }) {
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSign = async () => {
        if (!agreed) return;
        setLoading(true);
        const result = await signNDA(listingId);
        if (result.error) {
            alert(result.error);
        } else {
            router.refresh(); // Refresh to unlock data
        }
        setLoading(false);
    };

    return (
        <div className="bg-gray-50 border-2 border-black p-6 md:p-8 shadow-neo max-w-2xl mx-auto my-8">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-black/10 pb-4">
                <div className="bg-black text-white p-2">
                    <Lock size={20} />
                </div>
                <h3 className="text-xl font-black">Private Deal Room Access</h3>
            </div>

            <div className="prose prose-sm font-medium text-gray-600 mb-8 bg-white border border-gray-200 p-4 h-48 overflow-y-auto">
                <h4 className="flex items-center gap-2 mb-2"><FileText size={14} /> Non-Disclosure Agreement</h4>
                <p>
                    By accessing the detailed information for this listing, you agree to:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Keep all disclosed proprietary information confidential.</li>
                    <li>Not contact the seller's customers, employees, or suppliers directly without permission.</li>
                    <li>Use the information solely for the purpose of evaluating a potential acquisition.</li>
                    <li>Destroy or return all confidential information if the transaction does not proceed.</li>
                </ul>
                <p className="mt-4 text-xs text-gray-400">
                    This is a binding legal agreement recorded for audit purposes.
                    Agreement ID: {listingId}
                </p>
            </div>

            <div className="flex items-start gap-3 mb-6">
                <input
                    type="checkbox"
                    id="nda-agree"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 border-2 border-black rounded-none cursor-pointer"
                />
                <label htmlFor="nda-agree" className="text-sm font-bold cursor-pointer select-none">
                    I have read and agree to the Non-Disclosure Agreement. I understand my access will be logged.
                </label>
            </div>

            <Button
                onClick={handleSign}
                disabled={!agreed || loading}
                className="w-full h-12 text-lg"
            >
                {loading ? "Verifying..." : "Accept & Unlock Data"}
            </Button>

            <p className="text-center text-xs text-gray-400 font-bold mt-4 flex items-center justify-center gap-1">
                <Lock size={12} /> Secure, Audit-Ready Access
            </p>
        </div>
    );
}

export function NDAStatus({ date }: { date: string }) {
    return (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2 text-xs font-bold rounded-sm mb-4">
            <CheckCircle2 size={14} />
            NDA Accepted on {new Date(date).toLocaleDateString()}
        </div>
    );
}
