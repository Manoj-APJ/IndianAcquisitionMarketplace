import { BlogForm } from "@/components/admin/BlogForm";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/admin/blogs">
                    <Button variant="outline" size="sm" className="mb-4 pl-0 hover:bg-transparent hover:underline border-none">
                        <ArrowLeft size={16} className="mr-2" /> Back to Blog Manager
                    </Button>
                </Link>
                <h1 className="text-3xl font-black">Create New Post</h1>
            </div>

            <BlogForm />
        </div>
    );
}
