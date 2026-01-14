import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Cache for 60 seconds

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = createClient();
    const currentCategory = typeof searchParams.category === 'string' ? searchParams.category : 'All';

    let query = supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published');

    if (currentCategory !== 'All') {
        query = query.eq('category', currentCategory);
    }

    const { data: blogs } = await query.order('published_at', { ascending: false });

    const categories = ['All', 'Valuation', 'Acquisition', 'Growth', 'Case Study', 'Market Trends'];

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-20 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">AcquireX <span className="text-emerald-600">Blog</span></h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Insights on buying, selling, and growing digital businesses.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={cat === 'All' ? '/blog' : `/blog?category=${cat}`}
                            className={`px-6 py-2 border-2 border-black font-bold uppercase tracking-wider transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo ${currentCategory === cat ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {blogs && blogs.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-12">
                        {blogs.map((post: BlogPost) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
                                <div className="border-2 border-black bg-white h-full transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-neo overflow-hidden flex flex-col">
                                    {post.cover_image && (
                                        <div className="h-64 border-b-2 border-black overflow-hidden relative">
                                            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-tighter">
                                                    {post.category || 'Opinion'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-8 flex-1">
                                        {!post.cover_image && (
                                            <div className="mb-4">
                                                <span className="border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-tighter">
                                                    {post.category || 'Opinion'}
                                                </span>
                                            </div>
                                        )}
                                        <h2 className="text-3xl font-black mb-4 group-hover:underline leading-tight">{post.title}</h2>
                                        <p className="text-gray-600 font-medium mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                        <div className="mt-auto flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 border-2 border-black">
                        <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">No matching posts found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
