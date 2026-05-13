import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import Button from "@/features/shared/components/Button";
import Image from "next/image";
import { speakersData } from "@/features/intervenants/sections/SpeakersGrid/speakers.data";
import styles from "./SpeakersPreview.module.scss";

export default function SpeakersPreview() {
  const previewSpeakers = speakersData.slice(0, 6);

  return (
    <section className={styles.speakers}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp" className={styles.header}>
          <span className={styles.tagline}>NOS EXPERTS</span>
          <h2 className={styles.title}>Des voix qui façonnent le droit constitutionnel</h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {previewSpeakers.map((speaker, index) => (
            <AnimatedSection key={speaker.id} animation="scaleIn" delay={index * 0.05}>
              <div className={styles.card}>
                <div className={styles.medallion}>
                  <div className={styles.medallionRing} />
                  <div className={styles.glow} />
                  <div className={styles.imageWrapper}>
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className={styles.image}
                    />
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.name}>{speaker.name}</h3>
                  <p className={styles.role}>{speaker.role}</p>
                  <div className={styles.shimmerBar} />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeInUp" delay={0.2} className={styles.footer}>
          <Button variant="outline" href="/intervenants" className={styles.btn}>
            VOIR TOUS LES INTERVENANTS
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
