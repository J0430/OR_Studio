// pages/_app.tsx
import { ThemeProvider } from "next-themes";
import { NavProvider } from "@contexts/NavContext";
import Head from "next/head";
import "@styles/globals.scss";

import { dynamicImportComponents } from "utils/dynamicImportComponents";
import { PreloaderContextProvider } from "@contexts/PreloaderContext";

const { Header } = dynamicImportComponents("nav", ["Header"]);

function MyApp({ Component, pageProps }) {
  console.log("PreloaderContextProvider:", PreloaderContextProvider);

  return (
    <>
      <Head>
        <title>OR Studio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Architectural Visualization Website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavProvider>
        <PreloaderContextProvider>
          <Header />
          <Component {...pageProps} />

          <div className="pageGradientOverlay" />
        </PreloaderContextProvider>
      </NavProvider>
    </>
  );
}

export default MyApp;
