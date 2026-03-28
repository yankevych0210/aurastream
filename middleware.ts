import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/my-list", "/search", "/movies", "/tv-shows", "/new"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuthenticated) {
    const url = new URL("/", req.url);
    url.searchParams.set("auth", "required");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/my-list/:path*",
    "/search/:path*",
    "/movies/:path*",
    "/tv-shows/:path*",
    "/new/:path*",
  ],
};
