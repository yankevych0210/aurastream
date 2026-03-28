import { Metadata } from "next";
import { searchMovies } from "@/lib/api/tmdbService";
import SearchClient from "@/components/search/SearchClient";
import { cookies } from "next/headers";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ? `"${q}" — Search AuraStream` : "Search — AuraStream";
  return {
    title,
    description: q
      ? `Browse results for "${q}" on AuraStream.`
      : "Search for movies and TV shows on AuraStream.",
  };
}

export const revalidate = 0;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("aurastream-lang")?.value || "en-US";
  
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? (await searchMovies(query, lang)).results : [];

  return <SearchClient initialQuery={query} initialResults={results} lang={lang} />;
}
