"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { OfferStatus } from "@/types/database";

export async function createOffer(listingId: string, amount: number, message?: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    if (amount <= 0) return { error: "Amount must be positive" };

    // Check NDA
    const { data: nda } = await supabase
        .from("nda_acceptances")
        .select("id")
        .eq("listing_id", listingId)
        .eq("user_id", user.id)
        .single();
    if (!nda) return { error: "You must sign the NDA to make an offer." };

    // Get seller
    const { data: listing } = await supabase
        .from("listings")
        .select("user_id")
        .eq("id", listingId)
        .single();
    if (!listing) return { error: "Listing not found" };
    if (listing.user_id === user.id) return { error: "Cannot offer on your own listing" };

    const { error } = await supabase.from("offers").insert({
        listing_id: listingId,
        buyer_id: user.id,
        seller_id: listing.user_id,
        amount,
        message,
        status: 'sent'
    });

    if (error) return { error: error.message };

    revalidatePath(`/listings/${listingId}`);
    revalidatePath("/profile");
    return { success: true };
}

export async function updateOfferStatus(offerId: string, status: OfferStatus) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    // Fetch offer to validate permissions
    const { data: offer } = await supabase
        .from("offers")
        .select("*")
        .eq("id", offerId)
        .single();

    if (!offer) return { error: "Offer not found" };

    // Logic: 
    // Seller can: accept, reject, counter (if counter logic is status change? Usually counter implies new price, so maybe complex. The spec says simple status change for now, or counter action.)
    // Spec: "Seller actions: Accept, Counter, Reject".
    // If Counter involves changing price, it might be a new offer or update 'amount' + status='countered'.
    // For simplicity: status 'countered' might require a new negotiation.
    // Let's assume 'status' update for now. 

    const isSeller = offer.seller_id === user.id;
    const isBuyer = offer.buyer_id === user.id;

    if (!isSeller && !isBuyer) return { error: "Unauthorized" };

    // Rules
    if (status === 'accepted' || status === 'rejected') {
        if (!isSeller) return { error: "Only seller can accept/reject" };
    }
    if (status === 'withdrawn') {
        if (!isBuyer) return { error: "Only buyer can withdraw" };
    }

    // Counter? 
    // Usually counter means seller proposes new price. 
    // If status is 'countered', maybe we expect a new offer from seller? 
    // Or we update this offer? 
    // The prompt says "Offers: Status (sent, countered...)". 
    // If I just set status to countered, nothing happens.
    // Let's just handle status updates here.

    const { error } = await supabase
        .from("offers")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", offerId);

    if (error) return { error: error.message };

    revalidatePath("/profile");
    return { success: true };
}
