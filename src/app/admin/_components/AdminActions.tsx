"use client";

import { Button } from "@/components/ui/Button";
import { approveListing, rejectListing } from "@/app/actions/admin";
import { useState } from "react";
import { Check, X } from "lucide-react";

export function AdminActions({ listingId }: { listingId: string }) {
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        if (!confirm("Approve this listing to go live?")) return;
        setLoading(true);
        await approveListing(listingId);
        setLoading(false);
    };

    const handleReject = async () => {
        if (!confirm("Reject this listing?")) return;
        setLoading(true);
        await rejectListing(listingId);
        setLoading(false);
    };

    return (
        <div className="flex gap-2">
            <Button
                disabled={loading}
                onClick={handleApprove}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white border-green-800"
            >
                <Check size={16} className="mr-1" /> Approve
            </Button>

            <Button
                disabled={loading}
                onClick={handleReject}
                size="sm"
                variant="outline"
                className="hover:bg-red-50 text-red-600 border-red-200 hover:border-red-600"
            >
                <X size={16} className="mr-1" /> Reject
            </Button>
        </div>
    );
}
