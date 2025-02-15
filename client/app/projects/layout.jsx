"use client";

import React from "react";
import { ProjectsPreloaderProvider } from "@contexts/ProjectsPreloaderContext";

export default function ProjectsLayout({ children }) {
  return <ProjectsPreloaderProvider>{children}</ProjectsPreloaderProvider>;
}
