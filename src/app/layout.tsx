import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AgentationWrapper } from "@/components/agentation-wrapper";
import { ModalProvider } from "@/components/modal-context";
import { ThemeProvider } from "@/components/theme-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Nathan Baschez";
const siteDescription =
  "Entrepreneur and writer. Co-founder of Every and Lex. Previously at Substack, Gimlet Media, and Product Hunt.";
const socialImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 713,
  alt: siteTitle,
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL("https://nathanbaschez.com"),
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://nathanbaschez.com",
    siteName: siteTitle,
    images: [socialImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage],
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
        <ThemeProvider>
          <ModalProvider>
            {children}
            {modal}
          </ModalProvider>
          {process.env.NODE_ENV === "development" && <AgentationWrapper />}
        </ThemeProvider>
      </body>
    </html>
  );
}
