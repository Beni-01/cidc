import Image from "next/image";
import Button from "@/features/shared/components/Button";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.edition}>ÉDITION 2026</span>
          <h1 className={styles.title}>
            Comprendre.<br />
            Débattre.<br />
            Renforcer la<br />
            Constitution.
          </h1>
          <div className={styles.underline} />
          <p className={styles.description}>
            Un rendez-vous international dédié aux enjeux contemporains du droit constitutionnel et à la consolidation de l&apos;État de droit.
          </p>
          <div className={styles.actions}>
            <Button variant="gold" size="lg" href="/about" className={styles.btn}>
              DÉCOUVRIR LE COLLOQUE <span className={styles.arrow}>→</span>
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.angledBg} />
          <div className={styles.imageWrapper}>
            <Image
              src="/images/hero-gavel.webp"
              alt="Gavel and Constitution"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className={styles.image}
            />
          </div>
          <div className={styles.decoration}>
            <div className={styles.dots} />
            <div className={styles.columnIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 22h20M4 22V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v17M8 7v10M12 7v10M16 7v10M4 7h16" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
