import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import { siteConfig } from "@/features/shared/constants/site.config";
import styles from "./EventDetails.module.scss";

export default function EventDetails() {
  const { dates, location, stats } = siteConfig.event;

  return (
    <section className={styles.eventDetails}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp" delay={0.1}>
          <div className={styles.wrapper}>
          <div className={styles.locationInfo}>
            <div className={styles.iconBox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.calendarIcon}>
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
              </svg>
            </div>
            <div className={styles.text}>
              <h4 className={styles.location}>{location.toUpperCase()}</h4>
              <p className={styles.date}>{dates}</p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.value}>{stats.days.toString().padStart(2, '0')}</span>
              <span className={styles.label}>JOURS</span>
            </div>
            <div className={styles.dividerSmall} />
            <div className={styles.statItem}>
              <span className={styles.value}>{stats.sessions}</span>
              <span className={styles.label}>SESSIONS</span>
            </div>
            <div className={styles.dividerSmall} />
            <div className={styles.statItem}>
              <span className={styles.value}>{stats.speakers}</span>
              <span className={styles.label}>INTERVENANTS</span>
            </div>
            <div className={styles.dividerSmall} />
            <div className={styles.statItem}>
              <span className={styles.value}>{stats.participants}</span>
              <span className={styles.label}>PARTICIPANTS</span>
            </div>
          </div>
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
