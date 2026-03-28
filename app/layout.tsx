import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import MovieModal from "@/components/modals/MovieModal";
import AuthModal from "@/components/modals/AuthModal";
import CookieBanner from "@/components/layout/CookieBanner";
import AuthGate from "@/components/auth/AuthGate";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AuraStream — Watch Movies & TV Shows Online",
  description:
    "AuraStream is your premium streaming destination. Watch trending movies and TV shows in HD.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          {children}
          <Footer />

          {/* Global modals */}
          <MovieModal />
          <AuthModal />

          {/* AuthGate: opens AuthModal when middleware redirects with ?auth=required */}
          <Suspense fallback={null}>
            <AuthGate />
          </Suspense>

          {/* Cookie consent banner */}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
