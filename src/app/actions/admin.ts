"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function approveListing(listingId: string) {
    const supabase = createClient();

    // 1. Verify Admin (Double check on server side logic, though RLS handles data access)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: "Unauthorized: Admin access required." };
    }

    // 2. Perform Update
    const { error } = await supabase
        .from('listings')
        .update({ status: 'live' }) // Logic: Approved immediately becomes Live for now, or 'approved' if distinct step
        .eq('id', listingId);

    if (error) return { error: error.message };

    // 3. Audit Log (Best practice for admin actions)
    // In a real app, insert into audit_logs here.

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
}

export async function rejectListing(listingId: string) {
    const supabase = createClient();

    // 1. Verify Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: "Unauthorized" };
    }

    // 2. Perform Update
    const { error } = await supabase
        .from('listings')
        .update({ status: 'rejected' })
        .eq('id', listingId);

    if (error) return { error: error.message };

    revalidatePath("/admin");
    return { success: true };
}
