import Head from "next/head";
import { FC } from "react";
import { SEOProps } from "./SEO.types";

const defaultTitle = "OR Studio | Architectural Visualization";
const defaultDescription =
  "High-end minimalist renders, architecture videos, and visual storytelling.";
const defaultImage = "https://yourdomain.com/og-image.jpg";
const defaultURL = "https://yourdomain.com";

const SEO: FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  url = defaultURL,
  image = defaultImage,
  canonical,
}) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  );
};

export default SEO;
