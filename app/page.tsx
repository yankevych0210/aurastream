import { Suspense } from "react";
import { cookies } from "next/headers";
import HeroBanner from "@/components/home/HeroBanner";
import MovieRow from "@/components/home/MovieRow";
import { HeroBannerSkeleton, MovieRowSkeleton } from "@/components/shared/Skeletons";
import { getTrending, getTopRatedMovies, getMoviesByGenre } from "@/lib/api/tmdbService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AuraStream — Watch Movies & TV Shows Online",
  description:
    "Discover trending movies, top-rated films, and the best TV shows on AuraStream — your premium streaming destination.",
  openGraph: {
    title: "AuraStream — Watch Movies & TV Shows Online",
    description: "Discover trending movies and top-rated films on AuraStream.",
    siteName: "AuraStream",
    type: "website",
  },
};

// Revalidate on language change or every hour
export const revalidate = 3600;

const ACTION_GENRE_ID = 28;

async function TrendingRow({ lang }: { lang: string }) {
  const data = await getTrending("movie", lang);
  return <MovieRow title={lang === "ru-RU" ? "В тренде" : lang === "uk-UA" ? "У тренді" : "Trending Now"} items={data.results} />;
}

async function TopRatedRow({ lang }: { lang: string }) {
  const data = await getTopRatedMovies(lang);
  return <MovieRow title={lang === "ru-RU" ? "Топ рейтинга" : lang === "uk-UA" ? "Найкращі оцінки" : "Top Rated"} items={data.results} />;
}

async function ActionMoviesRow({ lang }: { lang: string }) {
  const data = await getMoviesByGenre(ACTION_GENRE_ID, lang);
  return <MovieRow title={lang === "ru-RU" ? "Боевики" : lang === "uk-UA" ? "Бойовики" : "Action Movies"} items={data.results} />;
}

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("aurastream-lang")?.value || "en-US";

  return (
    <main className="min-h-screen bg-background pb-16">
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroBanner lang={lang} />
      </Suspense>

      <div className="relative z-10 -mt-24">
        <Suspense fallback={<MovieRowSkeleton />}>
          <TrendingRow lang={lang} />
        </Suspense>
        <Suspense fallback={<MovieRowSkeleton />}>
          <TopRatedRow lang={lang} />
        </Suspense>
        <Suspense fallback={<MovieRowSkeleton />}>
          <ActionMoviesRow lang={lang} />
        </Suspense>
      </div>
    </main>
  );
}
