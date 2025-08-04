// import React, { useState, useMemo, useCallback } from "react";
// import { fetchData } from "@utils/api";
// import { AnimatePresence } from "framer-motion";
// import {
//   useWorksPreloader,
//   WorksPreloaderProvider,
// } from "@contexts/WorksPreloaderContext";
// import { categories } from "@utils/globals";
// import { loadDynamicImports } from "@utils/loadDynamicImports";
// import { fisherYatesShuffle, interleaveArrays } from "@utils/utils";
// import dynamic from "next/dynamic";
// import Head from "next/head";
// import style from "@styles/pages/works.module.scss";

// // ✅ Dynamic Imports
// const { WorksPreloader, WorksControl, WorksGrid, WorksModal } =
//   loadDynamicImports("sections/works", [
//     "WorksPreloader",
//     "WorksControl",
//     "WorksGrid",
//     "WorksModal",
//   ]);

// // ✅ Fetch data
// export async function getStaticProps() {
//   try {
//     const categoriesData = await Promise.all(
//       ["residential", "commercial", "urbanPlanning", "office"].map(fetchData)
//     );

//     return {
//       props: {
//         residential: categoriesData[0] || { projects: {} },
//         commercial: categoriesData[1] || { projects: {} },
//         urbanPlanning: categoriesData[2] || { projects: {} },
//         office: categoriesData[3] || { projects: {} },
//       },
//     };
//   } catch (error) {
//     console.error("❌ Error in getStaticProps:", error.message);
//     return {
//       props: {
//         residential: { projects: {} },
//         commercial: { projects: {} },
//         urbanPlanning: { projects: {} },
//         office: { projects: {} },
//       },
//     };
//   }
// }

// // ✅ Main WorksContent Component
// function WorksContent({ residential, commercial, urbanPlanning, office }) {
//   const { isPreloaderVisible } = useWorksPreloader();

//   // ✅ State
//   const [state, setState] = useState({
//     categorySelected: categories[1] || "Residential",
//     selectedImage: null,
//     selectedProject: null,
//   });

//   // ✅ Category Mapping
//   const categoryDataMap = useMemo(
//     () => ({
//       Residential: Object.values(residential?.projects || {}),
//       "Urban Planning": Object.values(urbanPlanning?.projects || {}),
//       Commercial: Object.values(commercial?.projects || {}),
//       Office: Object.values(office?.projects || {}),
//       Works: interleaveArrays([
//         Object.values(residential?.projects || {}),
//         Object.values(urbanPlanning?.projects || {}),
//         Object.values(commercial?.projects || {}),
//         Object.values(office?.projects || {}),
//       ]).flat(),
//     }),
//     [residential, urbanPlanning, commercial, office]
//   );

//   // ✅ Shuffled Projects
//   const works = useMemo(
//     () => fisherYatesShuffle(categoryDataMap[state.categorySelected] || []),
//     [state.categorySelected, categoryDataMap]
//   );

//   // ✅ Handle Category Click
//   const handleCategoryClick = useCallback((categoryName) => {
//     console.log("✅ Category selected:", categoryName);
//     setState((prevState) => ({
//       ...prevState,
//       categorySelected: categoryName,
//       selectedImage: null, // Reset modal when category changes
//       selectedProject: null,
//     }));
//   }, []);

//   // ✅ Handle Image Click (Main Debug)
//   const handleImageClick = useCallback(
//     (imageSrc) => {
//       const currentProjectsArray =
//         categoryDataMap[state.categorySelected] || [];

//       // Log all frontImages and images array before searching
//       currentProjectsArray.forEach((project) => {});

//       let matchedProject = currentProjectsArray.find((project) => {
//         return project.frontImage === imageSrc;
//       });

//       if (!matchedProject) {
//         matchedProject = currentProjectsArray.find((project) => {
//           return project.images?.includes(imageSrc);
//         });
//       }

//       if (matchedProject) {
//         setState((prevState) => ({
//           ...prevState,
//           selectedImage: imageSrc,
//           selectedProject: matchedProject,
//         }));
//       } else {
//         console.warn("❌ No matching project for image:", imageSrc);
//       }
//     },
//     [categoryDataMap, state.categorySelected]
//   );

//   // ✅ Close Modal
//   const handleCloseModal = useCallback(() => {
//     setState((prevState) => ({
//       ...prevState,
//       selectedImage: null,
//       selectedProject: null,
//     }));
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>OR Studio | Works</title>
//       </Head>

//       {isPreloaderVisible && <WorksPreloader />}

//       <main className={style.worksPage}>
//         <WorksControl
//           categories={categories}
//           selectedCategory={state.categorySelected}
//           onCategorySelect={handleCategoryClick}
//         />

//         <WorksGrid
//           works={works}
//           category={state.categorySelected}
//           onImageClick={handleImageClick} // ✅ Critical for opening modal
//         />

//         <AnimatePresence>
//           {state.selectedImage && state.selectedProject && (
//             <WorksModal
//               selectedImage={state.selectedImage}
//               project={state.selectedProject}
//               onClose={handleCloseModal}
//             />
//           )}
//         </AnimatePresence>
//       </main>
//     </>
//   );
// }

// // ✅ Final Export Wrapped in Provider
// export default function WorksPage(props) {
//   return (
//     <WorksPreloaderProvider>
//       <WorksContent {...props} />
//     </WorksPreloaderProvider>
//   );
// }

import { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { categories } from "utils/globals";
import {
  useWorksPreloader,
  WorksPreloaderProvider,
} from "@contexts/WorksPreloaderContext";
import dynamic from "next/dynamic";
import {
  fisherYatesShuffle,
  interleaveArrays,
  shuffleProjectImages,
} from "utils/utils";
import { loadDynamicImports } from "utils/loadDynamicImports";

import {
  residentialData,
  commercialData,
  urbanPlanningData,
  officeData,
} from "@public/data";

import styles from "@styles/pages/works.module.scss";

// ✅ Dynamic Import (No SSR) for Modal
const WorksModal = dynamic(
  () => import("@components/sections/works/WorksModal/WorksModal"),
  { ssr: false }
);

// ✅ Lazy-load rest
const { WorksControl, WorksGrid } = loadDynamicImports("sections/works", [
  "WorksControl",
  "WorksGrid",
]);

const { WorksPreloader } = loadDynamicImports("preloaders", ["WorksPreloader"]);

// ✅ Main Content
const WorksContent = () => {
  const { isPreloaderVisible } = useWorksPreloader();

  const [state, setState] = useState({
    categorySelected: categories[1] || "Residential",
    selectedImage: null,
    selectedProject: null,
  });

  const categoryDataMap = useMemo(
    () => ({
      Residential: shuffleProjectImages(
        Object.values(residentialData?.projects || {})
      ),
      "Urban Planning": shuffleProjectImages(
        Object.values(urbanPlanningData?.projects || {})
      ),
      Commercial: shuffleProjectImages(
        Object.values(commercialData?.projects || {})
      ),
      Office: shuffleProjectImages(Object.values(officeData?.projects || {})),
    }),
    []
  );

  const works = useMemo(
    () => fisherYatesShuffle(categoryDataMap[state.categorySelected] || []),
    [state.categorySelected, categoryDataMap]
  );

  const handleCategoryClick = useCallback((categoryName) => {
    setState((prevState) => ({
      ...prevState,
      categorySelected: categoryName,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

  const handleImageClick = useCallback((work) => {
    const selectedImage = work.images[0];
    const selectedProject = work;

    setState((prevState) => ({
      ...prevState,
      selectedImage,
      selectedProject,
    }));
    console.log("Clicked project:", work);
  }, []);

  const handleCloseModal = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedImage: null,
      selectedProject: null,
    }));
  }, []);

  return (
    <>
      {isPreloaderVisible && <WorksPreloader />}
      <main className={styles.worksPage}>
        <WorksControl
          categories={Object.keys(categoryDataMap)}
          selectedCategory={state.categorySelected}
          onCategorySelect={handleCategoryClick}
        />

        <WorksGrid
          works={works}
          selectedImage={state.selectedImage}
          onImageClick={handleImageClick}
        />

        <AnimatePresence mode="wait">
          {state.selectedImage && state.selectedProject && (
            <WorksModal
              selectedImage={state.selectedImage}
              project={state.selectedProject}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

// ✅ Wrapped Export
export default function WorksPage() {
  return (
    <>
      <Head>
        <title>OR Studio | Works</title>
        <meta
          name="description"
          content="Discover OR Studio's Residential, Urban Planning, Commercial and Office Architecture Projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <WorksPreloaderProvider>
        <WorksContent />
      </WorksPreloaderProvider>
    </>
  );
}
