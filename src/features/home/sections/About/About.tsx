import Image from "next/image";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/about-book.webp"
              alt="Constitution Liberté Justice Book"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.dotPattern} />
        </div>
        
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
      </div>
    </section>
  );
}
