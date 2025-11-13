import { create } from "zustand";

interface CarouselState {
  focusedIndex: number;
  totalItems: number;
  setTotalItems: (count: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  focusedIndex: 0,
  totalItems: 0,
  setTotalItems: (count) => set({ totalItems: count }),
  moveRight: () =>
    set((state) => {
      if (state.totalItems <= 0) return { focusedIndex: 0 };
      return {
        focusedIndex: Math.min(state.focusedIndex + 1, state.totalItems - 1),
      };
    }),
  moveLeft: () =>
    set((state) => ({
      focusedIndex: Math.max(state.focusedIndex - 1, 0),
    })),
}));
