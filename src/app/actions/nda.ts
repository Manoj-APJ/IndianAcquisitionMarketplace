"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function signNDA(listingId: string) {
    const supabase = createClient();

    // 1. Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "You must be logged in to sign an NDA." };

    // 2. Metadata (Audit)
    // In Next.js server actions, we need to extract headers carefully
    const headersList = headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // 3. Insert Record
    const { error } = await supabase
        .from("nda_acceptances")
        .insert({
            user_id: user.id,
            listing_id: listingId,
            ip_address: ip,
            user_agent: userAgent
        });

    if (error) {
        if (error.code === '23505') { // Unique violation
            return { success: true, message: "Already signed." };
        }
        return { error: error.message };
    }

    revalidatePath(`/listings/${listingId}`);
    return { success: true };
}

export async function checkNDAStatus(listingId: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
        .from("nda_acceptances")
        .select("id")
        .eq("user_id", user.id)
        .eq("listing_id", listingId)
        .single();

    return !!data;
}
