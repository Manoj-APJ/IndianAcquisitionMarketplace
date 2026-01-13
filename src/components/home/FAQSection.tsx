"use client";

import { FAQS } from "@/lib/landing-data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-black text-center mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border-2 border-black shadow-neo-sm overflow-hidden transition-all bg-white"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-5 text-left font-bold hover:bg-gray-50 focus:outline-none"
                            >
                                {faq.question}
                                <ChevronDown
                                    className={cn("transition-transform duration-300", openIndex === idx && "rotate-180")}
                                    size={20}
                                />
                            </button>
                            <div
                                className={cn(
                                    "transition-[max-height] duration-300 ease-in-out overflow-hidden bg-gray-50",
                                    openIndex === idx ? "max-h-48 border-t-2 border-black" : "max-h-0"
                                )}
                            >
                                <p className="p-5 text-gray-600 font-medium leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
