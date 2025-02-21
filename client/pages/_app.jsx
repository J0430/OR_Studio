import "@styles/globals.scss";
import { PreloaderProvider } from "@contexts/MainPreloaderContext";
import { NavProvider } from "@contexts/NavContext";
import Header from "@components/nav/Header/Header";
import localFont from "next/font/local";
import Head from "next/head";

// const raleway = localFont({
//   src: [
//     {
//       path: "/assets/fonts/Raleway-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "/assets/fonts/Raleway-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "/assets/fonts/Raleway-Light.woff2",
//       weight: "300",
//       style: "normal",
//     },
//   ],
//   variable: "--font-raleway",
//   display: "swap",
// });

export default function MyApp({ Component, pageProps }) {
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

      {/* <div className={raleway.variable}> */}

      <PreloaderProvider>
        <NavProvider>
          <Header />
          <Component {...pageProps} />
          {/* ✅ This renders the current page */}
        </NavProvider>
      </PreloaderProvider>
      {/* </div> */}
    </>
  );
}
