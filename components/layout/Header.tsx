"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, LogOut, User, Settings, HelpCircle, ChevronDown, Menu as MenuIcon, Star, Plus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import { useAuthAction } from "@/hooks/useAuthAction";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguageStore } from "@/store/useLanguageStore";
import * as tmdbService from "@/lib/api/tmdbService";

export default function Header() {
  const { data: session } = useSession();
  const { openAuthModal, openModal } = useModalStore();
  const { requireAuth } = useAuthAction();
  const { language } = useLanguageStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length > 1) {
        setIsSearching(true);
        try {
          const results = await tmdbService.searchMulti(query, language);
          setSearchResults(results.slice(0, 6));
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(searchTimer);
  }, [query, language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setQuery("");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tv-shows", label: "TV Shows" },
    { href: "/movies", label: "Movies" },
    { href: "/new", label: "New & Popular" },
    { href: "/my-list", label: "My List" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-4 md:px-10 py-3 flex items-center justify-between ${
          isScrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-xl shadow-black/30 border-b border-white/5"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }`}
      >
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo-site.png"
              alt="AuraStream"
              width={160}
              height={45}
              className="w-24 md:w-28 h-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => requireAuth(() => setSearchOpen(true))}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <Search className="w-5 h-5 text-white/80" />
          </button>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-all border border-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          {!session ? (
            <button
              onClick={openAuthModal}
              className="hidden md:block px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Sign In
            </button>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 group p-1"
              >
                <div className="w-8 h-8 rounded-md overflow-hidden ring-2 ring-transparent group-hover:ring-white/20 transition-all">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="User" width={32} height={32} className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      {session.user?.name?.[0] || "U"}
                    </div>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-white/40 group-hover:text-white transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                      <p className="text-xs font-bold text-white truncate">{session.user?.name}</p>
                      <p className="text-[10px] text-white/40 truncate mt-0.5">{session.user?.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link href="/my-list" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <User className="w-4 h-4" /> My List
                      </Link>
                      <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </header>

      {/* SEARCH OVERLAY (Sibling of header, fixed inset-0) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center pt-24 md:pt-32 px-4"
            style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(40px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="w-full max-w-2xl"
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center rounded-2xl bg-white shadow-2xl">
                  <Search className="absolute left-6 w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    className="w-full bg-transparent pl-16 pr-14 py-5 text-gray-900 placeholder-gray-400 text-lg md:text-xl font-medium outline-none rounded-2xl"
                  />
                  {query && (
                    <button type="button" onClick={() => setQuery("")} className="absolute right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </form>

              {/* Results */}
              {query.length > 1 && (
                <div className="mt-4 w-full bg-[#111111]/80 backdrop-blur-2xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                  {isSearching ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-2 space-y-1">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            openModal(item.id, "title" in item ? "movie" : "tv");
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all"
                        >
                          <div className="relative w-12 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            {item.poster_path ? (
                              <Image src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt="poster" fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-neutral-800" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold truncate">{"title" in item ? item.title : item.name}</h4>
                            <div className="flex items-center gap-3 mt-1 text-[11px] text-white/40">
                              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{item.vote_average?.toFixed(1)}</span>
                              <span>•</span>
                              <span className="capitalize">{"title" in item ? "Movie" : "TV Show"}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center text-white/40">No results found</div>
                  )}
                </div>
              )}

              {!query && (
                <div className="mt-8 px-2">
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">Trending Suggestions</p>
                  <div className="flex flex-wrap gap-2">
                    {["Inception", "Interstellar", "Dark Knight", "Dune", "Succession"].map((term) => (
                      <button key={term} onClick={() => setQuery(term)} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white transition-all">{term}</button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER (Sibling of header, fixed) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-sm md:hidden" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-[280px] z-[150] bg-[#0c0c0c] border-l border-white/5 shadow-2xl md:hidden overflow-y-auto">
              <div className="flex flex-col h-full pt-20 pb-10 px-6">
                <div className="space-y-6">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-white/70 hover:text-white transition-colors">{link.label}</Link>
                  ))}
                </div>
                <div className="mt-12">
                  <LanguageSwitcher />
                </div>
                <div className="mt-auto pt-6 border-t border-white/5">
                  {!session ? (
                    <button onClick={() => { openAuthModal(); setMobileMenuOpen(false); }} className="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-lg">Sign In</button>
                  ) : (
                    <button onClick={() => { signOut({ callbackUrl: "/" }); setMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20"><LogOut className="w-4 h-4" /> Sign Out</button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
