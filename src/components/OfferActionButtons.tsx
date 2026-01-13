"use client";
import { Button } from "@/components/ui/Button";
import { updateOfferStatus } from "@/app/actions/offers";
// import { Offer } from "@/types/database"; // Avoiding import issues if types not perfectly aligned in client
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getOrCreateConversation } from "@/app/actions/chat";

export function OfferActionButtons({ offer, isSeller }: { offer: any, isSeller: boolean }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (status: any) => {
        if (!confirm(`Are you sure you want to ${status} this offer?`)) return;
        setLoading(true);
        const res = await updateOfferStatus(offer.id, status);
        if (res.error) alert(res.error);
        setLoading(false);
        router.refresh();
    };

    const handleChat = async () => {
        setLoading(true);
        const res = await getOrCreateConversation(offer.listing_id);
        if (res.success && res.conversationId) {
            router.push(`/messages/${res.conversationId}`);
        }
        setLoading(false);
    }

    if (offer.status === 'accepted' || offer.status === 'rejected' || offer.status === 'withdrawn') {
        return null;
    }

    return (
        <div className="flex gap-2 mt-2">
            {isSeller ? (
                <>
                    <Button size="sm" onClick={() => handleUpdate('accepted')} disabled={loading} className="bg-green-500 hover:bg-green-600 text-white border-2 border-black font-bold shadow-neo-sm">Accept</Button>
                    <Button size="sm" onClick={() => handleUpdate('rejected')} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white border-2 border-black font-bold shadow-neo-sm">Reject</Button>
                    <Button size="sm" onClick={handleChat} disabled={loading} variant="outline" className="border-2 border-black font-bold shadow-neo-sm">Counter (Chat)</Button>
                </>
            ) : (
                <Button size="sm" onClick={() => handleUpdate('withdrawn')} disabled={loading} variant="outline" className="border-2 border-black font-bold shadow-neo-sm hover:bg-red-50 hover:text-red-600 hover:border-red-600">Withdraw</Button>
            )}
        </div>
    );
}
