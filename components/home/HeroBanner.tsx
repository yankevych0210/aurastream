import Image from "next/image";
import { getTrending } from "@/lib/api/tmdbService";
import { Movie, TVShow } from "@/types/tmdb";
import HeroBannerButtons from "./HeroBannerButtons";
import { Star, Calendar } from "lucide-react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

interface HeroBannerProps {
  type?: "movie" | "tv";
  lang?: string;
}

export default async function HeroBanner({ type = "movie", lang = "en-US" }: HeroBannerProps) {
  let item: Movie | TVShow | null = null;

  try {
    const data = type === "tv" ? await getTrending("tv", lang) : await getTrending("movie", lang);
    item = data.results[0] ?? null;
  } catch (err) {
    console.error(`Failed to fetch hero ${type}:`, err);
  }

  if (!item) {
    return (
      <div className="relative w-full h-[85vh] bg-neutral-900 flex items-center justify-center">
        <span className="text-text-muted text-lg">Unable to load featured content.</span>
      </div>
    );
  }

  const backdropUrl = item.backdrop_path
    ? `${TMDB_IMAGE_BASE}${item.backdrop_path}`
    : null;

  const title = "title" in item ? item.title : item.name;
  const year = "release_date" in item
    ? item.release_date?.slice(0, 4)
    : item.first_air_date?.slice(0, 4);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;

  const truncatedOverview =
    item.overview.length > 180
      ? item.overview.slice(0, 180) + "…"
      : item.overview;

  return (
    <div className="relative w-full h-[88vh] overflow-hidden">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
          quality={90}
        />
      )}

      {/* Multi-layer gradient for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Content */}
      <div className="absolute bottom-[15%] md:bottom-[22%] left-6 md:left-16 max-w-[90%] md:max-w-2xl z-10">
        {/* Meta badges */}
        <div className="flex items-center flex-wrap gap-2 md:gap-3 mb-4">
          {rating && (
            <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <Star className="w-3 h-3 fill-yellow-400" />
              {rating}
            </span>
          )}
          {year && (
            <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-white/60 border border-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <Calendar className="w-3 h-3" />
              {year}
            </span>
          )}
          <span className="text-[10px] md:text-xs font-bold text-white/50 border border-white/15 px-2.5 py-1 rounded-full backdrop-blur-sm uppercase tracking-wide">
            {type === "movie" ? "Movie" : "Series"}
          </span>
        </div>

        <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[1.1] tracking-tighter mb-4">
          {title}
        </h1>
        <p className="text-xs md:text-base text-white/80 leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] line-clamp-3 md:line-clamp-none">
          {truncatedOverview}
        </p>

        <div className="mt-6 md:mt-0">
          <HeroBannerButtons itemId={item.id} contentType={type} />
        </div>
      </div>
    </div>
  );
}
