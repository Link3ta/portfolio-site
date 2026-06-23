import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/smooth-scroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anders Ljungstedt — Applied AI Engineer · Proptech · Oslo",
  description:
    "Production LLM systems for luxury real estate and permit intelligence. Kian Estate, KE Stays, Florida Lead Portal. Oslo-based Applied AI Engineer available via Ladda.",
  keywords: [
    "Applied AI Engineer",
    "Generative AI",
    "Proptech",
    "Oslo",
    "LLM",
    "RAG",
    "Agents",
    "LangGraph",
    "Anders Ljungstedt",
    "zavian.ai",
  ],
  authors: [{ name: "Anders Ljungstedt" }],
  openGraph: {
    title: "Anders Ljungstedt — Applied AI Engineer · Proptech · Oslo",
    description:
      "Production LLM systems for luxury real estate and permit intelligence. Kian Estate, KE Stays, Florida Lead Portal.",
    url: "https://zavian.ai",
    siteName: "zavian.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anders Ljungstedt — Applied AI Engineer · Proptech",
    description:
      "Production LLM systems for luxury real estate and permit intelligence. Oslo-based.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster />
      </body>
    </html>
  );
}
