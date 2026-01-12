export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[50vh]">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 border-4 border-black border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <div className="text-xl font-black uppercase">Loading...</div>
            </div>
        </div>
    );
}
