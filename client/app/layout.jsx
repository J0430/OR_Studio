import "@styles/globals.scss";
import { PreloaderProvider } from "@contexts/MainPreloaderContext";
import { NavProvider } from "@contexts/NavContext";
import Header from "@components/nav/Header/Header";
import localFont from "next/font/local";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
const raleway = localFont({
  src: [
    { path: "fonts/Raleway-Regular.woff2", weight: "400", style: "normal" },
    { path: "fonts/Raleway-Bold.woff2", weight: "700", style: "normal" },
    { path: "fonts/Raleway-Light.woff2", weight: "300", style: "normal" },
  ],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata = {
  title: "OR Studio",
  description: "Architectural Visualization Website",
  icons: { icon: "/favicon.ico" },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={raleway.variable}>
      <body>
        <PreloaderProvider>
          <NavProvider>
            <Header />
            <ErrorBoundary>
              {children} {/* ✅ Wrap children with ErrorBoundary */}
            </ErrorBoundary>
          </NavProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
