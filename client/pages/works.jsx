import React, { useState, useMemo, useCallback } from "react";
import { fetchData } from "@utils/api";
import { AnimatePresence } from "framer-motion";
import {
  useWorksPreloader,
  WorksPreloaderProvider,
} from "@contexts/WorksPreloaderContext"; // ✅ Updated Provider
import { categories } from "@utils/globals";
import { fisherYatesShuffle, interleaveArrays } from "@utils/utils";
import dynamic from "next/dynamic";
import Head from "next/head";
import style from "@styles/pages/works.module.scss"; // ✅ Updated SCSS import

// ✅ Updated Dynamic imports
const WorksModal = dynamic(
  () => import("@components/sections/works/WorksModal/WorksModal"),
  { ssr: false }
);

const WorksPreloader = dynamic(
  () => import("@components/preloaders/WorksPreloader/WorksPreloader"),
  {
    ssr: false, // 🔥 This is the magic
  }
);

const WorksControl = dynamic(
  () => import("@components/sections/works/WorksControl/WorksControl"),
  { loading: () => <div>Loading Categories...</div> }
);

const WorksGrid = dynamic(
  () => import("@components/sections/works/WorksGrid/WorksGrid"),
  { ssr: false }
);

// ✅ Static Props to Fetch Data
export async function getStaticProps() {
  try {
    const categoriesData = await Promise.all(
      ["residential", "commercial", "urbanPlanning", "office"].map(fetchData)
    );

    return {
      props: {
        residential: categoriesData[0],
        commercial: categoriesData[1],
        urbanPlanning: categoriesData[2],
        office: categoriesData[3],
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: {
        residential: { works: {}, frontImages: [], category: "" },
        commercial: { works: {}, frontImages: [], category: "" },
        urbanPlanning: { works: {}, frontImages: [], category: "" },
        office: { works: {}, frontImages: [], category: "" },
      },
    };
  }
}

function WorksContent({ residential, commercial, urbanPlanning, office }) {
  const { isPreloaderVisible } = useWorksPreloader(); // ✅ Updated hook

  const [state, setState] = useState({
    categorySelected: categories[1] || "Residential",
    selectedImage: null,
    selectedWork: null, // ✅ Updated to "Work"
  });

  const categoryDataMap = useMemo(
    () => ({
      Residential: residential?.frontImages,
      "Urban Planning": urbanPlanning?.frontImages,
      Commercial: commercial?.frontImages,
      Office: office?.frontImages,
      Works: interleaveArrays([
        residential?.frontImages || [],
        urbanPlanning?.frontImages || [],
        commercial?.frontImages || [],
        office?.frontImages || [],
      ]),
    }),
    [residential, urbanPlanning, commercial, office]
  );

  const works = useMemo(() => {
    return fisherYatesShuffle(categoryDataMap[state.categorySelected] || []);
  }, [state.categorySelected, categoryDataMap]);

  const handleCategoryClick = useCallback((categoryName) => {
    setState((prevState) => ({ ...prevState, categorySelected: categoryName }));
  }, []);

  const handleImageClick = useCallback(
    (imageSrc) => {
      const allWorks = {
        ...residential?.works,
        ...urbanPlanning?.works,
        ...commercial?.works,
        ...office?.works,
      };

      const matchedWork = Object.values(allWorks).find(
        (work) => work?.frontImage === imageSrc
      );

      if (matchedWork) {
        setState((prevState) => ({
          ...prevState,
          selectedImage: imageSrc,
          selectedWork: matchedWork,
        }));
      }
    },
    [residential, urbanPlanning, commercial, office]
  );

  const handleCloseModal = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedImage: null,
      selectedWork: null,
    }));
  }, []);

  return (
    <>
      <Head>
        <title>OR Studio | Works</title>
        <meta
          name="description"
          content="Get in touch with OR Studio to bring your architectural vision to life. Contact us today!"
        />
        <meta
          name="keywords"
          content="Architecture, Visualization, Contact, OR Studio"
        />
        <meta name="author" content="OR Studio" />
        <meta property="og:title" content="Contact Us | OR Studio" />
        <meta
          property="og:description"
          content="Get in touch with OR Studio to bring your architectural vision to life."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dugudxkyu/image/upload/v1728046515/Offir%20projects/Contact%20us/contact_us_uphao8.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {isPreloaderVisible && <WorksPreloader />}
      <main className={style.worksPage}>
        <WorksControl
          categories={categories}
          selectedCategory={state.categorySelected}
          onCategorySelect={handleCategoryClick}
        />

        <WorksGrid
          works={works} // ✅ Updated to "works"
          category={state.categorySelected}
          onImageClick={handleImageClick}
        />

        <AnimatePresence>
          {state.selectedImage && state.selectedWork && (
            <WorksModal
              selectedImage={state.selectedImage}
              work={state.selectedWork}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

// ✅ Main Export wrapped in Provider
export default function WorksPage(props) {
  return (
    <WorksPreloaderProvider>
      <WorksContent {...props} />
    </WorksPreloaderProvider>
  );
}
