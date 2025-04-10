// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export const metadata = {
    title: "Next.js CMS",
    description: "A simple cms built with Next.js",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-gray-100 text-gray-800" suppressHydrationWarning={true}>
        <nav className="bg-blue-600 p-4 text-white">
            <Link href="/" className="mr-4">ホーム</Link>
            <Link href="/posts/" className="mr-4">ニュース</Link>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
        </body>
        </html>
    );
}