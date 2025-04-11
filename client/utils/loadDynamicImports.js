import dynamic from "next/dynamic";

/**
 * Dynamically imports multiple components from a given page/section folder.
 *
 * @param {string} page - Folder name under "sections" (e.g., "home", "about")
 * @param {string[]} componentNames - List of component names (e.g., ["LandingPage", "AboutBanner"])
 * @returns {Record<string, React.ComponentType>} Object mapping component names to dynamic imports
 */
export const loadDynamicImports = (page, componentNames = []) => {
  if (!page || !Array.isArray(componentNames)) {
    throw new Error("Invalid arguments passed to loadDynamicImports.");
  }

  return Object.fromEntries(
    componentNames.map((name) => {
      const Component = dynamic(
        () => import(`@components/sections/${page}/${name}/${name}`),
        {
          loading: () => <div>Loading {name}...</div>,
          ssr: false,
        }
      );

      return [name, Component];
    })
  );
};
