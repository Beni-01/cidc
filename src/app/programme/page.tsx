"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

const days = [
  { date: "MER. 22 OCT.", label: "Jour 1", active: true },
  { date: "JEU. 23 OCT.", label: "Jour 2" },
  { date: "VEN. 24 OCT.", label: "Jour 3" },
];

const timeline = [
  {
    time: "08:00",
    range: "08:00 – 09:00",
    type: "ACCUEIL",
    title: "Accueil des participants",
    description: "Enregistrement, remise des badges et documents du colloque. Café de bienvenue.",
    location: "Hall principal",
    side: "left",
  },
  {
    time: "09:00",
    range: "09:00 – 10:30",
    type: "SESSION PLÉNIÈRE",
    title: "Allocution d’ouverture et présentation des enjeux du colloque",
    location: "Amphithéâtre A",
    side: "right",
    speakers: [
      ["Pr. Achille Mbembe", "Professeur de droit public, Université de Yaoundé II — Cameroun"],
      ["Pr. Idrissa Mbaye", "Président honoraire du Conseil constitutionnel — Sénégal"],
      ["Pr. Thérèse Kouassi", "Doyenne de la Faculté de droit — Côte d’Ivoire"],
      ["Pr. Charles Manga", "Professeur de droit public — RDC"],
    ],
  },
  {
    time: "10:45",
    range: "10:45 – 12:15",
    type: "SESSION 1",
    title: "Le pouvoir constituant : fondements et limites",
    location: "Salle 1",
    side: "left",
    speakers: [["Pr. Antoine Vauchez", "Université Paris 1 Panthéon-Sorbonne — France"]],
  },
  {
    time: "14:00",
    range: "14:00 – 15:30",
    type: "SESSION 2",
    title: "Juge constitutionnel et État de droit",
    location: "Salle 1",
    side: "right",
    speakers: [["Pr. Marie-Louise Abomo", "Professeure de droit public — Gabon"]],
  },
  {
    time: "15:45",
    range: "15:45 – 17:15",
    type: "SESSION 3",
    title: "Le lien administration-citoyen dans les constitutions modernes",
    location: "Salle 1",
    side: "left",
    speakers: [["Pr. Pap Ndiaye", "Historien et essayiste — France / Sénégal"]],
  },
  {
    time: "17:30",
    range: "17:30 – 19:00",
    type: "TABLE RONDE",
    title: "Le rôle des cours constitutionnelles en Afrique",
    location: "Amphithéâtre A",
    side: "right",
    speakers: [["Pr. Fatou Kiné Camara", "Modératrice"]],
    compactSpeakers: true,
  },
  {
    time: "20:00",
    range: "20:00",
    type: "CÉRÉMONIE",
    title: "Dîner officiel",
    location: "Hôtel Hilton, Yaoundé",
    side: "left",
    highlight: true,
  },
];

const focusItems = [
  "Ouverture officielle et enjeux du colloque",
  "Le pouvoir constituant et la légitimité constitutionnelle",
  "Le rôle du juge constitutionnel dans la consolidation de l’État de droit",
  "L’administration et le citoyen au cœur des constitutions modernes",
  "Regards croisés et perspectives africaines",
];

const themes = [
  {
    title: "Ouverture et enjeux",
    description: "Accueil officiel, cadrage scientifique et présentation des objectifs du colloque.",
    count: "2 sessions",
    items: ["Accueil des participants", "Allocution d’ouverture"],
  },
  {
    title: "Pouvoir constituant",
    description: "Fondements, limites, légitimité démocratique et mutations du pouvoir constituant.",
    count: "1 session",
    items: ["Le pouvoir constituant : fondements et limites"],
  },
  {
    title: "Justice constitutionnelle",
    description: "Rôle du juge, garanties de l’État de droit et dialogue des cours constitutionnelles.",
    count: "2 sessions",
    items: ["Juge constitutionnel et État de droit", "Cours constitutionnelles en Afrique"],
  },
  {
    title: "Citoyenneté et administration",
    description: "Lien administration-citoyen, accès aux droits et confiance institutionnelle.",
    count: "1 session",
    items: ["Le lien administration-citoyen"],
  },
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

export default function ProgrammePage() {
  const [view, setView] = useState<"chronologie" | "themes">("chronologie");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection animation="fadeInUp">
            <h1>Programme</h1>
            <p>Découvrez le déroulement du colloque et ne manquez aucune session.</p>
          </AnimatedSection>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src="/images/hero-gavel.webp"
            alt="Marteau de juge et symboles de justice"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.dateIntro}>
        <AnimatedSection animation="softZoom" className={styles.dateHeader}>
          <div className={styles.dateIcon}>
            <CalendarIcon />
          </div>
          <span>DATES</span>
          <h2>22–24 Octobre 2025</h2>
          <p>Trois jours d’échanges, de réflexions et de dialogues autour des grands enjeux constitutionnels contemporains.</p>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={0.1}>
          <div className={styles.dayTabs}>
            {days.map((day) => (
              <button key={day.label} className={`${styles.dayTab} ${day.active ? styles.active : ""}`} type="button">
                <span className={styles.tabIcon}><CalendarIcon /></span>
                <span>{day.date}</span>
                <strong>{day.label}</strong>
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className={styles.programme}>
        <div className={styles.container}>
          <div className={styles.programmeHeader}>
            <AnimatedSection animation="fadeInUp">
              <h2>Programme du jour</h2>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.1} className={styles.viewToggle}>
              <button
                className={view === "chronologie" ? styles.selected : ""}
                type="button"
                onClick={() => setView("chronologie")}
              >
                <ListIcon />Vue chronologique
              </button>
              <button
                className={view === "themes" ? styles.selected : ""}
                type="button"
                onClick={() => setView("themes")}
              >
                <GridIcon />Vue par thématiques
              </button>
            </AnimatedSection>
          </div>

          {view === "chronologie" ? (
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              {timeline.map((item, index) => (
                <AnimatedSection
                  key={`${item.time}-${item.title}`}
                  animation={item.side === "left" ? "slideInLeft" : "slideInRight"}
                  delay={index * 0.05}
                  className={`${styles.timelineItem} ${item.side === "left" ? styles.left : styles.right}`}
                >
                  <div className={styles.timeBubble}>{item.time}</div>
                  <article className={`${styles.sessionCard} ${item.highlight ? styles.highlight : ""}`}>
                    <span className={styles.type}>{item.type}</span>
                    <h3>{item.title}</h3>
                    {item.description && <p className={styles.description}>{item.description}</p>}
                    {item.speakers && (
                      <div className={styles.speakers}>
                        <strong>{item.compactSpeakers ? "Modérateur" : "Intervenants"}</strong>
                        {item.speakers.map((speaker, speakerIndex) => (
                          <div className={styles.speaker} key={speaker[0]}>
                            <span className={styles.avatar}>{speaker[0].split(" ").at(-1)?.charAt(0)}</span>
                            <p>
                              <b>{speaker[0]}</b>
                              <small>{speaker[1]}</small>
                            </p>
                            {item.compactSpeakers && speakerIndex === 0 && (
                              <span className={styles.more}>+5</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className={styles.meta}>
                      <span><LocationIcon />{item.location}</span>
                      <time>{item.range}</time>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className={styles.themeGrid}>
              {themes.map((theme, index) => (
                <AnimatedSection key={theme.title} animation="fadeInUp" delay={index * 0.07}>
                  <article className={styles.themeCard}>
                    <span>{theme.count}</span>
                    <h3>{theme.title}</h3>
                    <p>{theme.description}</p>
                    <ul>
                      {theme.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.focus}>
        <div className={styles.container}>
          <AnimatedSection animation="softZoom">
            <div className={styles.focusBox}>
              <div className={styles.focusList}>
                <span>FOCUS DU JOUR</span>
                <h2>Axes essentiels de la journée</h2>
                <ul>
                  {focusItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.quote}>
                <strong>“</strong>
                <p>« Comprendre la Constitution, c’est comprendre la société que nous voulons bâtir. »</p>
                <small>— Pr. Achille Mbembe</small>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.download}>
        <div className={styles.container}>
          <AnimatedSection animation="fadeInUp">
            <div className={styles.downloadBox}>
              <div className={styles.downloadIcon}><CalendarIcon /></div>
              <div>
                <h2>Préparez votre expérience</h2>
                <p>Consultez le programme complet des trois jours et planifiez vos sessions.</p>
              </div>
              <button type="button">TÉLÉCHARGER LE PROGRAMME <span>↓</span></button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.registrationCta}>
        <AnimatedSection animation="softZoom">
          <div className={styles.registrationBox}>
            <div>
              <span>INSCRIPTION</span>
              <h2>Réservez votre place pour le colloque</h2>
              <p>
                Assurez votre participation aux conférences, tables rondes et rencontres scientifiques du programme.
              </p>
            </div>
            <div className={styles.registrationActions}>
              <Link href="/inscription" className={styles.primaryCta}>
                S&apos;INSCRIRE AU COLLOQUE <span>→</span>
              </Link>
              <Link href="/contact" className={styles.secondaryCta}>
                POSER UNE QUESTION
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <AnimatedSection animation="softZoom">
            <NewsletterBox />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
