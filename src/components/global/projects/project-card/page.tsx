"use client";

import React, { useState } from "react";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import { itemVariants, themes, toastCustomStyles } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "@/components/global/projects/project-card/thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "@/components/global/aler-dialog/page";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/projects";

interface Props {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
}

const ProjectCard = ({
  projectId,
  createdAt,
  isDelete,
  slideData,
  title,
  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setSlides } = useSlideStore();
  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };
  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Project not found", {
        description: "Please try again.",
        style: toastCustomStyles.error,
      });
      return;
    }
    try {
      const res = await recoverProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Something went wrong",
          style: toastCustomStyles.error,
        });
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project deleted successfully",
        style: toastCustomStyles.success,
      });
    } catch (error) {
      toast.error("Oppse!", {
        description: "Something went wrong. Please contact support",
        style: toastCustomStyles.error,
      });
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Project not found", {
        description: "Please try again.",
        style: toastCustomStyles.error,
      });
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Failed to delete project",
          style: toastCustomStyles.error,
        });
      }
      setOpen(false);
      router.refresh();
      toast.success("Success", {
        description: "Project recovered successfully",
        style: toastCustomStyles.success,
      });
    } catch (error) {
      toast.error("Oppse!", {
        description: "Something went wrong. Please contact support",
        style: toastCustomStyles.error,
      });
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${!isDelete && "hover:bg-muted/50"}`}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        {/*<ThumbnailPreview*/}
        {/*  theme={theme}*/}
        {/*   slide={JSON.parse(JSON.stringify(slideData))?.[0]}*/}
        {/*/>*/}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {timeAgo(createdAt)}
            </p>
            {isDelete ? (
              <AlertDialogBox
                description="This will recover your project and restore your data."
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleRecover}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project and sent to trash."
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                handleOpen={() => setOpen(!open)}
                onClick={handleDelete}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
