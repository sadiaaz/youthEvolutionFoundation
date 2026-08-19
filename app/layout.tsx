import type { Metadata } from "next";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Youth Evolution Foundation | Empowering Youth in Pakistan",
    template: "%s | Youth Evolution Foundation",
  },
  description:
    "Youth Evolution Foundation is a non-profit organization dedicated to youth empowerment, skill development, educational programs, and leadership opportunities across Pakistan.",
  keywords: [
    "Youth Evolution Foundation",
    "YEF Pakistan",
    "Youth NGO Karachi",
    "Youth Leadership Programs",
    "Volunteer Opportunities Pakistan",
    "Skill Development Courses",
    "Non Profit Organization Pakistan",
  ],
  authors: [{ name: "Youth Evolution Foundation" }],
  creator: "Youth Evolution Foundation",
  publisher: "Youth Evolution Foundation",
  metadataBase: new URL("https://youthevolution.org"),
  openGraph: {
    title: "Youth Evolution Foundation | Empowering Youth in Pakistan",
    description:
      "Empowering youth through education, mentorship, and community-driven impact.",
    url: "https://youthevolution.org",
    siteName: "Youth Evolution Foundation",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}