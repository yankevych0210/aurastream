"use client";

import { useListStore } from "@/store/useListStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import MovieCard from "@/components/shared/MovieCard";
import { Film } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyListPage() {
  const { list } = useListStore();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = {
    title: language === "uk-UA" ? "Мій список" : language === "ru-RU" ? "Мой список" : "My List",
    emptyTitle: language === "uk-UA" ? "Ваш список порожній" : language === "ru-RU" ? "Ваш список пуст" : "Your list is empty",
    emptyDesc: language === "uk-UA" 
      ? "Додавайте фільми та серіали до свого списку, щоб легко знайти їх пізніше." 
      : language === "ru-RU" 
      ? "Добавляйте фильмы и сериалы в свой список, чтобы легко найти их позже." 
      : "Add movies and TV shows to your list so you can easily find them later.",
    browseBtn: language === "uk-UA" ? "Дивитися шоу" : language === "ru-RU" ? "Смотреть шоу" : "Browse Shows",
  };

  return (
    <main className="min-h-screen bg-background pt-28 pb-16 px-4 md:px-12">
      <div className="mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
          {t.title}
        </h1>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 mt-32 text-center">
          <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center">
            <Film className="w-10 h-10 text-neutral-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              {t.emptyTitle}
            </h2>
            <p className="text-text-muted max-w-sm mx-auto text-sm">
              {t.emptyDesc}
            </p>
          </div>
          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center bg-white text-black font-bold px-8 py-3 rounded hover:bg-white/80 transition-colors"
          >
            {t.browseBtn}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {list.map((item) => (
            <div key={item.id} className="relative group">
              <MovieCard item={item} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
