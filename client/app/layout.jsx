import "../styles/globals.css";
import { PreloaderProvider } from "../contexts/PreloaderContext";
import Header from "../components/nav/Header";

export const metadata = {
  title: "OR Studio",
  description: "Architectural Visualization Website",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <PreloaderProvider>
      <html lang="en">
        <head>
          <link
            rel="preload"
            href="/assets/fonts/Raleway-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
        </head>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </PreloaderProvider>
  );
}
