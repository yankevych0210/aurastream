"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, TrendingUp, Star, Film, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/shared/MovieCard";
import { searchMovies } from "@/lib/api/tmdbService";
import { Movie } from "@/types/tmdb";

interface SearchPageClientProps {
  initialQuery: string;
  initialResults: Movie[];
  lang?: string;
}

const GENRE_TAGS = [
  { label: "Action", emoji: "💥" },
  { label: "Drama", emoji: "🎭" },
  { label: "Thriller", emoji: "🔪" },
  { label: "Comedy", emoji: "😂" },
  { label: "Sci-Fi", emoji: "🚀" },
  { label: "Horror", emoji: "👻" },
  { label: "Romance", emoji: "💕" },
  { label: "Animation", emoji: "🎨" },
  { label: "Documentary", emoji: "🎬" },
  { label: "Adventure", emoji: "🗺️" },
];

const TRENDING_SUGGESTIONS = [
  "Inception", "Breaking Bad", "The Godfather", "Interstellar",
  "Game of Thrones", "Oppenheimer", "The Dark Knight",
];

export default function SearchPageClient({ initialQuery, initialResults, lang = "en-US" }: SearchPageClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Movie[]>(initialResults);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runSearch = async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      router.push("/search", { scroll: false });
      return;
    }
    setIsSearching(true);
    try {
      const data = await searchMovies(value.trim(), lang);
      setResults(data.results);
      router.push(`/search?q=${encodeURIComponent(value.trim())}`, { scroll: false });
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 450);
  };

  const handleSuggestionClick = (s: string) => {
    setQuery(s);
    runSearch(s);
  };

  const hasResults = results.length > 0;
  const hasQuery = query.trim().length > 0;

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero Search Section ── */}
      <div
        className="relative w-full pt-32 pb-16 px-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)",
        }}
      >
        {/* Decorative glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-40 opacity-30 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 80%)" }} />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black text-white mb-1 md:mb-2 tracking-tight"
          >
            {lang === "uk-UA" ? "Що ти хочеш" : lang === "ru-RU" ? "Что ты хочешь" : "What do you want to"}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tight"
            style={{
              background: "linear-gradient(90deg, #a78bfa, #60a5fa, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {lang === "uk-UA" ? "сьогодні подивитись?" : lang === "ru-RU" ? "сегодня посмотреть?" : "watch today?"}
          </motion.h1>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div
              className={`relative flex items-center rounded-2xl transition-all duration-300 ${
                isFocused
                  ? "shadow-[0_0_0_2px_rgba(167,139,250,0.6),0_20px_60px_rgba(0,0,0,0.5)]"
                  : "shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              }`}
              style={{ background: "rgba(255,255,255,0.97)" }}
            >
              <div className="absolute left-5 flex items-center">
                {isSearching ? (
                  <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                ) : (
                  <Search className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={lang === "uk-UA" ? "Шукай фільми, серіали..." : lang === "ru-RU" ? "Ищи фильмы, сериалы..." : "Search movies, TV shows..."}
                className="w-full bg-transparent pl-14 pr-14 py-5 text-gray-900 placeholder-gray-400 text-lg outline-none font-medium rounded-2xl"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={() => handleInputChange("")}
                    className="absolute right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Trending suggestions chips */}
          {!hasQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 flex flex-wrap justify-center gap-2"
            >
              <span className="flex items-center gap-1.5 text-white/40 text-sm mr-1">
                <TrendingUp className="w-3.5 h-3.5" /> Trending:
              </span>
              {TRENDING_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="text-sm text-white/70 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 px-3.5 py-1.5 rounded-full transition-all"
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Genre Tags ── */}
      {!hasQuery && !hasResults && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-4 md:px-12 py-12"
        >
          <h2 className="flex items-center gap-2 text-white font-bold text-lg mb-5">
            <Film className="w-5 h-5 text-purple-400" />
            Browse by Genre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {GENRE_TAGS.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => handleSuggestionClick(label)}
                className="group relative flex items-center gap-3 p-4 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-left overflow-hidden"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-white/80 group-hover:text-white font-semibold text-sm transition-colors">
                  {label}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-300 rounded-2xl" />
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── Results ── */}
      <div className="px-4 md:px-12 pb-16">

        {/* Result count */}
        {hasQuery && !isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 py-6 border-b border-white/8 mb-6"
          >
            <Star className="w-4 h-4 text-purple-400" />
            <p className="text-white/50 text-sm">
              <span className="text-white font-semibold">{results.length}</span> results for{" "}
              <span className="text-purple-300 font-medium">&ldquo;{query}&rdquo;</span>
            </p>
            {results.length > 0 && (
              <span className="ml-auto flex items-center gap-1.5 text-xs text-white/30">
                <Tv className="w-3.5 h-3.5" /> Click any card to watch
              </span>
            )}
          </motion.div>
        )}

        {/* Loading skeleton */}
        {isSearching && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* No results */}
        {hasQuery && !isSearching && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 pt-20 text-center"
          >
            <div className="text-6xl mb-2">🎬</div>
            <p className="text-white font-bold text-xl">Nothing found</p>
            <p className="text-white/40 text-sm max-w-xs">
              We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try a different keyword.
            </p>
            <button
              onClick={() => handleInputChange("")}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* Results grid */}
        <AnimatePresence mode="wait">
          {!isSearching && results.length > 0 && (
            <motion.div
              key={query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4"
            >
              {results.map((movie, i) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(i * 0.025, 0.4), duration: 0.2 }}
                >
                  <MovieCard item={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
