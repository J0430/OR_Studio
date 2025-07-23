import dynamic from "next/dynamic";

/**
 * Dynamically loads components from /components/* using a clean fallback.
 *
 * @param {string} basePath - Relative path from /components (e.g. "common", "sections/home")
 * @param {string[]} componentNames - List of component names (folder & file must match)
 * @returns {Record<string, React.ComponentType>}
 */
export const loadDynamicImports = (basePath, componentNames = []) => {
  return Object.fromEntries(
    componentNames.map((name) => {
      console.log(name);
      console.log(componentNames, `../components/${basePath}/${name}/${name}`);
      const Component = dynamic(
        () => import(`../components/${basePath}/${name}/${name}`), // Ensure your component name and path match
        {
          ssr: false, // Disabling server-side rendering
          loading: () => <div>Loading...</div>, // Provide a fallback while loading
          // Optionally add error handling logic
          onError: (error) =>
            console.error(`Failed to load component ${name}:`, error),
        }
      );

      return [name, Component];
    })
  );
};
