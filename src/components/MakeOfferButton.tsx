"use client";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { createOffer } from "@/app/actions/offers";
import { useState } from "react";
import { DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export function MakeOfferButton({ listingId, askingPrice }: { listingId: string, askingPrice: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState(askingPrice);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await createOffer(listingId, Number(amount), message);
        setLoading(false);
        if (res.success) {
            setIsOpen(false);
            router.refresh();
            alert("Offer sent successfully!");
        } else {
            alert(res.error || "Failed to send offer");
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="w-full text-lg h-16 mb-4 uppercase font-black bg-white text-black border-2 border-black hover:bg-gray-50 shadow-neo transition-all">
                <DollarSign size={20} className="mr-2" /> Make an Offer
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Make an Offer">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Offer Amount (USD)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-blue-100"
                            min={1}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase mb-1">Message (Optional)</label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="w-full border-2 border-black p-3 font-medium h-32 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            placeholder="I'm interested in acquiring this business because..."
                        />
                    </div>
                    <div className="pt-4 flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1 border-2 border-black font-bold">Cancel</Button>
                        <Button type="submit" disabled={loading} className="flex-1 border-2 border-black font-bold shadow-neo-sm">
                            {loading ? "Sending..." : "Submit Offer"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
