import Button from "@/features/shared/components/Button";
import Image from "next/image";
import { speakersData } from "@/features/intervenants/sections/SpeakersGrid/speakers.data";
import styles from "./SpeakersPreview.module.scss";

export default function SpeakersPreview() {
  const previewSpeakers = speakersData.slice(0, 12);

  return (
    <section className={styles.speakers}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tagline}>NOS INTERVENANTS</span>
          <h2 className={styles.title}>Des voix d&apos;excellence, des perspectives d&apos;avenir</h2>
        </div>

        <div className={styles.grid}>
          {previewSpeakers.map((speaker) => (
            <div key={speaker.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{speaker.name}</h3>
                <p className={styles.role}>{speaker.role}</p>
                <div className={styles.country}>
                  <span className={styles.flag}>{speaker.countryCode}</span>
                  <span className={styles.countryName}>{speaker.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Button variant="outline" href="/intervenants" className={styles.btn}>
            VOIR TOUS LES INTERVENANTS
          </Button>
        </div>
      </div>
    </section>
  );
}
