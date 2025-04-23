import { useCallback, useEffect, useState } from "react";
import {
  usePageContext,
  PageContextProvider,
} from "@contexts/PageContext/PageContext";
import HomePreloader from "@components/preloaders/HomePreloader/HomePreloader";
import { loadDynamicImports } from "@utils/loadDynamicImports";
import { useMediaQuery } from "react-responsive";
import { fetchData } from "@utils/api";
import Head from "next/head";
import styles from "@styles/pages/home.module.scss";

const { DirectionalButton, ScrollSectionNavigation, SectionWrapper } =
  loadDynamicImports("common", [
    "DirectionalButton",
    "ScrollSectionNavigation",
    "SectionWrapper",
  ]);

// const { HomePreloader } = loadDynamicImports("preloaders", ["HomePreloader"]);

const { LandingPageSection, AboutBanner, WorkBanner } = loadDynamicImports(
  "sections/home",
  ["LandingPageSection", "AboutBanner", "WorkBanner"]
);

function HomeContent() {
  const { preloader, isPreloaderVisible, projectsData } = usePageContext();
  const homeData = projectsData.home;

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (!isPreloaderVisible) {
      const timeout = setTimeout(() => setIsPageReady(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [isPreloaderVisible]);

  const handleScroll = useCallback((targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const {
    LandingPictures = {},
    EvenYehuda = {},
    Hevron8PenthouseRooftop = {},
    City69 = {},
  } = homeData?.projects || {};

  const sections = [
    {
      component: <LandingPageSection images={LandingPictures?.images || []} />,
      id: "landingPage",
    },
    { component: <AboutBanner />, id: "aboutBanner" },
    {
      component: <WorkBanner images={EvenYehuda?.images || []} />,
      id: "evenYehuda",
    },
    {
      component: <WorkBanner images={Hevron8PenthouseRooftop?.images || []} />,
      id: "hevron8",
    },
    {
      component: <WorkBanner images={City69?.images || []} />,
      id: "last-section",
    },
  ];

  if (sections.length === 1) return sections[0]?.component;

  return (
    <>
      <Head>
        <title>OR Studio | Home</title>
      </Head>
      <div className={styles.homePage}>
        {sections.map((section, index) => (
          <SectionWrapper key={section.id} id={section.id}>
            <div
              data-section-id={section.id}
              className={styles.sectionContainer}>
              {section.component}
            </div>
            <DirectionalButton
              direction={index < sections.length - 1 ? "down" : "up"}
              width={isMobile ? 2.3 : 3}
              height={isMobile ? 2.3 : 3}
              onClick={() =>
                handleScroll(sections[(index + 1) % sections.length]?.id)
              }
            />
          </SectionWrapper>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const homeData = await fetchData("home");
    return { props: { homeData } };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: { homeData: { projects: {}, frontImages: [], category: "" } },
    };
  }
};

export default function HomePage({ homeData }) {
  return (
    <PageContextProvider
      timeoutDuration={2500}
      endpoints={["home"]}
      preloader={<HomePreloader />}>
      <HomeContent />
    </PageContextProvider>
  );
}
