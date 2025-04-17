import { PreloaderProvider } from "@contexts/MainPreloaderContext";
import { NavProvider } from "@contexts/NavContext";
import Header from "@components/nav/Header/Header";
import Head from "next/head";
import "@styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
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

      <PreloaderProvider>
        <NavProvider>
          <Header />
          <Component {...pageProps} />
        </NavProvider>
      </PreloaderProvider>
    </>
  );
}
