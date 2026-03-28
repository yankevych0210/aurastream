import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie, TVShow } from "@/types/tmdb";

type MediaItem = Movie | TVShow;

interface ListStore {
  list: MediaItem[];
  addItem: (item: MediaItem) => void;
  removeItem: (id: number) => void;
  exists: (id: number) => boolean;
}

export const useListStore = create<ListStore>()(
  persist(
    (set, get) => ({
      list: [],
      addItem: (item) => {
        if (!get().exists(item.id)) {
          set((state) => ({ list: [...state.list, item] }));
        }
      },
      removeItem: (id) => {
        set((state) => ({ list: state.list.filter((i) => i.id !== id) }));
      },
      exists: (id) => {
        return get().list.some((i) => i.id === id);
      },
    }),
    {
      name: "aurastream-list",
    }
  )
);
