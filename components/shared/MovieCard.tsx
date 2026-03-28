"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Play, Plus } from "lucide-react";
import { Movie, TVShow } from "@/types/tmdb";
import { useModalStore } from "@/store/useModalStore";
import { useListStore } from "@/store/useListStore";
import { useAuthAction } from "@/hooks/useAuthAction";

const TMDB_POSTER_BASE = "https://image.tmdb.org/t/p/w500";

type MediaItem = Movie | TVShow;

function getTitle(item: MediaItem): string {
  return "title" in item ? item.title : item.name;
}

interface MovieCardProps {
  item: MediaItem;
}

export default function MovieCard({ item }: MovieCardProps) {
  const title = getTitle(item);
  const posterUrl = item.poster_path ? `${TMDB_POSTER_BASE}${item.poster_path}` : null;
  const openModal = useModalStore((s) => s.openModal);
  const { exists, addItem, removeItem } = useListStore();
  const { requireAuth } = useAuthAction();
  const isMovie = "title" in item;
  const rating =
    item.vote_average && item.vote_average > 0
      ? item.vote_average.toFixed(1)
      : null;
  const isFav = exists(item.id);

  return (
    <motion.div
      className="relative flex-shrink-0 w-36 md:w-44 lg:w-48 rounded-xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.07, zIndex: 20 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      onClick={() =>
        requireAuth(() => openModal(item.id, isMovie ? "movie" : "tv"))
      }
    >
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={title}
          width={208}
          height={312}
          className="w-full h-auto object-cover rounded-xl"
          sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-neutral-800 rounded-xl flex flex-col items-center justify-center text-white/30 text-xs px-3 text-center gap-2">
          <Play className="w-8 h-8 opacity-30" />
          {title}
        </div>
      )}

      {/* Rating badge */}
      {rating && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/75 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md pointer-events-none">
          <Star className="w-2.5 h-2.5 fill-yellow-400" />
          {rating}
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Add to list btn */}
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              requireAuth(() => {
                if (isFav) removeItem(item.id);
                else addItem(item);
              });
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
              isFav
                ? "bg-primary/80 border-primary"
                : "bg-black/60 border-white/30 hover:border-white"
            }`}
            title={isFav ? "Remove from list" : "Add to my list"}
          >
            <Plus
              className={`w-4 h-4 text-white transition-transform ${isFav ? "rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Play + title */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 fill-black text-black ml-0.5" />
          </div>
          <span className="text-white text-xs font-semibold line-clamp-2 leading-tight text-center">
            {title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
