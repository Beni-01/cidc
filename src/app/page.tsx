import { siteConfig } from "@/features/shared/constants/site.config";
import Button from "@/features/shared/components/Button";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section Placeholder */}
      <section className={styles.hero}>
        <div className={styles.overlay} />
        <div className="container">
          <div className={styles.content}>
            <span className={styles.date}>{siteConfig.event.dates}</span>
            <h1 className={styles.title}>{siteConfig.event.title}</h1>
            <p className={styles.subtitle}>{siteConfig.event.subtitle}</p>
            <div className={styles.actions}>
              <Button variant="gold" size="lg" href="/inscription">
                S'inscrire au colloque
              </Button>
              <Button variant="outline" size="lg" href="/programme" className={styles.outlineBtn}>
                Voir le programme
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections will be added here after receiving mockups */}
    </div>
  );
}
