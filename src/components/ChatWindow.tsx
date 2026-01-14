"use client";
import { useState, useEffect, useRef } from "react";
import { sendMessage } from "@/app/actions/chat";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { Send } from "lucide-react";

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
        const channel = supabase.channel(`chat_${conversationId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, (payload) => {
                setMessages((prev: any) => {
                    if (prev.find((m: any) => m.id === payload.new.id)) return prev;
                    return [...prev, payload.new];
                });
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
        <div className="flex flex-col h-full bg-white">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-sm text-gray-400">No messages yet. Say hello!</p>
                    </div>
                )}
                {messages.map((msg: any) => {
                    const isMe = msg.sender_id === currentUserId;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isMe
                                    ? 'bg-emerald-600 text-white rounded-br-sm'
                                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                                    }`}>
                                    {msg.message_text}
                                </div>
                                <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
                <div className="flex gap-2">
                    <input
                        className="flex-1 rounded-xl bg-gray-50 border-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium placeholder:text-gray-400 transition-all"
                        placeholder="Type your message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button
                        disabled={sending || !input.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl w-12 h-12 flex items-center justify-center p-0 transition-all active:scale-95"
                    >
                        <Send size={18} />
                    </Button>
                </div>
            </form>
        </div>
    );
}
