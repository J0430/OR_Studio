import { loadDynamicImports } from "@utils/loadDynamicImports";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import Head from "next/head";
import "@styles/globals.scss";

const { Header } = loadDynamicImports("nav", ["Header"]);

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
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
