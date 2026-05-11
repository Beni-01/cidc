import { siteConfig } from "@/features/shared/constants/site.config";
import styles from "./EventDetails.module.scss";

export default function EventDetails() {
  const { dates, location, stats } = siteConfig.event;

  return (
    <section className={styles.eventDetails}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.icon}>📅</span>
            <div>
              <p className={styles.label}>{location.toUpperCase()}</p>
              <p className={styles.value}>{dates}</p>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.value}>{stats.days}</span>
            <span className={styles.label}>Jours</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statItem}>
            <span className={styles.value}>{stats.sessions}</span>
            <span className={styles.label}>Sessions</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statItem}>
            <span className={styles.value}>{stats.speakers}</span>
            <span className={styles.label}>Intervenants</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statItem}>
            <span className={styles.value}>{stats.participants}</span>
            <span className={styles.label}>Participants</span>
          </div>
        </div>
      </div>
    </section>
  );
}
