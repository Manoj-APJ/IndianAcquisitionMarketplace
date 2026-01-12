import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or import local if needed, but google font is better
import "./globals.css";
import { Navbar } from "@/components/Navbar";

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
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen bg-[#fdfbf7] pb-20">
                    {children}
                </main>
                <footer className="border-t-2 border-black bg-white py-8 text-center">
                    <p className="font-bold">© {new Date().getFullYear()} MarketX Inc. Not a real company.</p>
                </footer>
            </body>
        </html>
    );
}
