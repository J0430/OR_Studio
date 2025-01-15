// "use client";

// import { useState, useEffect } from "react";
// import Preloader from "../components/preloader/Preloader";

// export default function RootLayout({ children }) {

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPreloaderDone(true);
//     }, 4000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Render the preloader if not finished
//   if (!preloaderDone) {
//     return <Preloader setPreloaderDone={setPreloaderDone} />;
//   }

//   return (
//     <html lang="en">
//       <head>
//         <link
//           rel="preload"
//           href="/assets/fonts/Raleway-Regular.ttf"
//           as="font"
//           type="font/ttf"
//           crossOrigin="anonymous"
//         />
//         <link
//           rel="preload"
//           href="/assets/fonts/Raleway-Bold.ttf"
//           as="font"
//           type="font/ttf"
//           crossOrigin="anonymous"
//         />

//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }
