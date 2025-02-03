import "../styles/globals.scss";
import { PreloaderProvider } from "../contexts/PreloaderContext";
import { NavProvider } from "../contexts/NavContext"; // ✅ Import Nav Context
import Header from "../components/nav/Header";

export const metadata = {
  title: "OR Studio",
  description: "Architectural Visualization Website",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <PreloaderProvider>
      <NavProvider>
        {/* ✅ Ensures the context is available everywhere */}
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
      </NavProvider>
    </PreloaderProvider>
  );
}
