"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBlog(id: string, prevState: any, formData: FormData) {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthorized" };

    // Manual check for simplicity 
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string;
    const cover_image = formData.get("cover_image") as string;

    if (!title || title.length < 5) return { error: "Title too short" };

    const { error } = await supabase
        .from('blogs')
        .update({
            title, slug, excerpt, content, status, cover_image,
            updated_at: new Date().toISOString()
        })
        .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true };
}
