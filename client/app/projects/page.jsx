"use client";

import React from "react";
import ProjectsPreloader from "@components/preloaders/ProjectsPreloader/ProjectsPreloader";
import { ProjectsPreloaderProvider } from "@contexts/ProjectsPreloaderContext";

export default function Projects({ children }) {
  return (
    <ProjectsPreloaderProvider>
      <ProjectsPreloader />
      <main>{children}</main>
    </ProjectsPreloaderProvider>
  );
}
