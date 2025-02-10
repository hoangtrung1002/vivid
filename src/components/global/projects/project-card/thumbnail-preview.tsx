import React from "react";
import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";

interface Props {
  slide: Slide;
  theme: Theme;
}

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <div
      className={cn(
        "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p02",
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.backgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
          This is a slide
        </div>
      ) : (
        <div className="w-full h-full bg-gray-400 flex justify-center items-center">
          <Image className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};
export default ThumbnailPreview;
