import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Architect Prime V3 - AI Prompt Builder",
  description: "Create detailed, high-quality prompts for AI coding agents. Build your vision with ease.",
  keywords: ["AI", "prompt builder", "coding", "SaaS", "web development"],
  authors: [{ name: "Architect Prime V3" }],
  creator: "Architect Prime V3",
  publisher: "Architect Prime V3",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://architectprime.ai",
    title: "Architect Prime V3 - AI Prompt Builder",
    description: "Create detailed, high-quality prompts for AI coding agents",
    siteName: "Architect Prime V3",
  },
  twitter: {
    card: "summary_large_image",
    title: "Architect Prime V3",
    description: "Create detailed, high-quality prompts for AI coding agents",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
