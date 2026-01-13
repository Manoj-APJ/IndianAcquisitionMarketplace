"use client";

import { BlogPost } from "@/types/blog";
import Link from "next/link";

interface BlogGridProps {
    blogs: BlogPost[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50 border-t-2 border-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">Latest from the Blog</h2>
                    <Link href="/blog" className="text-blue-600 font-bold hover:underline">View all posts →</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogs.slice(0, 3).map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group block h-full">
                            <div className="border-2 border-black bg-white h-full transition-all group-hover:-translate-y-1 group-hover:shadow-neo pb-6">
                                {post.cover_image && (
                                    <div className="h-48 border-b-2 border-black overflow-hidden relative mb-4">
                                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    </div>
                                )}
                                <div className="px-6">
                                    <h3 className="text-xl font-black mb-2 group-hover:text-blue-900 leading-tight">{post.title}</h3>
                                    <p className="text-gray-600 text-sm font-medium line-clamp-2">{post.excerpt}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
