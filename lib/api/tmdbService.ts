import tmdbClient from "./axiosConfig";
import { Movie, TVShow, Video, TMDBResponse } from "@/types/tmdb";

// Trending
export async function getTrending(type: "movie", language?: string): Promise<TMDBResponse<Movie>>;
export async function getTrending(type: "tv", language?: string): Promise<TMDBResponse<TVShow>>;
export async function getTrending(
  type: "movie" | "tv",
  language?: string
): Promise<TMDBResponse<Movie> | TMDBResponse<TVShow>> {
  const response = await tmdbClient.get<TMDBResponse<Movie> | TMDBResponse<TVShow>>(
    `/trending/${type}/day`,
    { params: { language } }
  );
  return response.data;
}

// Movies
export const getTopRatedMovies = async (language?: string): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>("/movie/top_rated", {
    params: { language }
  });
  return response.data;
};

export const getMoviesByGenre = async (genreId: number, language?: string): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>("/discover/movie", {
    params: { with_genres: genreId, language },
  });
  return response.data;
};

export const getMovieDetails = async (id: number, language?: string): Promise<Movie> => {
  const response = await tmdbClient.get<Movie>(`/movie/${id}`, {
    params: { append_to_response: "genres", language },
  });
  return response.data;
};

export const getSimilarMovies = async (id: number, language?: string): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>(`/movie/${id}/similar`, {
    params: { language }
  });
  return response.data;
};

// TV Shows
export const getTopRatedTV = async (language?: string): Promise<TMDBResponse<TVShow>> => {
  const response = await tmdbClient.get<TMDBResponse<TVShow>>("/tv/top_rated", {
    params: { language }
  });
  return response.data;
};

export const getTVByGenre = async (genreId: number, language?: string): Promise<TMDBResponse<TVShow>> => {
  const response = await tmdbClient.get<TMDBResponse<TVShow>>("/discover/tv", {
    params: { with_genres: genreId, language },
  });
  return response.data;
};

export const getTVDetails = async (id: number, language?: string): Promise<TVShow> => {
  const response = await tmdbClient.get<TVShow>(`/tv/${id}`, {
    params: { append_to_response: "genres", language },
  });
  return response.data;
};

export const getSimilarTV = async (id: number, language?: string): Promise<TMDBResponse<TVShow>> => {
  const response = await tmdbClient.get<TMDBResponse<TVShow>>(`/tv/${id}/similar`, {
    params: { language }
  });
  return response.data;
};

// Search
export const searchMovies = async (query: string, language?: string): Promise<TMDBResponse<Movie>> => {
  const response = await tmdbClient.get<TMDBResponse<Movie>>("/search/movie", {
    params: { query, language },
  });
  return response.data;
};

export const searchMulti = async (query: string, language?: string): Promise<any[]> => {
  const response = await tmdbClient.get<TMDBResponse<any>>("/search/multi", {
    params: { query, language },
  });
  return response.data.results;
};

// Misc
export const getMovieVideos = async (id: number, language?: string): Promise<{ id: number; results: Video[] }> => {
  const response = await tmdbClient.get<{ id: number; results: Video[] }>(`/movie/${id}/videos`, {
    params: { language }
  });
  return response.data;
};
