import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KENAG Spare Parts & Motors | Vehicle Imports in Kumasi",
  description:
    "KENAG Spare Parts & Motors imports used vehicles from the US, Europe, and Asia to Ghana, with ready stock and custom sourcing from Copart, IAAI, and other auction channels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
