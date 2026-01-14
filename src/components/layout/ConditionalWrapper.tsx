"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    return (
        <>
            {!isAuthPage && <NavbarWrapper />}
            <main className={isAuthPage ? "" : "min-h-screen"}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </>
    );
}

// Since Navbar is an async component, we can't directly use it in a client component if it's imported as a server component.
// But we can pass it as a child or use a different approach.
// Actually, Navbar is exported as a constant.
// If Navbar is async, we should probably keep it in the layout.

// Wait, I can't use an async component inside a client component easily.
// I'll just change Navbar to be a regular component that fetch data in a child or just keep it as is.
