import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { data } from "@/data/data";
import { LiquidWallpaper } from "@/components/layout/liquid-wallpaper";
import { LiquidLens } from "@/components/layout/liquid-lens";
import { Analytics } from "@vercel/analytics/next";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { ViewTransitions } from "next-view-transitions";
import { BgPicker } from "@/components/bg-demo/bg-picker";

// Puts back the picked background before the first paint (picker only).
const BG_INIT = `try{document.documentElement.dataset.bg=localStorage.getItem("bg-demo")||"clean"}catch(e){}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srivatsa-kamballa.vercel.app"),
  title: "Srivatsa Kamballa - Software Engineer",
  description:
    "Srivatsa Kamballa — software, AI platform, and DevOps/SRE engineer working on the security and reliability of AI pipelines.",
  icons: {
    icon: [
      { url: "/logo/logo.svg", type: "image/svg+xml" },       
      { url: "/favicon-196.png", sizes: "32x32", type: "image/png" },
      // { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "https://srivatsa-kamballa.vercel.app",
    title: "Srivatsa Kamballa — Software Engineer",
    description: "Software Engineer who breaks what he builds.",
    siteName: "Srivatsa Kamballa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srivatsa Kamballa — Software Engineer",
    description: "Software Engineer who breaks what he builds.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const palettePosts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
  }));
  const paletteProjects = getAllProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    tagline: p.tagline,
  }));

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: BG_INIT }} />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased relative`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <LiquidWallpaper />
            <LiquidLens />
            <Navbar navItems={data.nav} />
            <CommandPalette posts={palettePosts} projects={paletteProjects} />
            {children}
            <Footer />
            <BgPicker />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
