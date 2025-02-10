import React from "react";
import { motion } from "framer-motion";
import { Project } from "@prisma/client";
import { containerVariants } from "@/lib/constants";
import ProjectCard from "@/components/global/projects/project-card/page";

interface Props {
  projects: Project[];
}

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          projectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project.themeName}
        />
      ))}
    </motion.div>
  );
};
export default Projects;
