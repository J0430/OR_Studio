// pages/_app.tsx

import { ThemeProvider } from "next-themes";
import Head from "next/head";
import "@styles/globals.scss";
import { dynamicImportComponents } from "@utils/dynamicImportComponents";

const { Header } = dynamicImportComponents("nav", ["Header"]);

// const MyApp = ({ Component, pageProps }: AppProps) => {
const MyApp = ({ Component, pageProps }) => {
  console.log(Header);
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
};

export default MyApp;
