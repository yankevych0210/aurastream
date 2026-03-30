import { Suspense } from "react";
import MovieRow from "@/components/home/MovieRow";
import { MovieRowSkeleton } from "@/components/shared/Skeletons";
import { getTrending } from "@/lib/api/tmdbService";
import { Metadata } from "next";

// Always fetch fresh data at request time — never statically prerender
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New & Popular — AuraStream",
  description: "Discover what's new and popular today on AuraStream.",
};

async function TrendingAllRow() {
  try {
    const [data, tvData] = await Promise.all([
      getTrending("movie"),
      getTrending("tv"),
    ]);

    return (
      <>
        <MovieRow title="New Movies" items={data.results} />
        <div className="mt-8">
          <MovieRow title="Popular TV Series" items={tvData.results} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch trending content:", error);
    return (
      <div className="text-text-muted text-center py-12">
        <p>Unable to load trending content right now. Please try again later.</p>
      </div>
    );
  }
}

export default function NewAndPopularPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-16 px-4 md:px-12">
      <div className="mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
          New & Popular
        </h1>
        <p className="text-text-muted mt-2 text-sm md:text-base">
          The most watched movies and TV shows over the last 24 hours.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-12">
            <MovieRowSkeleton />
            <MovieRowSkeleton />
          </div>
        }
      >
        <TrendingAllRow />
      </Suspense>
    </main>
  );
}
