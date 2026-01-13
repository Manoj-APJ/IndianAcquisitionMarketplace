import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Cache for 60 seconds

export default async function BlogPage() {
    const supabase = createClient();

    const { data: blogs } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-20 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6">MarketX Blog</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Insights on buying, selling, and growing digital businesses.
                    </p>
                </div>

                {blogs && blogs.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-12">
                        {blogs.map((post: BlogPost) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
                                <div className="border-2 border-black bg-white h-full transition-all group-hover:-translate-y-1 group-hover:shadow-neo">
                                    {post.cover_image && (
                                        <div className="h-64 border-b-2 border-black overflow-hidden relative">
                                            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        </div>
                                    )}
                                    <div className="p-8">
                                        <h2 className="text-3xl font-black mb-4 group-hover:text-blue-900 group-hover:underline">{post.title}</h2>
                                        <p className="text-gray-600 font-medium mb-4 line-clamp-3">{post.excerpt}</p>
                                        <span className="text-sm font-bold text-gray-400 uppercase">
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 border-2 border-black">
                        <p className="text-xl font-bold text-gray-500">No posts published yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
