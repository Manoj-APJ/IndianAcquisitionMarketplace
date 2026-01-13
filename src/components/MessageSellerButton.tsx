"use client";
import { Button } from "@/components/ui/Button";
import { getOrCreateConversation } from "@/app/actions/chat";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function MessageSellerButton({ listingId }: { listingId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleMessage = async () => {
        setLoading(true);
        const res = await getOrCreateConversation(listingId);
        if (res.success && res.conversationId) {
            router.push(`/messages/${res.conversationId}`);
        } else {
            alert(res.error || "Failed to start conversation");
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleMessage} disabled={loading} className="w-full text-lg h-16 mb-4 uppercase font-black shadow-neo border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-all">
            <MessageCircle size={20} className="mr-2" /> Message Seller
        </Button>
    );
}
