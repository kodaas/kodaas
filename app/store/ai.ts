import { create } from "zustand";

interface AIStore {
  isLoading: boolean;

  setLoading: (value: boolean) => void;
}

export const useAIStore = create<AIStore>((set) => ({
  isLoading: false,

  setLoading(value) {
    set({ isLoading: value });
  },
}));
