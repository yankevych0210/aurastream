"use client";

import { Play, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import { useAuthAction } from "@/hooks/useAuthAction";

interface HeroBannerButtonsProps {
  itemId: number;
  contentType: "movie" | "tv";
}

export default function HeroBannerButtons({ itemId, contentType }: HeroBannerButtonsProps) {
  const { openModal } = useModalStore();
  const { requireAuth } = useAuthAction();

  return (
    <div className="flex items-center gap-3 pt-4">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => requireAuth(() => openModal(itemId, contentType))}
        className="flex items-center gap-2.5 bg-white text-black font-bold px-7 py-3 rounded-md hover:bg-white/85 transition-colors text-sm md:text-base shadow-lg"
      >
        <Play className="w-5 h-5 fill-black" />
        Play
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => requireAuth(() => openModal(itemId, contentType))}
        className="flex items-center gap-2.5 bg-white/20 text-white font-semibold px-7 py-3 rounded-md hover:bg-white/30 transition-colors backdrop-blur-md text-sm md:text-base border border-white/25"
      >
        <Info className="w-5 h-5" />
        More Info
      </motion.button>
    </div>
  );
}
