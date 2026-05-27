import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SystemDarkMode } from "@/components/system-dark-mode";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nathan Baschez",
  description:
    "Entrepreneur and writer. Co-founder of Every and Lex. Previously at Substack, Gimlet Media, and Product Hunt.",
  metadataBase: new URL("https://nbaschez.com"),
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Nathan Baschez",
    description:
      "Entrepreneur and writer. Co-founder of Every and Lex. Previously at Substack, Gimlet Media, and Product Hunt.",
    images: [{ url: "/nbaschez.jpg" }],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <SystemDarkMode />
        {children}
        {modal}
      </body>
    </html>
  );
}
