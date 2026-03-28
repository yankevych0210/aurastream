import axios from "axios";

// Support both server-side (TMDB_API_KEY) and client-side (NEXT_PUBLIC_TMDB_API_KEY)
const TMDB_API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    language: "en-US",
  },
  headers: {
    "Content-Type": "application/json",
    ...(TMDB_API_KEY && { Authorization: `Bearer ${TMDB_API_KEY}` }),
  },
});

export default tmdbClient;
