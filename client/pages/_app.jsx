// pages/_app.tsx
import { ThemeProvider } from "next-themes";
import { NavProvider } from "@contexts/NavContext";
import Head from "next/head";
import "@styles/globals.scss";

import { dynamicImportComponents } from "utils/dynamicImportComponents";

const { Header } = dynamicImportComponents("nav", ["Header"]);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OR Studio</title>
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Architectural Visualization Website"
        />
        <meta name="apple-touch-fullscreen" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavProvider>
        <Header />
        <Component {...pageProps} />
        <div className="pageGradientOverlay" />1
      </NavProvider>
    </>
  );
}

export default MyApp;
