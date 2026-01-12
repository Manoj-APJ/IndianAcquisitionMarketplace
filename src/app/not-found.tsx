import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-9xl font-black mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-8">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
                The asset you are looking for might have been sold or never existed.
            </p>
            <Link href="/">
                <Button size="lg">Return Home</Button>
            </Link>
        </div>
    );
}
