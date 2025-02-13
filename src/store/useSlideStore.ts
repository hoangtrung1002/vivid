import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Slide } from "@/lib/types";
import { Project } from "@prisma/client";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setProject: (project: Project) => void;
  setSlides: (slides: Slide[]) => void;
}

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      slides: [],
      project: null,
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project: Project) => set({ project }),
    }),
    { name: "slides-storage" },
  ),
);
