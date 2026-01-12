export type AssetType = "SaaS" | "Newsletter" | "E-commerce" | "Micro-SaaS" | "Community";

export interface Listing {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    type: AssetType;
    price: number;
    revenue: number;
    techStack: string[];
    foundedDate: string;
    customers: number;
}

export const LISTINGS: Listing[] = [
    {
        id: "1",
        name: "DesignFast",
        shortDescription: "AI-powered design tool for social media posts.",
        description: "DesignFast is complete SaaS that allows users to generate social media posts using AI. It has a growing user base and a solid recurring revenue model. The tech stack is modern and easy to maintain. We are selling because the founders are moving to a new venture.",
        type: "SaaS",
        price: 45000,
        revenue: 3200,
        techStack: ["Next.js", "OpenAI API", "Stripe", "Supabase"],
        foundedDate: "2023-01-15",
        customers: 150
    },
    {
        id: "2",
        name: "DevNewsletter",
        shortDescription: "A weekly newsletter for frontend developers.",
        description: "A curated newsletter with over 5,000 active subscribers. High open rates and established sponsorship deals. Perfect for a developer looking to build an audience or a company wanting to reach frontend engineers.",
        type: "Newsletter",
        price: 12000,
        revenue: 800,
        techStack: ["Substack", "Email"],
        foundedDate: "2022-05-10",
        customers: 5200
    },
    {
        id: "3",
        name: "NotionIcons",
        shortDescription: "Premium icon pack for Notion workspaces.",
        description: "A popular digital product selling custom icon sets for Notion. Passive income with organic traffic from SEO and social media. Includes all design assets and the gumroad account.",
        type: "E-commerce",
        price: 5500,
        revenue: 400,
        techStack: ["Gumroad", "Figma"],
        foundedDate: "2023-03-20",
        customers: 800
    },
    {
        id: "4",
        name: "ScraperAPI",
        shortDescription: "Micro-SaaS API for scraping real estate data.",
        description: "A specialized API service that scrapes real estate listings. Used by 5 B2B clients on monthly retainers. Very low maintenance.",
        type: "Micro-SaaS",
        price: 25000,
        revenue: 1500,
        techStack: ["Python", "FastAPI", "AWS"],
        foundedDate: "2022-11-01",
        customers: 5
    },
    {
        id: "5",
        name: "IndieHackerz",
        shortDescription: "Community forum for bootstrap founders.",
        description: "A niche community with high engagement. Monetized via ads and job board. tremendous potential for growth if managed actively.",
        type: "Community",
        price: 18000,
        revenue: 600,
        techStack: ["Discourse", "DigitalOcean"],
        foundedDate: "2021-08-15",
        customers: 3400
    },
    {
        id: "6",
        name: "RankTracker",
        shortDescription: "SEO keyword tracking tool for small blogs.",
        description: "Simple, affordable rank tracker. Competes on price and simplicity. Good for someone learing to run a SaaS.",
        type: "SaaS",
        price: 8000,
        revenue: 250,
        techStack: ["React", "Firebase", "Node.js"],
        foundedDate: "2023-06-01",
        customers: 45
    }
];
