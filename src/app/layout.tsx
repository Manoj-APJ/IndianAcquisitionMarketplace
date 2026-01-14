import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ConditionalWrapper } from "@/components/ConditionalWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AcquireX | Premium Digital Asset Marketplace",
    description: "The trusted marketplace for buying and selling verified digital businesses, SaaS platforms, and newsletters.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                inter.className
            )}>
                <ConditionalWrapper
                    navbar={<Navbar />}
                    footer={<Footer />}
                >
                    {children}
                </ConditionalWrapper>
            </body>
        </html>
    );
}
