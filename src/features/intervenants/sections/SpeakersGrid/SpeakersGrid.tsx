import Image from "next/image";
import { speakersData } from "./speakers.data";
import styles from "./SpeakersGrid.module.scss";

export default function SpeakersGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tagline}>NOS INTERVENANTS</span>
          <h2 className={styles.title}>Des voix d&apos;excellence, des perspectives d&apos;avenir</h2>
        </div>

        <div className={styles.grid}>
          {speakersData.map((speaker) => (
            <div key={speaker.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 700px) 44vw, (max-width: 1100px) 24vw, 180px"
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={speaker.name.length > 20 ? styles.nameSmall : styles.name}>
                  {speaker.name}
                </h3>
                <p className={styles.role}>{speaker.role}</p>
                <div className={styles.country}>
                  <span className={styles.flag}>{speaker.countryCode}</span>
                  <span className={styles.countryName}>{speaker.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
