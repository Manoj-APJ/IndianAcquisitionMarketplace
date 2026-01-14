import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MessageCircle, ArrowRight, User } from "lucide-react";

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
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 pt-12 max-w-2xl">
                {/* Simple Header */}
                <div className="mb-10 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Your Inbox</h1>
                    <span className="text-sm font-medium text-gray-400">
                        {conversations?.length || 0} active chats
                    </span>
                </div>

                {/* Conversations List */}
                {!conversations || conversations.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-gray-100">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <MessageCircle size={28} className="text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Nothing here yet</h3>
                        <p className="text-gray-500 text-sm mb-10 max-w-xs mx-auto">
                            When you message sellers or receive offers, your conversations will appear here.
                        </p>
                        <Link href="/listings">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-8">
                                Browse Listings
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {conversations.map((conv: any) => {
                            const otherEmail = conv.buyer_id === user.id ? conv.seller?.email : conv.buyer?.email;
                            const otherInitial = otherEmail?.[0].toUpperCase();

                            return (
                                <Link href={`/messages/${conv.id}`} key={conv.id} className="block group">
                                    <div className="p-5 bg-gray-50 rounded-2xl border border-transparent group-hover:border-emerald-200 group-hover:bg-emerald-50/30 transition-all flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-emerald-600 font-bold shadow-sm">
                                            {otherInitial || <User size={20} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 truncate">
                                                {conv.listing?.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Chatting with {otherEmail}
                                            </p>
                                        </div>
                                        <ArrowRight size={18} className="text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
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
