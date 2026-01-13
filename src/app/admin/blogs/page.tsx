import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, ArrowLeft, Trash2, Edit } from "lucide-react";

export const revalidate = 0;

export default async function AdminBlogPage() {
    const supabase = createClient();

    // Verify Admin
    // (In a real app, middleware handles this, but explicit checks are good)

    const { data: blogs } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="outline" size="sm"><ArrowLeft size={16} /></Button>
                    </Link>
                    <h1 className="text-3xl font-black">Blog Manager</h1>
                </div>
                <Link href="/admin/blogs/new">
                    <Button className="flex items-center gap-2"><Plus size={16} /> New Post</Button>
                </Link>
            </div>

            <div className="bg-white border-2 border-black shadow-neo overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="p-4 font-bold uppercase text-sm">Title</th>
                            <th className="p-4 font-bold uppercase text-sm">Status</th>
                            <th className="p-4 font-bold uppercase text-sm">Date</th>
                            <th className="p-4 font-bold uppercase text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {blogs?.map((blog) => (
                            <tr key={blog.id} className="hover:bg-gray-50">
                                <td className="p-4 font-bold">{blog.title}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-black uppercase border-2 ${blog.status === 'published'
                                        ? 'bg-green-100 text-green-800 border-green-600'
                                        : 'bg-gray-100 text-gray-800 border-gray-400'
                                        }`}>
                                        {blog.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/blogs/edit/${blog.id}`}>
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-black"><Edit size={14} /></Button>
                                        </Link>
                                        {/* We would add a delete action here linked to the server action */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!blogs || blogs.length === 0) && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500 font-bold">
                                    No blog posts found. Create your first one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
