"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import styles from "./Countdown.module.scss";

interface TimeLeft {
  days: number;
  months: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const targetDate = new Date("2026-10-22T00:00:00");

const calculateTimeLeft = (): TimeLeft => {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, months: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days: remainingDays, months, hours, minutes, seconds };
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsClient(true);
      setTimeLeft(calculateTimeLeft());
    });

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, []);

  const timeBlocks = [
    { value: timeLeft.months, label: "MOIS", color: "#C9A84C" },
    { value: timeLeft.days, label: "JOURS", color: "#1B3A2D" },
    { value: timeLeft.hours, label: "HEURES", color: "#2A5A42" },
    { value: timeLeft.minutes, label: "MINUTES", color: "#C9A84C" },
    { value: timeLeft.seconds, label: "SECONDES", color: "#1B3A2D" },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <section className={styles.countdown}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp" className={styles.header}>
          <span className={styles.tagline}>PROCHAIN ÉVÉNEMENT</span>
          <h2 className={styles.title}>Le colloque approche</h2>
          <p className={styles.subtitle}>22 Octobre 2026 — Yaoundé, Cameroun</p>
        </AnimatedSection>

        <div className={styles.grid}>
          {timeBlocks.map((block, index) => (
            <AnimatedSection
              key={index}
              animation="softZoom"
              delay={index * 0.08}
              className={styles.cardReveal}
            >
              <div
                className={styles.card}
                style={{ "--card-color": block.color } as React.CSSProperties}
              >
                <div className={styles.cardInner}>
                  <span className={styles.value}>
                    {String(block.value).padStart(2, "0")}
                  </span>
                  <span className={styles.label}>{block.label}</span>
                </div>
                {index < timeBlocks.length - 1 && (
                  <span className={styles.separator}>:</span>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeIn" delay={0.25} className={styles.message}>
          <p>Rejoignez-nous pour ce rendez-vous exceptionnel du droit constitutionnel africain</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
