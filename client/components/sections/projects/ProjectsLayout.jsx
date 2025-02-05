"use client";

import React from "react";
import ProjectsPreloader from "@components/preloaders/ProjectsPreloader/ProjectsPreloader";
import { ProjectsPreloaderProvider } from "@contexts/ProjectsPreloaderContext";

export default function ProjectsLayout({ children }) {
  return (
    <ProjectsPreloaderProvider>
      <ProjectsPreloader />
      <main>{children}</main> {/* ✅ This will wrap all project pages */}
    </ProjectsPreloaderProvider>
  );
}
