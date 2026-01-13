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
