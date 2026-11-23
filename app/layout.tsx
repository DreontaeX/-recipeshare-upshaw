import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecipeShare — good food, passed around",
  description: "Find your next favorite recipe or share one of your own.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="RecipeShare home">
            <span className="brand-mark" aria-hidden="true">r.</span>
            <span>recipe<span className="brand-light">share</span></span>
          </Link>
          <nav className="header-nav" aria-label="Main navigation">
            <Link href="/">Explore</Link>
            <Link className="button button-small" href="/recipes/new">Share a recipe <span aria-hidden="true">↗</span></Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <span>Made for the recipes worth passing around.</span>
          <span>RecipeShare <span aria-hidden="true">·</span> Cook something good</span>
        </footer>
      </body>
    </html>
  );
}
