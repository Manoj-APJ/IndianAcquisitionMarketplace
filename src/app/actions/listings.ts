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

    const title = formData.get("title") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;

    // Basic validation
    if (!title || !price || !description) {
        return { error: "Please fill in all required fields." };
    }

    const rawData = {
        title: title,
        listing_type: formData.get("type") as string,
        price: price,
        monthly_revenue: Number(formData.get("revenue")),
        short_description: formData.get("short_description") as string,
        description: description,
        tech_stack: (formData.get("tech_stack") as string).split(',').map(s => s.trim()).filter(Boolean),
        founded_date: formData.get("founded_date") as string, // YYYY-MM-DD
        customers_count: Number(formData.get("customers") || 0),
        status: 'submitted',
    };

    const { data: listing, error: listingError } = await supabase
        .from("listings")
        .insert({
            user_id: user.id,
            ...rawData
        })
        .select()
        .single();

    if (listingError) {
        console.error("Submission Error:", listingError);
        return { error: listingError.message };
    }

    // Handle Proofs
    const proofCategories = [
        { key: 'revenue', type: 'revenue' },
        { key: 'traffic', type: 'traffic' },
        { key: 'ownership', type: 'ownership' }
    ];

    for (const cat of proofCategories) {
        const file = formData.get(`${cat.key}_file`) as File;
        const source = formData.get(`${cat.key}_source`) as string;
        const notes = formData.get(`${cat.key}_notes`) as string;

        if (file && file.size > 0) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${cat.type}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${listing.id}/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('proofs')
                .upload(filePath, file);

            if (!uploadError) {
                // Link to listing_proofs table
                await supabase
                    .from('listing_proofs')
                    .insert({
                        listing_id: listing.id,
                        uploaded_by: user.id,
                        proof_type: cat.type,
                        source: source || 'Other',
                        file_url: filePath,
                        notes: notes || null
                    });
            } else {
                console.error(`Error uploading ${cat.type} proof:`, uploadError);
            }
        }
    }

    revalidatePath("/");
    return { success: true };
}
