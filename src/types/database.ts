export type ListingStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'live' | 'sold';

export interface Listing {
    id: string;
    user_id: string;
    title: string;
    short_description: string;
    description: string;
    listing_type: string;
    price: number;
    monthly_revenue: number;
    tech_stack: string[];
    status: ListingStatus;
    founded_date: string;
    customers_count: number;
    created_at: string;
}

export type CreateListingInput = Omit<Listing, 'id' | 'user_id' | 'created_at' | 'status'>;

export interface ListingProof {
    id: string;
    listing_id: string;
    uploaded_by: string;
    proof_type: 'revenue' | 'traffic' | 'ownership' | 'other';
    source: string;
    file_url: string;
    notes?: string;
    created_at: string;
}

export interface Conversation {
    id: string;
    listing_id: string;
    buyer_id: string;
    seller_id: string;
    created_at: string;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    message_text: string;
    is_read: boolean;
    created_at: string;
}

export type OfferStatus = 'sent' | 'countered' | 'accepted' | 'rejected' | 'withdrawn';

export interface Offer {
    id: string;
    listing_id: string;
    buyer_id: string;
    seller_id: string;
    amount: number;
    status: OfferStatus;
    message?: string;
    created_at: string;
    updated_at: string;
}
