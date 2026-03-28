"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";

/**
 * Reads ?auth=required from URL (set by middleware) and
 * auto-opens the AuthModal, then cleans the URL.
 */
export default function AuthGate() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const openAuthModal = useModalStore((s) => s.openAuthModal);

  useEffect(() => {
    if (searchParams.get("auth") === "required") {
      openAuthModal();
      // Clean the URL without a full navigation
      router.replace("/", { scroll: false });
    }
  }, [searchParams, openAuthModal, router]);

  return null;
}
