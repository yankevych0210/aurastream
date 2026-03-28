"use client";

import { useSession } from "next-auth/react";
import { useModalStore } from "@/store/useModalStore";
import { useCallback } from "react";

/**
 * Hook that wraps any action with an auth check.
 * If the user is not signed in, opens the AuthModal instead.
 */
export function useAuthAction() {
  const { data: session } = useSession();
  const openAuthModal = useModalStore((s) => s.openAuthModal);

  const requireAuth = useCallback(
    (action: () => void) => {
      if (!session) {
        openAuthModal();
        return;
      }
      action();
    },
    [session, openAuthModal]
  );

  return { requireAuth, isAuthenticated: !!session };
}
