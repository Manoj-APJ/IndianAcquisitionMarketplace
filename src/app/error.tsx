"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={28} className="text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Something went wrong</h2>
                <p className="text-gray-500 mb-8">
                    An unexpected error occurred. Please try again.
                </p>
                <Button
                    onClick={() => reset()}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl"
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
}
