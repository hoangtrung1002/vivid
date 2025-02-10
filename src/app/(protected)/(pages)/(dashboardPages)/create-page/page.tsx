import React, { Suspense } from "react";
import CreatePageSkeleton from "@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/skeleton";
import RenderPage from "@/app/(protected)/(pages)/(dashboardPages)/create-page/_components/render-page";

const Page = () => {
  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};
export default Page;
