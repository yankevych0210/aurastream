"use client";

import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  {
    heading: "Browse",
    links: [
      { label: "Home", href: "/" },
      { label: "Movies", href: "/movies" },
      { label: "TV Shows", href: "/tv-shows" },
      { label: "New & Popular", href: "/new" },
      { label: "My List", href: "/my-list" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/[0.06] bg-[#0a0a0a]">
      {/* Top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.4) 30%, rgba(37,99,235,0.4) 70%, transparent 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-8">
        {/* Top row: logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-site.png"
                alt="AuraStream"
                width={140}
                height={40}
                className="h-8 w-auto object-contain opacity-90"
              />
            </Link>
            <p className="text-white/35 text-xs leading-relaxed max-w-[200px]">
              Your premium destination for movies and TV shows. Stream anywhere, anytime.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} AuraStream. All rights reserved. For educational purposes only.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-white/20 text-[10px]">Content by</span>
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-blue-400/60 hover:text-blue-400 transition-colors"
            >
              TMDB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
