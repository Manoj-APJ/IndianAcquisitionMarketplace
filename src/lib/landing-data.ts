export const FAQS = [
    {
        question: "Is this only for SaaS?",
        answer: "Primarily yes, but we also support high-quality newsletters, paid communities, and productized services. If it's digital, profitable, and verifiable, it belongs here."
    },
    {
        question: "What counts as 'profitable'?",
        answer: "We focus on businesses generating at least $500/mo in verifiable revenue. We are not a marketplace for pre-revenue ideas or starter sites."
    },
    {
        question: "Do you handle payments or escrow?",
        answer: "We act as the connection and negotiation layer. For the final transaction, we recommend and integrate with trusted third-party escrow services like Escrow.com for maximum safety."
    },
    {
        question: "How is sensitive data protected?",
        answer: "We use a physical data split in our database. Sensitive metrics (exact revenue, customer lists) are stored in a separate, restricted table that is only unlocked via Row Level Security (RLS) after you sign a legally binding NDA."
    }
];

export const COMPARISON_FEATURES = [
    { name: "NDA-protected Data", us: true, others: false },
    { name: "Audit Trail of Access", us: true, others: false },
    { name: "Physically Separated Private Data", us: true, others: false },
    { name: "Structured Deal Rooms", us: true, others: false },
    { name: "Transfer Checklists", us: true, others: false },
    { name: "External Escrow Friendly", us: true, others: true },
];
