import Image from "next/image";
import styles from "./PageHero.module.scss";

interface PageHeroProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  tagline?: string;
  image: string;
}

export default function PageHero({ title, description, tagline, image }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {tagline && <span className={styles.tagline}>{tagline}</span>}
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.description}>{description}</div>
        </div>
        
        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt="Hero background"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              className={styles.image}
            />
            <div className={styles.patternDots} />
          </div>
        </div>
      </div>
    </section>
  );
}
