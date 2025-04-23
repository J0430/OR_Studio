// import dynamic from "next/dynamic";

// /**
//  * Dynamically loads components from /components/* using a clean fallback.
//  *
//  * @param {string} basePath - Relative path from /components (e.g. "common", "sections/home")
//  * @param {string[]} componentNames - List of component names (folder & file must match)
//  * @returns {Record<string, React.ComponentType>}
//  */
// export const loadDynamicImports = (basePath, componentNames = []) => {
//   console.log(componentNames);
//   return Object.fromEntries(
//     componentNames.map((name) => {
//       console.log(componentNames, `../components/${basePath}/${name}/${name}`);

//       console.log(name);
//       const Component = dynamic(
//         () => import(`../components/${basePath}/${name}/${name}`), // Ensure your component name and path match
//         {
//           ssr: false, // Disabling server-side rendering
//           loading: () => <div>Loading...</div>, // Provide a fallback while loading
//           // Optionally add error handling logic
//           onError: (error) =>
//             console.error(`Failed to load component ${name}:`, error),
//         }
//       );

//       return [name, Component];
//     })
//   );
// };

import dynamic from "next/dynamic";

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

      return [name, Component];
    })
  );
};
