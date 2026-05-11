import Image from "next/image";
import Button from "@/features/shared/components/Button";
import { siteConfig } from "@/features/shared/constants/site.config";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.edition}>{siteConfig.event.edition}</span>
          <h1 className={styles.title}>
            Comprendre. <br />
            Débattre. <br />
            Renforcer la <span className={styles.highlight}>Constitution.</span>
          </h1>
          <p className={styles.description}>{siteConfig.event.subtitle}</p>
          <div className={styles.actions}>
            <Button variant="dark" size="lg" href="/about">
              DÉCOUVRIR LE COLLOQUE <span>→</span>
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/hero-gavel.webp"
              alt="Constitution Law"
              fill
              priority
              className={styles.image}
            />
            
            {/* Circular badge from mockup */}
            <div className={styles.badge}>
              <div className={styles.badgeCircle}>
                <div className={styles.badgeText}>
                  <span>DROIT • JUSTICE •</span>
                  <span>CONSTITUTION</span>
                </div>
                <div className={styles.badgeIcon}>⚖</div>
              </div>
            </div>

            <div className={styles.patternDots} />
          </div>
        </div>
      </div>
    </section>
  );
}
