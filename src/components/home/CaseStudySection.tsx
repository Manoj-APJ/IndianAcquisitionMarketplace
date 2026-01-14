import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, MessageSquare, DollarSign, ArrowRight } from "lucide-react";

export function CaseStudySection() {
    return (
        <section className="py-24 bg-white border-b-2 border-black overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Visual part */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 border-4 border-black shadow-neo rotate-1 overflow-hidden group">
                            <img
                                src="/images/hero-dashboard.png"
                                alt="MarketX Dashboard"
                                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all pointer-events-none" />
                        </div>

                        {/* Overlay Chat Image */}
                        <div className="absolute -bottom-10 -right-6 md:-right-10 z-20 w-2/3 border-4 border-black shadow-neo -rotate-2 overflow-hidden bg-white hidden md:block">
                            <img
                                src="/images/chat-interface.png"
                                alt="Secure Chat"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Background Accents */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl opacity-20 -z-10" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20 -z-10" />
                    </div>

                    {/* Content part */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <span className="bg-amber-100 border-2 border-black px-4 py-1 text-xs font-black uppercase mb-4 inline-block">The MarketX Standard</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                                Deals happen in <span className="text-blue-900">days</span>, <br /> not months.
                            </h2>
                        </div>

                        <p className="text-xl text-gray-600 font-bold leading-relaxed">
                            Our structured deal-flow ensures transparency at every step. No guessing, no back-and-forth emails, just clean data and direct communication.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-gray-50 border-2 border-black shadow-neo-sm hover:shadow-neo transition-all group">
                                <ShieldCheck className="w-10 h-10 mb-4 text-blue-900 transition-transform group-hover:scale-110" />
                                <h4 className="font-black uppercase text-sm mb-2">NDA Restricted</h4>
                                <p className="text-xs font-bold text-gray-500">Sensitive data is only unlocked after a verified NDA signature.</p>
                            </div>
                            <div className="p-6 bg-gray-50 border-2 border-black shadow-neo-sm hover:shadow-neo transition-all group">
                                <MessageSquare className="w-10 h-10 mb-4 text-amber-500 transition-transform group-hover:scale-110" />
                                <h4 className="font-black uppercase text-sm mb-2">Secure Chat</h4>
                                <p className="text-xs font-bold text-gray-500">Instant messaging between verified buyers and founders.</p>
                            </div>
                            <div className="p-6 bg-gray-50 border-2 border-black shadow-neo-sm hover:shadow-neo transition-all group">
                                <DollarSign className="w-10 h-10 mb-4 text-green-600 transition-transform group-hover:scale-110" />
                                <h4 className="font-black uppercase text-sm mb-2">Direct Offers</h4>
                                <p className="text-xs font-bold text-gray-400">Standardized offer templates to avoid confusion and friction.</p>
                            </div>
                            <div className="p-6 bg-blue-900 border-2 border-black shadow-neo-sm text-white group cursor-pointer hover:bg-black transition-colors">
                                <ArrowRight className="w-10 h-10 mb-4 text-amber-400 transition-transform group-hover:translate-x-2" />
                                <h4 className="font-black uppercase text-sm mb-2 italic">Ready to Exit?</h4>
                                <p className="text-xs font-bold text-blue-200">List your business and connect with verified buyers today.</p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Link href="/how-it-works">
                                <Button className="h-14 px-8 font-black uppercase shadow-neo border-2 border-black">
                                    See the Process
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
