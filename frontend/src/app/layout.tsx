import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ZentraHR - The foundation of workforce management",
    description: "The complete HRMS solution for modern enterprises",
    icons: {
        icon: '/zentra_logo.png',
        apple: '/zentra_logo.png',
    }
};

import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientLayoutWrapper>
                    {children}
                </ClientLayoutWrapper>
            </body>
        </html>
    );
}
