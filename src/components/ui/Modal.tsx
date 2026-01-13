"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border-2 border-black shadow-neo w-full max-w-lg relative animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b-2 border-black bg-gray-50">
                    <h3 className="font-black uppercase tracking-tight text-lg">{title || "Modal"}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded border border-transparent hover:border-black transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
