import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  isAuthOpen: boolean;
  selectedId: number | null;
  contentType: "movie" | "tv";
  openModal: (id: number, type: "movie" | "tv") => void;
  closeModal: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isAuthOpen: false,
  selectedId: null,
  contentType: "movie",
  openModal: (id, type) => set({ isOpen: true, selectedId: id, contentType: type }),
  closeModal: () => set({ isOpen: false, selectedId: null }),
  openAuthModal: () => set({ isAuthOpen: true }),
  closeAuthModal: () => set({ isAuthOpen: false }),
}));
