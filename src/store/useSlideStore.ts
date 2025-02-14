import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { themes } from "@/lib/constants";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  currentTheme: Theme;
  setProject: (project: Project) => void;
  setSlides: (slides: Slide[]) => void;
  setCurrentTheme: (theme: Theme) => void;
}

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      slides: [],
      project: null,
      currentTheme: themes[0],
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project: Project) => set({ project }),
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
    }),
    { name: "slides-storage" },
  ),
);
