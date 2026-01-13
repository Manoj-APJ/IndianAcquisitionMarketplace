"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(listingId: string, isFavorite: boolean) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Unauthorized" };

    if (isFavorite) {
        // Remove favorite
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('listing_id', listingId);

        if (error) return { error: error.message };
    } else {
        // Add favorite
        const { error } = await supabase
            .from('favorites')
            .insert({ user_id: user.id, listing_id: listingId });

        if (error) return { error: error.message };
    }

    revalidatePath('/listings');
    revalidatePath(`/listings/${listingId}`);
    revalidatePath('/profile');
    return { success: true };
}

export async function getFavoriteIds() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
        .from('favorites')
        .select('listing_id')
        .eq('user_id', user.id);

    return data?.map(f => f.listing_id) || [];
}
