import { EditBlogForm } from "@/components/admin/EditBlogForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function EditBlogPage({ params }: PageProps) {
    const supabase = createClient();

    const { data: blog } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!blog) notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/admin/blogs">
                    <Button variant="outline" size="sm" className="mb-4 pl-0 hover:bg-transparent hover:underline border-none">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blog Manager
                    </Button>
                </Link>
                <h1 className="text-3xl font-black">Edit Post</h1>
            </div>

            <EditBlogForm blog={blog} />
        </div>
    );
}
