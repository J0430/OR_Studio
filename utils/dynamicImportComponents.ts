import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Dynamically loads components from /components/* using folder/file convention.
 *
 * @param basePath - Relative path from /components (e.g. "common", "sections/home")
 * @param componentNames - Component names (must match folder + filename)
 * @returns Object mapping name to lazy-loaded React components
 */
export const dynamicImportComponents = (
  basePath: string,
  componentNames: string[]
): Record<string, ComponentType<any>> => {
  return Object.fromEntries(
    componentNames.map((name) => {
      const Component = dynamic(
        () => import(`../components/${basePath}/${name}/${name}`),
        {
          ssr: false,
        }
      );

      return [name, Component];
    })
  );
};
