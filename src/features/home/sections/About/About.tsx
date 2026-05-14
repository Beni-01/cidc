import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import Image from "next/image";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <AnimatedSection animation="slideInLeft" delay={0.1} className={styles.visualWrapper}>
          <div className={styles.visual}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/about-book.webp"
                alt="Constitution Liberté Justice Book"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                className={styles.image}
              />
            </div>
            <div className={styles.dotPattern} />
            <div className={styles.dotPatternBottom} />
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slideInRight" delay={0.2} className={styles.contentWrapper}>
          <div className={styles.content}>
            <span className={styles.tagline}>À PROPOS</span>
            <h2 className={styles.title}>
              Le Colloque international<br />
              de droit constitutionnel
            </h2>
            <p className={styles.description}>
              Notre mission est de favoriser la réflexion, le partage d&apos;expériences et le dialogue entre universitaires, praticiens, institutions et étudiants autour des grands enjeux constitutionnels actuels.
            </p>
            <p className={styles.description}>
              Conférences, panels, ateliers et publications pour penser ensemble des constitutions plus justes, résilientes et adaptées aux défis de notre temps.
            </p>
          </div>
          <div className={styles.dotPatternRight} />
        </AnimatedSection>
      </div>
    </section>
  );
}
