import dynamic from "next/dynamic";
import React from "react";

/**
 * Dynamically loads components with explicit default export handling.
 *
 * @param {string} basePath - Base path from components (e.g., "nav", "common")
 * @param {string[]} componentNames - Names of components to load dynamically
 * @param {boolean} [disableSSR=true] - Disable server-side rendering (default true)
 * @returns {object} - Object mapping names to dynamic components
 */
export const loadDynamicImports = (
  basePath,
  componentNames,
  disableSSR = true
) => {
  return Object.fromEntries(
    componentNames.map((name) => {
      const Component = dynamic(
        () =>
          import(`../components/${basePath}/${name}/${name}`).then(
            (mod) => mod.default || mod[name]
          ),
        {
          ssr: !disableSSR,
        }
      );
      const MemoizedComponent = React.memo(Component);

      return [name, Component];
    })
  );
};
