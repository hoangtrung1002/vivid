import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { OutlineCard } from "@/lib/types";

type PageType = "create" | "creative-ai" | "create-scratch";

type Prompt = {
  id: string;
  createdAt: string;
  title: string;
  outlines: OutlineCard[] | [];
};

type PromptStore = {
  page: PageType;
  setPage: (page: PageType) => void;
  prompts: Prompt[] | [];
  addPrompt: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
};

const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set) => ({
        page: "create",
        setPage: (page: PageType) => {
          set({ page });
        },
        prompts: [],
        addPrompt: (prompt: Prompt) => {
          set((state) => ({ prompts: [prompt, ...state.prompts] }));
        },
        removePrompt: (id: string) => {
          set((state) => ({
            prompts: state.prompts.filter((prompt: Prompt) => prompt.id !== id),
          }));
        },
      }),
      { name: "prompts" },
    ),
  ),
);
export default usePromptStore;
