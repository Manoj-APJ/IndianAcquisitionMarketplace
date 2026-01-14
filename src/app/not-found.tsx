import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Page not found</h2>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/">
                    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
