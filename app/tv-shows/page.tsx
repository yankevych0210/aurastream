import { Suspense } from "react";
import { cookies } from "next/headers";
import HeroBanner from "@/components/home/HeroBanner";
import MovieRow from "@/components/home/MovieRow";
import { MovieRowSkeleton, HeroBannerSkeleton } from "@/components/shared/Skeletons";
import {
  getTopRatedTV,
  getTVByGenre,
  getTrending,
} from "@/lib/api/tmdbService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Shows — AuraStream",
  description: "Explore world-class TV series and animated shows on AuraStream.",
};

const TV_GENRES = [
  { id: 10759, en: "Action & Adventure", ru: "Боевики и Приключения", uk: "Бойовики та Пригоди" },
  { id: 35, en: "Comedy", ru: "Комедии", uk: "Комедії" },
  { id: 9648, en: "Mystery", ru: "Детективы", uk: "Детективи" },
  { id: 10765, en: "Sci-Fi & Fantasy", ru: "Фантастика и Фэнтези", uk: "Фантастика та Фентезі" },
  { id: 18, en: "Drama", ru: "Драмы", uk: "Драми" },
];

async function TVCategoryRow({ id, name, lang }: { id: number; name: string; lang: string }) {
  const data = await getTVByGenre(id, lang);
  return <MovieRow title={name} items={data.results} />;
}

async function TrendingTVRow({ lang }: { lang: string }) {
  const data = await getTrending("tv", lang);
  const title = lang === "ru-RU" ? "Популярные сериалы" : lang === "uk-UA" ? "Популярні серіали" : "Trending TV Shows";
  return <MovieRow title={title} items={data.results} />;
}

async function TopRatedTVRow({ lang }: { lang: string }) {
  const data = await getTopRatedTV(lang);
  const title = lang === "ru-RU" ? "Лучшие сериалы" : lang === "uk-UA" ? "Найкращі серіали" : "Top Rated TV Shows";
  return <MovieRow title={title} items={data.results} />;
}

export default async function TVShowsPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("aurastream-lang")?.value || "en-US";
  const langKey = lang.split("-")[0] as "en" | "ru" | "uk";

  return (
    <main className="min-h-screen bg-background pb-16">
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroBanner type="tv" lang={lang} />
      </Suspense>

      <div className="relative z-10 -mt-24 space-y-4">
        <Suspense fallback={<MovieRowSkeleton />}>
          <TrendingTVRow lang={lang} />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <TopRatedTVRow lang={lang} />
        </Suspense>

        {TV_GENRES.map((genre) => (
          <Suspense key={genre.id} fallback={<MovieRowSkeleton />}>
            <TVCategoryRow id={genre.id} name={genre[langKey] || genre.en} lang={lang} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}
