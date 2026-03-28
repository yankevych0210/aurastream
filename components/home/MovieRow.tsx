"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/shared/MovieCard";
import { Movie, TVShow } from "@/types/tmdb";

type MediaItem = Movie | TVShow;

interface MovieRowProps {
  title: string;
  items: MediaItem[];
}

export default function MovieRow({ title, items }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth ?? 200;
    const visibleCards = Math.floor(scrollRef.current.offsetWidth / cardWidth);
    const amount = direction === "left" ? -(cardWidth * visibleCards) : cardWidth * visibleCards;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="px-4 md:px-12 mt-10 group/row">
      <h2 className="text-sm md:text-base font-bold text-white/85 mb-3 tracking-widest uppercase">
        {title}
      </h2>

      <div className="relative">
        {/* Left fade + arrow */}
        <div className="absolute left-0 top-0 bottom-2 w-14 z-20 flex items-center justify-start
          bg-gradient-to-r from-background via-background/60 to-transparent
          opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-9 h-9 ml-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-3 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.slice(0, 20).map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>

        {/* Right fade + arrow */}
        <div className="absolute right-0 top-0 bottom-2 w-14 z-20 flex items-center justify-end
          bg-gradient-to-l from-background via-background/60 to-transparent
          opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-9 h-9 mr-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
