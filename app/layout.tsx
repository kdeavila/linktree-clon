import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Linktree Clone",
  description: "Linktree Clone description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <main className="w-full h-full min-h-screen bg-gray-100 text-neutral-950">
            {children}
          </main>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
