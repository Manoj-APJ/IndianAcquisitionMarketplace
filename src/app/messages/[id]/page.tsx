import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ChatWindow } from "@/components/ChatWindow";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ConversationPage({ params }: { params: { id: string } }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: conversation } = await supabase
        .from("conversations")
        .select(`
            *,
            listing:listings(title, id),
            buyer:buyer_id(email),
            seller:seller_id(email)
        `)
        .eq("id", params.id)
        .single();

    if (!conversation) notFound();

    if (conversation.buyer_id !== user.id && conversation.seller_id !== user.id) {
        return <div>Unauthorized</div>;
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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/profile" className="inline-flex items-center gap-2 font-black uppercase text-xs tracking-widest mb-8 hover:text-blue-600 transition-colors">
                <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <div className="bg-white border-2 border-black shadow-neo h-[600px] flex flex-col">
                <div className="p-4 border-b-2 border-black bg-gray-50 flex justify-between items-center">
                    <div>
                        <h1 className="font-black text-lg uppercase tracking-tight">Chat about {conversation.listing.title}</h1>
                        <p className="text-xs text-gray-500 font-bold">with {otherPartyEmail}</p>
                    </div>
                    <Link href={`/listings/${conversation.listing.id}`} className="text-xs font-black underline uppercase">View Listing</Link>
                </div>
                <ChatWindow
                    conversationId={conversation.id}
                    initialMessages={messages || []}
                    currentUserId={user.id}
                />
            </div>
        </div>
    );
}
