"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Manual Validation helpers
function validateBlogData(data: any) {
    const errors: string[] = [];
    if (!data.title || data.title.length < 5) errors.push("Title must be at least 5 characters.");
    if (!data.slug || data.slug.length < 5 || !/^[a-z0-9-]+$/.test(data.slug)) errors.push("Slug must be lowercase alphanumeric with dashes (min 5 chars).");
    if (!data.excerpt || data.excerpt.length < 10) errors.push("Excerpt must be at least 10 characters.");
    if (!data.content || data.content.length < 50) errors.push("Content must be at least 50 characters.");
    if (data.status !== "draft" && data.status !== "published") errors.push("Invalid status.");
    return errors;
}

export async function createBlog(prevState: any, formData: FormData) {
    const supabase = createClient();

    // 1. Auth & Admin Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    const rawData = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        excerpt: formData.get("excerpt") as string,
        content: formData.get("content") as string,
        cover_image: formData.get("cover_image") as string,
        status: formData.get("status") as string,
    };

    const validationErrors = validateBlogData(rawData);
    if (validationErrors.length > 0) {
        return { error: validationErrors.join(" ") };
    }

    const { error } = await supabase.from("blogs").insert({
        ...rawData,
        author_id: user.id
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blogs");
    return { success: true };
}

export async function deleteBlog(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) return { error: error.message };

    revalidatePath("/blog");
    revalidatePath("/admin/blogs");
    return { success: true };
}
