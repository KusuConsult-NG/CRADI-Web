import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "CRADI - Crest Research And Development Institute",
    description: "Official Learning Management System of Crest Research And Development Institute. Professional certificate and Master's degree programmes.",
    keywords: "CRADI, research institute, online learning, master's degree, certificate programs, Nigeria education",
    authors: [{ name: "CRADI Development Team" }],
    openGraph: {
        title: "CRADI - Crest Research And Development Institute",
        description: "Official Learning Management System for professional development and postgraduate education",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className="antialiased min-h-screen bg-gradient-to-br from-background-darker via-background-dark to-secondary-950">
                {children}
            </body>
        </html>
    );
}
