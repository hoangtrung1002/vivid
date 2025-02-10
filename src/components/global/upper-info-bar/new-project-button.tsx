"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { User } from "@prisma/client";

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <Button
      className="rounded-lg font-semibold"
      disabled={!user.subscription}
      onClick={() => router.push("/create-page")}
    >
      <Plus />
      New Project
    </Button>
  );
};
export default NewProjectButton;
