"use client";
import { Button } from "@/components/ui/Button";
import { updateOfferStatus } from "@/app/actions/offers";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
        <div className="flex gap-2 flex-wrap">
            {isSeller ? (
                <>
                    <Button
                        size="sm"
                        onClick={() => handleUpdate('accepted')}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                        Accept
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => handleUpdate('rejected')}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Reject
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleChat}
                        disabled={loading}
                        variant="outline"
                        className="rounded-lg border-gray-200"
                    >
                        Counter
                    </Button>
                </>
            ) : (
                <Button
                    size="sm"
                    onClick={() => handleUpdate('withdrawn')}
                    disabled={loading}
                    variant="outline"
                    className="rounded-lg border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                    Withdraw
                </Button>
            )}
        </div>
    );
}
