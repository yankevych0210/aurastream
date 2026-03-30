import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, { ok: boolean; message: string }> = {};

  // 1. Check TMDB
  try {
    const tmdbKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!tmdbKey) throw new Error("TMDB_API_KEY not set");

    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
      headers: { Authorization: `Bearer ${tmdbKey}` },
    });
    if (!res.ok) throw new Error(`TMDB responded with ${res.status}`);
    results.tmdb = { ok: true, message: "✅ Connected" };
  } catch (e: unknown) {
    results.tmdb = { ok: false, message: `❌ ${(e as Error).message}` };
  }

  // 2. Check Supabase
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars not set");

    const supabase = createClient(url, key);
    const { error } = await supabase.from("users").select("id").limit(1);
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    results.supabase = { ok: true, message: "✅ Connected" };
  } catch (e: unknown) {
    results.supabase = { ok: false, message: `❌ ${(e as Error).message}` };
  }

  // 3. Check Google OAuth config
  const googleId = process.env.AUTH_GOOGLE_ID;
  const googleSecret = process.env.AUTH_GOOGLE_SECRET;
  const authSecret = process.env.AUTH_SECRET;

  results.google_oauth = {
    ok: !!(googleId && googleSecret && authSecret),
    message:
      googleId && googleSecret && authSecret
        ? "✅ Keys present"
        : `❌ Missing: ${[
            !googleId && "AUTH_GOOGLE_ID",
            !googleSecret && "AUTH_GOOGLE_SECRET",
            !authSecret && "AUTH_SECRET",
          ]
            .filter(Boolean)
            .join(", ")}`,
  };

  const allOk = Object.values(results).every((r) => r.ok);

  return NextResponse.json(
    { status: allOk ? "ok" : "degraded", checks: results },
    { status: allOk ? 200 : 500 }
  );
}
