"use client";

import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Star,
  Play,
  Loader2,
  Plus,
  Check,
  Calendar,
  Clock,
  Globe,
  Tv,
  RotateCcw,
  Server,
  Zap,
  Settings,
} from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { useListStore } from "@/store/useListStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  getMovieDetails,
  getTVDetails,
  getSimilarMovies,
  getSimilarTV,
} from "@/lib/api/tmdbService";
import { Movie, TVShow, TMDBResponse } from "@/types/tmdb";
import MovieCard from "@/components/shared/MovieCard";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function MovieModal() {
  const { isOpen, selectedId, contentType, closeModal } = useModalStore();
  const { exists, addItem, removeItem } = useListStore();
  const { language } = useLanguageStore();
  const [playerReady, setPlayerReady] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [server, setServer] = useState(1);
  const [isPlayerHovered, setIsPlayerHovered] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: detailData, isLoading: isDetailLoading } = useQuery<Movie | TVShow>({
    queryKey: [contentType, "detail", selectedId, language],
    queryFn: () =>
      contentType === "movie"
        ? getMovieDetails(selectedId!, language)
        : getTVDetails(selectedId!, language),
    enabled: !!selectedId && isOpen,
    staleTime: 1000 * 60 * 10,
  });

  const { data: similarData, isLoading: isSimilarLoading } = useQuery<
    TMDBResponse<Movie | TVShow>
  >({
    queryKey: [contentType, "similar", selectedId, language],
    queryFn: () =>
      contentType === "movie"
        ? getSimilarMovies(selectedId!, language)
        : (getSimilarTV(selectedId!, language) as unknown as Promise<TMDBResponse<Movie | TVShow>>),
    enabled: !!selectedId && isOpen,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    setPlayerReady(false);
    setShowPlayer(false);
    setServer(3);
    setIsPlayerHovered(false);
  }, [selectedId, contentType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) closeModal();
  };

  const backdropUrl = detailData?.backdrop_path
    ? `${TMDB_IMAGE_BASE}${detailData.backdrop_path}`
    : null;

  const rating = detailData?.vote_average
    ? detailData.vote_average.toFixed(1)
    : null;

  const title = detailData
    ? "title" in detailData
      ? detailData.title
      : detailData.name
    : "";

  const releaseDate = detailData
    ? "release_date" in detailData
      ? detailData.release_date
      : detailData.first_air_date
    : "";

  const isFav = selectedId ? exists(selectedId) : false;

  const handleToggleList = () => {
    if (!detailData || !selectedId) return;
    if (isFav) removeItem(selectedId);
    else addItem(detailData);
  };

  const handlePlayClick = () => {
    setShowPlayer(true);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServerChange = (s: number) => {
    if (s === server) return;
    setPlayerReady(false);
    setServer(s);
  };

  // Embed URLs for different servers
  const getEmbedUrl = () => {
    const type = contentType === "movie" ? "movie" : "tv";
    const id = selectedId;
    switch (server) {
      case 1:
        // vidsrc.cc v2 — backup CDN (same network, different path)
        return `https://vidsrc.cc/v2/embed/${type}/${id}`;
      case 2:
        // vidsrc.me — direct path format (no query param)
        return `https://vidsrc.me/embed/${type}/${id}`;
      case 3:
        // vidsrc.cc v3 — primary confirmed working
        return `https://vidsrc.cc/v3/embed/${type}/${id}`;
      case 4:
        // vidsrc.cc v2 with autoplay — alternative load
        return `https://vidsrc.cc/v2/embed/${type}/${id}`;
      default:
        return `https://vidsrc.cc/v3/embed/${type}/${id}`;
    }
  };

  const embedUrl = getEmbedUrl();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative bg-[#111111] rounded-none sm:rounded-2xl overflow-hidden w-full max-w-4xl shadow-[0_40px_100px_rgba(0,0,0,0.95)] sm:my-8 border-x sm:border border-white/[0.06]"
            initial={{ scale: 0.95, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 z-50 bg-black/70 backdrop-blur-md rounded-full p-2 hover:bg-white/15 transition-all border border-white/10 shadow-xl"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {isDetailLoading || !detailData ? (
              /* Loading skeleton */
              <div className="animate-pulse">
                <div className="w-full aspect-video bg-neutral-800/80" />
                <div className="p-8 space-y-4">
                  <div className="h-9 w-2/3 bg-neutral-700/60 rounded-lg" />
                  <div className="h-4 w-full bg-neutral-700/40 rounded" />
                  <div className="h-4 w-5/6 bg-neutral-700/40 rounded" />
                  <div className="h-4 w-4/6 bg-neutral-700/40 rounded" />
                </div>
              </div>
            ) : (
              <div ref={scrollContainerRef} className="max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>

                {/* ── Hero / Player ── */}
                <div 
                  className="relative w-full aspect-video bg-black group/player"
                  onMouseEnter={() => setIsPlayerHovered(true)}
                  onMouseLeave={() => setIsPlayerHovered(false)}
                >
                  {/* Backdrop shown when player not active */}
                  {!showPlayer && (
                    <div className="absolute inset-0 z-10">
                      {backdropUrl && (
                        <Image
                          src={backdropUrl}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="1000px"
                        />
                      )}
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {/* Play overlay button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handlePlayClick}
                          className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl hover:bg-white/25 transition-all group/play"
                        >
                          <Play className="w-8 h-8 fill-white text-white ml-1 group-hover/play:scale-110 transition-transform" />
                        </motion.button>
                      </div>
                      {/* Title overlay */}
                      <div className="absolute bottom-4 left-6 pr-12">
                        <h2 className="text-xl md:text-3xl font-black text-white tracked-tight drop-shadow-lg line-clamp-1">
                          {title}
                        </h2>
                      </div>
                    </div>
                  )}

                  {/* Iframe player */}
                  {showPlayer && (
                    <div className="relative w-full h-full">
                      {!playerReady && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black z-10">
                          {backdropUrl && (
                            <Image
                              src={backdropUrl}
                              alt={title}
                              fill
                              className="object-cover opacity-20"
                              sizes="1000px"
                            />
                          )}
                          <Loader2 className="w-10 h-10 text-primary animate-spin relative z-10" />
                          <span className="text-white/50 text-sm relative z-10">Connecting to {server === 1 ? "Primary" : `Server ${server}`}...</span>
                        </div>
                      )}

                      {/* Subdued UI Elements (Isolated to avoid fullscreen tints) */}
                      <AnimatePresence>
                        {isPlayerHovered && playerReady && (
                          <>
                            {/* Top Bar Controls */}
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl"
                            >
                              <div className="flex items-center gap-1 px-3 py-1 border-r border-white/5 mr-1 text-white/40">
                                <Zap className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Servers</span>
                              </div>
                              
                              {[1, 2, 3, 4].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => handleServerChange(s)}
                                  title={s === 1 ? "vidsrc.cc/v2" : s === 2 ? "vidsrc.me" : s === 3 ? "vidsrc.cc/v3" : "vidsrc.cc alt"}
                                  className={`px-3 h-7 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                                    server === s 
                                      ? "bg-white text-black shadow-lg" 
                                      : "text-white/40 hover:text-white hover:bg-white/10"
                                  }`}
                                >
                                  {s}
                                  {server === s && (
                                    <span className="text-[8px] opacity-60 font-medium">
                                      {s === 1 ? "v2" : s === 2 ? ".me" : s === 3 ? "v3" : "alt"}
                                    </span>
                                  )}
                                </button>
                              ))}

                              <button
                                onClick={() => {
                                  setPlayerReady(false);
                                  const temp = server;
                                  setServer(0);
                                  setTimeout(() => setServer(temp), 10);
                                }}
                                className="w-7 h-7 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all ml-1 border-l border-white/5"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </button>
                            </motion.div>

                            {/* Minimal Language Tip */}
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30"
                            >
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                                <Settings className="w-3 h-3 text-purple-400" />
                                <span className="text-[10px] font-bold text-white/90">
                                  {language === "en-US" ? "Settings" : 
                                   language === "uk-UA" ? "Налаштування" : 
                                   "Настройки"} (⚙️ CC)
                                </span>
                              </div>
                            </motion.div>

                            {/* Subtle Source Info */}
                            <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 px-2 py-1 rounded bg-black/20 text-[9px] font-medium text-white/20">
                              <Server className="w-2.5 h-2.5" />
                              Source {server}
                            </div>
                          </>
                        )}
                      </AnimatePresence>

                      <iframe
                        key={`${contentType}-${selectedId}-${server}`}
                        src={embedUrl}
                        className={`w-full h-full border-0 transition-opacity duration-1000 ${playerReady ? "opacity-100" : "opacity-0"}`}
                        allowFullScreen
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-presentation"
                        referrerPolicy="no-referrer-when-downgrade"
                        onLoad={() => setPlayerReady(true)}
                        title={`Watch ${title}`}
                      />
                    </div>
                  )}
                </div>

                {/* ── Content ── */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8">

                    {/* Left */}
                    <div className="flex-1 space-y-5">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {rating && parseFloat(rating) > 0 && (
                          <span className="flex items-center gap-1.5 text-xs font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 px-2.5 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-yellow-400" />
                            {rating}
                          </span>
                        )}
                        {releaseDate && (
                          <span className="flex items-center gap-1.5 text-xs text-white/50 border border-white/10 px-2.5 py-1 rounded-full">
                            <Calendar className="w-3 h-3" />
                            {new Date(releaseDate).getFullYear()}
                          </span>
                        )}
                        {contentType === "tv" &&
                          "number_of_seasons" in detailData &&
                          detailData.number_of_seasons && (
                            <span className="flex items-center gap-1.5 text-xs text-white/50 border border-white/10 px-2.5 py-1 rounded-full">
                              <Tv className="w-3 h-3" />
                              {detailData.number_of_seasons} Season
                              {(detailData.number_of_seasons as number) > 1 ? "s" : ""}
                            </span>
                          )}
                        {"runtime" in detailData && detailData.runtime && (
                          <span className="flex items-center gap-1.5 text-xs text-white/50 border border-white/10 px-2.5 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            {Math.floor((detailData.runtime as number) / 60)}h {(detailData.runtime as number) % 60}m
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-white/30 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                          HD
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
                        {title}
                      </h2>

                      {/* Overview */}
                      <p className="text-white/60 leading-relaxed text-sm md:text-base">
                        {detailData.overview || "No description available."}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-1">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handlePlayClick}
                          className="flex items-center gap-2.5 bg-white text-black font-bold px-7 py-2.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                        >
                          <Play className="w-5 h-5 fill-black" />
                          Watch Now
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={handleToggleList}
                          className={`w-11 h-11 border-2 rounded-full flex items-center justify-center transition-all ${
                            isFav
                              ? "border-primary bg-primary/15 shadow-lg shadow-primary/20"
                              : "border-white/30 hover:border-white"
                          }`}
                          aria-label={isFav ? "Remove from List" : "Add to List"}
                          title={isFav ? "Remove from List" : "Add to My List"}
                        >
                          {isFav ? (
                            <Check className="w-5 h-5 text-primary" />
                          ) : (
                            <Plus className="w-5 h-5 text-white/70" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Right - Meta */}
                    <div className="w-full md:w-60 space-y-3 text-sm">
                      {detailData.genres && detailData.genres.length > 0 && (
                        <div>
                          <span className="text-white/35 text-xs uppercase tracking-wider">Genres</span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {detailData.genres.map((g) => (
                              <span
                                key={g.id}
                                className="text-xs bg-white/8 text-white/70 px-2.5 py-1 rounded-full border border-white/8"
                              >
                                {g.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {rating && (
                        <div>
                          <span className="text-white/35 text-xs uppercase tracking-wider">Rating</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-bold">{rating}</span>
                            <span className="text-white/40 text-xs">/ 10</span>
                          </div>
                        </div>
                      )}

                      {"original_language" in (detailData as any) && (
                        <div>
                          <span className="text-white/35 text-xs uppercase tracking-wider">Language</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Globe className="w-3.5 h-3.5 text-white/40" />
                            <span className="text-white/70 uppercase text-xs font-medium">
                              {(detailData as any).original_language}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>


                  {/* Similar */}
                  {(similarData?.results?.length ?? 0) > 0 && (
                    <div className="mt-10 space-y-4">
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        More Like This
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
                        {isSimilarLoading
                          ? Array.from({ length: 8 }).map((_, i) => (
                              <div
                                key={i}
                                className="aspect-[2/3] bg-neutral-800/60 rounded-lg animate-pulse"
                              />
                            ))
                          : similarData?.results?.slice(0, 8).map((item) => (
                              <MovieCard key={item.id} item={item} />
                            ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
