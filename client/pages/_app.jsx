import { useRouter } from "next/router";
import { PreloaderProvider } from "@contexts/MainPreloaderContext";
import { NavProvider } from "@contexts/NavContext";
import Header from "@components/nav/Header/Header";
import Head from "next/head";
import "@styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const currentPage = router?.pathname?.replace("/", "") || "home"; // ✅ Ensure router is defined
  const isWorksPage = currentPage === "works"; // ✅ Check if on "Works" page

  return (
    <>
      <Head>
        <title>OR Studio</title>
        <meta
          name="description"
          content="Architectural Visualization Website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PreloaderProvider>
        <NavProvider>
          {/* ✅ Apply dynamic class based on the current page */}
          <div className={isWorksPage ? "works-page" : ""}>
            <Header />
            <Component {...pageProps} />
          </div>
        </NavProvider>
      </PreloaderProvider>
    </>
  );
}
