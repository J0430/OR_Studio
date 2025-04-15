import dynamic from "next/dynamic";

/**
 * Dynamically loads components from /components/* using a clean fallback.
 *
 * @param {string} basePath - Relative path from /components (e.g. "common", "sections/home")
 * @param {string[]} componentNames - List of component names (folder & file must match)
 * @returns {Record<string, React.ComponentType>}
 */
export const loadDynamicImports = (basePath, componentNames = []) => {
  console.log(basePath);
  return Object.fromEntries(
    componentNames.map((name) => {
      const Component = dynamic(
        () => import(`../components/${basePath}/${name}/${name}`),
        {
          ssr: false,
          loading: () => null, // ✅ safest possible
        }
      );
      return [name, Component];
    })
  );
};
