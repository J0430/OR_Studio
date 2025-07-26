// pages/_app.tsx
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import "@styles/globals.scss";
import { dynamicImportComponents } from "@utils/dynamicImportComponents";
import { PageContextProvider } from "@contexts/PageContext";

const { Header } = dynamicImportComponents("nav", ["Header"]);

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

      <ThemeProvider>
        <PageContextProvider>
          <Header />
          <Component {...pageProps} />
        </PageContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
