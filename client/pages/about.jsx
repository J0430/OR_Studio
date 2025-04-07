import Image from "next/image";
import Head from "next/head";
import styles from "@styles/pages/about.module.scss";

export default function About() {
  return (
    <>
      <Head>
        <title>OR Studio | About Us</title>
        <meta
          name="description"
          content="Learn about Jami, a top digital production and design agency, pushing the limits of storytelling, design, and technology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="About Us | Jami Digital Production"
        />
        <meta
          property="og:description"
          content="Discover how Jami crafts innovative stories and experiences through cutting-edge design and technology."
        />
        <meta property="og:image" content="/images/header.jpg" />
        <meta property="og:type" content="website" />
      </Head>

      <section className={styles.main}>
        <div className={styles.row}>
          <div className={styles.textMain}>
            <h1>
              about<span>.</span>
            </h1>
            <p className={styles.intro}>
              I'm a product designer based in sunny Sydney, Australia.
            </p>
            <p className={styles.description}>
              Since 2005, I've enjoyed turning complex problems into simple,
              beautiful and intuitive designs. When I'm not pushing pixels,
              you'll find me cooking, gardening or working out in the park.
            </p>
          </div>
          <div className={styles.imgMain}>
            {/* You can change this src to your own image */}
            <img src="public/assets/about/IMG_2356.JPG" alt="Profile picture" />
          </div>
        </div>
      </section>
    </>
  );
}
