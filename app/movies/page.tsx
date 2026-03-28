import { Suspense } from "react";
import { cookies } from "next/headers";
import HeroBanner from "@/components/home/HeroBanner";
import MovieRow from "@/components/home/MovieRow";
import { MovieRowSkeleton, HeroBannerSkeleton } from "@/components/shared/Skeletons";
import {
  getTopRatedMovies,
  getMoviesByGenre,
  getTrending,
} from "@/lib/api/tmdbService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies — AuraStream",
  description: "Browse the best and latest movies on AuraStream.",
};

const GENRES = [
  { id: 28, en: "Action", ru: "Боевики", uk: "Бойовики" },
  { id: 35, en: "Comedy", ru: "Комедии", uk: "Комедії" },
  { id: 27, en: "Horror", ru: "Ужасы", uk: "Жахи" },
  { id: 10749, en: "Romance", ru: "Мелодрамы", uk: "Мелодрами" },
  { id: 878, en: "Sci-Fi", ru: "Фантастика", uk: "Фантастика" },
];

async function CategoryRow({ id, name, lang }: { id: number; name: string; lang: string }) {
  const data = await getMoviesByGenre(id, lang);
  return <MovieRow title={name} items={data.results} />;
}

async function TrendingMoviesRow({ lang }: { lang: string }) {
  const data = await getTrending("movie", lang);
  const title = lang === "ru-RU" ? "Популярные фильмы" : lang === "uk-UA" ? "Популярні фільми" : "Trending Movies";
  return <MovieRow title={title} items={data.results} />;
}

async function TopRatedMoviesRow({ lang }: { lang: string }) {
  const data = await getTopRatedMovies(lang);
  const title = lang === "ru-RU" ? "Топ рейтинга" : lang === "uk-UA" ? "Найкращі оцінки" : "Top Rated Movies";
  return <MovieRow title={title} items={data.results} />;
}

export default async function MoviesPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("aurastream-lang")?.value || "en-US";
  const langKey = lang.split("-")[0] as "en" | "ru" | "uk";

  return (
    <main className="min-h-screen bg-background pb-16">
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroBanner lang={lang} />
      </Suspense>

      <div className="relative z-10 -mt-24 space-y-4">
        <Suspense fallback={<MovieRowSkeleton />}>
          <TrendingMoviesRow lang={lang} />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <TopRatedMoviesRow lang={lang} />
        </Suspense>

        {GENRES.map((genre) => (
          <Suspense key={genre.id} fallback={<MovieRowSkeleton />}>
            <CategoryRow id={genre.id} name={genre[langKey] || genre.en} lang={lang} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}
