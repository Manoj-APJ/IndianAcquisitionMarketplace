import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ChatWindow } from "@/components/ChatWindow";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default async function ConversationPage({ params }: { params: { id: string } }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: conversation } = await supabase
        .from("conversations")
        .select(`
            *,
            listing:listings(title, id, price),
            buyer:buyer_id(email),
            seller:seller_id(email)
        `)
        .eq("id", params.id)
        .single();

    if (!conversation) notFound();

    if (conversation.buyer_id !== user.id && conversation.seller_id !== user.id) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-500">You don't have access to this conversation.</p>
                </div>
            </div>
        );
    }

    const otherPartyEmail = user.id === conversation.buyer_id
        ? conversation.seller.email
        : conversation.buyer.email;

    const { data: messages } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", params.id)
        .order("created_at", { ascending: true });

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Clean Header */}
                <div className="mb-6 flex items-center gap-4">
                    <Link
                        href="/messages"
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="font-bold text-gray-900">{conversation.listing.title}</h1>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                ${conversation.listing.price.toLocaleString()}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">Chat with {otherPartyEmail}</p>
                    </div>
                    <Link
                        href={`/listings/${conversation.listing.id}`}
                        className="text-xs font-bold text-gray-400 hover:text-emerald-600 flex items-center gap-1 uppercase tracking-wider"
                    >
                        LISTING <ExternalLink size={12} />
                    </Link>
                </div>

                {/* Chat Area */}
                <div className="h-[600px] border border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
                    <ChatWindow
                        conversationId={conversation.id}
                        initialMessages={messages || []}
                        currentUserId={user.id}
                    />
                </div>
            </div>
        </div>
    );
}
