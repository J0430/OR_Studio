"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // ✅ Import Next.js Image component
import styles from "./ProjectsPreloader.module.scss";
import { useProjectsPreloader } from "@contexts/ProjectsPreloaderContext";

const ProjectsPreloader = () => {
  const { isPreloaderVisible } = useProjectsPreloader();

  return (
    isPreloaderVisible && (
      <motion.div
        className={styles.preloaderContainer}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        exit={{ opacity: 0 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}>
          <Image
            src="/assets/logos/OR_white.png" // ✅ Correctly reference `public/`
            alt="OR Studio Logo"
            width={150}
            height={150}
            priority
          />
        </motion.div>
      </motion.div>
    )
  );
};

export default ProjectsPreloader;
