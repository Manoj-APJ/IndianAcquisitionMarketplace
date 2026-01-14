export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    cover_image?: string;
    published_at: string;
    author_id: string;
}
