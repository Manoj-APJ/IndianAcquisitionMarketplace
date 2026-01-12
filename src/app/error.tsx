"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl font-black mb-4">Something went wrong!</h2>
            <p className="text-xl text-gray-600 mb-8">
                We encountered an error while loading this page.
            </p>
            <div className="flex justify-center gap-4">
                <Button onClick={() => reset()}>Try again</Button>
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                    Go Home
                </Button>
            </div>
        </div>
    );
}
