"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateListingInput } from "@/types/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitListing(prevState: any, formData: FormData) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "You must be logged in to list an asset." };
    }

    const rawData = {
        title: formData.get("title") as string,
        listing_type: formData.get("type") as string,
        price: Number(formData.get("price")),
        monthly_revenue: Number(formData.get("revenue")),
        short_description: formData.get("short_description") as string,
        description: formData.get("description") as string,
        tech_stack: (formData.get("tech_stack") as string).split(',').map(s => s.trim()).filter(Boolean),
        founded_date: formData.get("founded_date") as string, // YYYY-MM-DD
        customers_count: Number(formData.get("customers") || 0),
        status: 'submitted', // Must be submitted (or draft) to pass RLS
    };

    // Basic validation
    if (!rawData.title || !rawData.price || !rawData.description) {
        return { error: "Please fill in all required fields." };
    }

    const { error } = await supabase
        .from("listings")
        .insert({
            user_id: user.id,
            ...rawData
        });

    if (error) {
        console.error("Submission Error:", error);
        return { error: error.message }; // Will catch RLS errors if user tries to spoof status
    }

    revalidatePath("/");
    return { success: true };
}
