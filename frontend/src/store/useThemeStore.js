import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    document.documentElement.setAttribute("data-theme", theme); // ← ADD THIS
    set({ theme });
  },
}));