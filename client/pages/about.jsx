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

      <div className={styles.aboutPage}>
        <div className={styles.headerImage}>
          <Image
            src="/assets/categories/UrbanPlanning/up_project5/up_p5_i1.jpg"
            alt="Team"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <section className={styles.aboutSection}>
          <h1 className={styles.title}>NICE TO MEET YOU</h1>
          <blockquote className={styles.quote}>
            “It’s not wise to violate rules until you know how to observe them.”
          </blockquote>
          <div className={styles.description}>
            <p>
              Jami is one of the world’s top digital production and design
              agencies. We specialize in creating highly advanced, experiential
              works in both the advertising and entertainment industries.
            </p>
            <p>
              We’re a curious and diverse studio driven to create the most
              visually stunning stories. We’re happiest when we’re innovating
              and fanatically dedicated to our craft.
            </p>
          </div>
          <div className={styles.description}>
            <p>
              We’re known for challenging the way digital creations work. Our
              craft often incorporates everything from live action, animation
              and sound design to robust pipelines and even complex 3D engines
              (a little problem solving is part of the job).
            </p>
          </div>
        </section>

        <div className={styles.teamImage}>
          <Image
            src="/assets/categories/UrbanPlanning/up_project5/up_p5_i2.jpg"
            alt="Team"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <section className={styles.corePrinciples}>
          <div className={styles.principle}>
            <h3>📖 STORYTELLING</h3>
            <p>
              We focus on delivering transformative stories by balancing
              boldness and subtlety. Our narratives are crafted to emotionally
              engage audiences worldwide.
            </p>
          </div>

          <div className={styles.principle}>
            <h3>🎨 DESIGN & CRAFT</h3>
            <p>
              Elevating the “wow” factor through meticulous design. Our
              expertise in composition, color, and details leads to
              unforgettable visual experiences.
            </p>
          </div>

          <div className={styles.principle}>
            <h3>💡 TECHNOLOGY</h3>
            <p>
              We’re responsible for creating innovative workflows, including
              custom pipelines, proprietary software, and real-time engines.
              Always pushing the technical boundaries.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
