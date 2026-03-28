"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LanguageCode = "en-US" | "ru-RU" | "uk-UA";

interface LanguageState {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en-US",
      setLanguage: (lang) => {
        set({ language: lang });
        if (typeof document !== "undefined") {
          document.cookie = `aurastream-lang=${lang}; path=/; max-age=31536000`;
          // Force page refresh for server components to update
          window.location.reload();
        }
      },
    }),
    {
      name: "aurastream-language",
    }
  )
);
