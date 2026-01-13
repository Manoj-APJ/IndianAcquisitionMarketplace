"use client";

import { updateBlog } from "@/app/actions/blog-update";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface EditFormProps {
    blog: any;
}

export function EditBlogForm({ blog }: EditFormProps) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        const formData = new FormData(event.currentTarget);

        const result = await updateBlog(blog.id, null, formData);

        if (result?.error) {
            alert(result.error);
            setIsPending(false);
        } else {
            router.push("/admin/blogs");
            router.refresh();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 border-2 border-black shadow-neo">
            <div>
                <label className="block text-sm font-bold uppercase mb-2">Title</label>
                <input
                    name="title"
                    defaultValue={blog.title}
                    required
                    className="w-full border-2 border-black p-3 font-medium focus:ring-4 ring-blue-500/20 outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold uppercase mb-2">Slug</label>
                    <input
                        name="slug"
                        defaultValue={blog.slug}
                        required
                        className="w-full border-2 border-black p-3 font-medium focus:ring-4 ring-blue-500/20 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold uppercase mb-2">Status</label>
                    <select
                        name="status"
                        defaultValue={blog.status}
                        className="w-full border-2 border-black p-3 font-medium bg-white focus:ring-4 ring-blue-500/20 outline-none transition-all"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold uppercase mb-2">Cover Image URL</label>
                <input
                    name="cover_image"
                    defaultValue={blog.cover_image}
                    placeholder="https://..."
                    className="w-full border-2 border-black p-3 font-medium focus:ring-4 ring-blue-500/20 outline-none transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-bold uppercase mb-2">Excerpt</label>
                <textarea
                    name="excerpt"
                    defaultValue={blog.excerpt}
                    required
                    rows={3}
                    className="w-full border-2 border-black p-3 font-medium focus:ring-4 ring-blue-500/20 outline-none transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-bold uppercase mb-2">Content (Markdown)</label>
                <textarea
                    name="content"
                    defaultValue={blog.content}
                    required
                    rows={12}
                    className="w-full border-2 border-black p-3 font-medium font-mono text-sm focus:ring-4 ring-blue-500/20 outline-none transition-all"
                />
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : "Update Post"}
            </Button>
        </form>
    );
}
