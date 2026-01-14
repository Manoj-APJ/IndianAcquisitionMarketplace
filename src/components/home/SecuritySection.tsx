import { Shield, Lock, Eye, MessageSquare, FileText, CheckCircle } from "lucide-react";

export function SecuritySection() {
    const features = [
        {
            icon: Lock,
            title: "Encrypted P&L",
            desc: "Financial data is locked behind AES-256 encryption. Only revealed to vetted buyers."
        },
        {
            icon: Shield,
            title: "Identity Verification",
            desc: "All sellers must verify their identity via government ID before listing."
        },
        {
            icon: Eye,
            title: "NDA-Gated metrics",
            desc: "Traffic, tech stack, and customer details are only visible after NDA acceptance."
        }
    ];

    return (
        <section className="py-24 bg-blue-900 text-white border-b-2 border-black overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800/30 -skew-x-12 transform translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
                        Built for <span className="text-amber-400 underline decoration-8 decoration-white">Confidence</span>.
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-100 font-bold leading-relaxed">
                        Conventional marketplaces are filled with noise and unvetted data.
                        MarketX provides a secure ecosystem where serious capital meets legitimate builders.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white/5 border-2 border-white/10 p-10 hover:bg-white/10 transition-colors group">
                            <f.icon className="w-12 h-12 mb-6 text-amber-400 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-black uppercase mb-4">{f.title}</h3>
                            <p className="text-blue-200 font-bold leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Secure Process Teaser */}
                <div className="mt-20 flex flex-wrap justify-center items-center gap-4 text-xs font-black uppercase tracking-[0.3em] overflow-x-auto whitespace-nowrap pb-4">
                    <span className="flex items-center gap-2">Listing <ArrowRight size={14} className="text-amber-400" /></span>
                    <span className="flex items-center gap-2">NDA Signed <ArrowRight size={14} className="text-amber-400" /></span>
                    <span className="flex items-center gap-2">Full Access <ArrowRight size={14} className="text-amber-400" /></span>
                    <span className="flex items-center gap-2">Secure Chat <ArrowRight size={14} className="text-amber-400" /></span>
                    <span className="flex items-center gap-2 text-amber-400">Deal Closed <CheckCircle size={14} /></span>
                </div>
            </div>
        </section>
    );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
