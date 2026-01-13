import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MessageCircle, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function MessagesPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch Conversations
    const { data: conversations } = await supabase
        .from("conversations")
        .select(`*, listing:listings(title), buyer:buyer_id(email), seller:seller_id(email)`)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-8 pb-8 border-b-2 border-black">
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Your Messages</h1>
                    <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-sm">
                        {conversations?.length || 0} Active
                    </span>
                </div>

                {!conversations || conversations.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-black">
                        <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-black text-gray-500 mb-2">No active conversations</h3>
                        <p className="text-gray-400 mb-8">Start a discussion by making an offer or contacting a seller.</p>
                        <Link href="/listings">
                            <Button className="font-black border-2 border-black">Browse Listings</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {conversations.map((conv: any) => {
                            const otherEmail = conv.buyer_id === user.id ? conv.seller?.email : conv.buyer?.email;
                            return (
                                <Link href={`/messages/${conv.id}`} key={conv.id}>
                                    <div className="group bg-white border-2 border-black p-6 hover:bg-gray-50 transition-all shadow-neo hover:translate-x-1 hover:-translate-y-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-black text-lg uppercase mb-1">{conv.listing?.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                    Chat with {otherEmail}
                                                </div>
                                            </div>
                                            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
