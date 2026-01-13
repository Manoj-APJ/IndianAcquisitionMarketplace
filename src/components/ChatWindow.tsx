"use client";
import { useState, useEffect, useRef } from "react";
import { sendMessage } from "@/app/actions/chat";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function ChatWindow({ conversationId, initialMessages, currentUserId }: any) {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const channel = supabase.channel('realtime_messages')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, (payload) => {
                setMessages((prev: any) => [...prev, payload.new]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [conversationId, supabase]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setSending(true);
        const text = input;
        setInput("");

        await sendMessage({ conversationId, messageText: text });
        setSending(false);
    };

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((msg: any) => {
                    const isMe = msg.sender_id === currentUserId;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 border-2 border-black shadow-neo-sm ${isMe ? 'bg-blue-100' : 'bg-white'}`}>
                                <p className="font-bold text-sm">{msg.message_text}</p>
                                <span className="text-[10px] text-gray-400 font-bold mt-1 block">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSend} className="p-4 border-t-2 border-black bg-white flex gap-2">
                <input
                    className="flex-1 border-2 border-black p-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <Button disabled={sending || !input.trim()} className="border-2 border-black shadow-neo-sm font-black uppercase">
                    Send
                </Button>
            </form>
        </div>
    );
}
