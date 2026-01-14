export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-10 border-3 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Loading...</p>
            </div>
        </div>
    );
}
