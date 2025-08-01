// pages/_app.tsx
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import "@styles/globals.scss";
import Header from "@components/nav/Header/Header";
import { dynamicImportComponents } from "utils/dynamicImportComponents";
import { PreloaderContextProvider } from "@contexts/PreloaderContext";

// const { Header } = dynamicImportComponents("nav", ["Header"]);

function MyApp({ Component, pageProps }) {
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

      {/* <ThemeProvider> */}
      <PreloaderContextProvider>
        <Header />
        <Component {...pageProps} />
      </PreloaderContextProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default MyApp;
