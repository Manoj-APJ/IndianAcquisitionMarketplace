import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const supabase = createClient();

    const { data: post } = await supabase
        .from('blogs')
        .select('*, profiles(full_name)')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <Link href="/blog">
                    <Button variant="ghost" size="sm" className="mb-8 pl-0 hover:bg-transparent hover:underline">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blog
                    </Button>
                </Link>

                <article className="prose prose-lg prose-headings:font-black prose-a:text-blue-600 prose-img:border-2 prose-img:border-black prose-img:shadow-neo max-w-none">
                    <div className="mb-4">
                        <span className="bg-blue-600 text-white px-3 py-1 text-xs font-black uppercase tracking-tighter border-2 border-black shadow-[2px_2px_0_0_#000]">
                            {post.category || 'Opinion'}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl mb-4 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-500 mb-8 border-b-2 border-gray-100 pb-8">
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>By {post.profiles?.full_name || 'MarketX Team'}</span>
                    </div>

                    {post.cover_image && (
                        <div className="mb-10 w-full h-[400px] border-2 border-black shadow-neo overflow-hidden relative">
                            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="whitespace-pre-wrap font-medium text-gray-700 leading-relaxed font-sans">
                        {post.content}
                    </div>
                </article>
            </div>
        </div>
    );
}
