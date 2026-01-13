"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendMessage({
    listingId,
    conversationId,
    messageText
}: {
    listingId?: string,
    conversationId?: string,
    messageText: string
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    let finalConversationId = conversationId;

    // Logic for initializing a conversation if ID not provided (Buyer flow)
    if (!finalConversationId) {
        if (!listingId) return { error: "Listing ID required to start new conversation" };

        // Check if conversation already exists
        const { data: existing } = await supabase
            .from("conversations")
            .select("id")
            .eq("listing_id", listingId)
            .eq("buyer_id", user.id)
            .single();

        if (existing) {
            finalConversationId = existing.id;
        } else {
            // Verify NDA
            const { data: nda } = await supabase
                .from("nda_acceptances")
                .select("id")
                .eq("listing_id", listingId)
                .eq("user_id", user.id)
                .single();

            if (!nda) return { error: "You must sign the NDA first." };

            // Get seller ID
            const { data: listing } = await supabase
                .from("listings")
                .select("user_id")
                .eq("id", listingId)
                .single();

            if (!listing) return { error: "Listing not found" };
            if (listing.user_id === user.id) return { error: "Cannot message yourself" };

            // Create conversation
            const { data: newConv, error: createError } = await supabase
                .from("conversations")
                .insert({
                    listing_id: listingId,
                    buyer_id: user.id,
                    seller_id: listing.user_id
                })
                .select("id")
                .single();

            if (createError) return { error: createError.message };
            finalConversationId = newConv.id;
        }
    }

    // Insert message
    if (!finalConversationId) return { error: "Failed to resolve conversation" };

    const { error: msgError } = await supabase
        .from("messages")
        .insert({
            conversation_id: finalConversationId,
            sender_id: user.id,
            message_text: messageText
        });

    if (msgError) return { error: msgError.message };

    revalidatePath("/profile");
    revalidatePath(`/messages/${finalConversationId}`);
    return { success: true, conversationId: finalConversationId };
}

export async function getOrCreateConversation(listingId: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    // Check existing
    const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("listing_id", listingId)
        .eq("buyer_id", user.id)
        .single();

    if (existing) return { success: true, conversationId: existing.id };

    const { data: nda } = await supabase
        .from("nda_acceptances")
        .select("id")
        .eq("listing_id", listingId)
        .eq("user_id", user.id)
        .single();

    if (!nda) return { error: "You must sign the NDA first." };

    const { data: listing } = await supabase
        .from("listings")
        .select("user_id")
        .eq("id", listingId)
        .single();

    if (!listing) return { error: "Listing not found" };
    if (listing.user_id === user.id) return { error: "Cannot chat with yourself" };

    const { data: newConv, error: createError } = await supabase
        .from("conversations")
        .insert({
            listing_id: listingId,
            buyer_id: user.id,
            seller_id: listing.user_id
        })
        .select("id")
        .single();

    if (createError) return { error: createError.message };
    return { success: true, conversationId: newConv.id };
}
