import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or import local if needed, but google font is better
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MarketX | Buy & Sell Digital Assets",
    description: "The marketplace for indie founders to buy vsell micro-SaaS, newsletters, and side-projects.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn( // Modified body className
                "min-h-screen bg-background font-sans antialiased",
                inter.className
            )}>
                <Navbar />
                <main className="min-h-screen"> {/* Modified main className */}
                    {children}
                </main>
                <Footer /> {/* Replaced footer tag with Footer component */}
            </body>
        </html>
    );
}
