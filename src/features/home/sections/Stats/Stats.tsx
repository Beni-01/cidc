import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import CountUpNumber from "@/features/shared/components/CountUpNumber";
import type { ReactNode } from "react";
import styles from "./Stats.module.scss";

type StatItem = {
  value?: number;
  suffix?: string;
  label: string;
  icon: ReactNode;
};

export default function Stats() {
  const statsData: StatItem[] = [
    {
      value: 40,
      suffix: "+",
      label: "Pays représentés",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      value: 60,
      suffix: "+",
      label: "Conférences & panels",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      ),
    },
    {
      value: 2000,
      suffix: "+",
      label: "Participants",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" />
        </svg>
      ),
    },
    {
      value: 50,
      suffix: "+",
      label: "Publications",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      label: "Partenaires institutionnels",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4 8 4v14" />
          <path d="M10 21v-7a2 2 0 0 1 4 0v7" />
          <circle cx="12" cy="10" r="1" />
        </svg>
      ),
    },
  ];

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp" delay={0.1}>
          <div className={styles.wrapper}>
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.icon}>{stat.icon}</div>
              <div className={styles.statContent}>
                {typeof stat.value === "number" && (
                  <div className={styles.value}>
                    <CountUpNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                )}
                <div className={styles.label}>{stat.label}</div>
              </div>
              {index < statsData.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
