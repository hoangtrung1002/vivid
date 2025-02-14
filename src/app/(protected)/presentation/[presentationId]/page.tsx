"use client";

import React, { useEffect, useState } from "react";
import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { getProjectById } from "@/actions/projects";
import { toast } from "sonner";
import { themes, toastCustomStyles } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { DndProvider } from "react-dnd";

const Page = () => {
  // TODO: create presentation view
  const {
    slides,
    project,
    currentTheme,
    setProject,
    setCurrentTheme,
    setSlides,
  } = useSlideStore();
  const params = useParams();
  const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params.presenationId as string);
        if (res.status !== 200 || !res.data) {
          toast.error("Error", {
            description: "Unable to fetch project",
            style: toastCustomStyles.error,
          });
          redirect("/dashboard");
        }
        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName,
        );
        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        toast.error("Error", {
          description: "An unexpected error occurred.",
          style: toastCustomStyles.error,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // return <DndProvider></DndProvider>;
};
export default Page;
