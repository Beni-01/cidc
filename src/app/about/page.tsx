import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import NewsletterBox from "@/features/shared/components/NewsletterBox";
import styles from "./page.module.scss";

const commitments = [
  {
    value: "Dialogue",
    text: "Créer un espace exigeant où chercheurs, magistrats, décideurs et étudiants confrontent leurs lectures de la Constitution.",
  },
  {
    value: "Transmission",
    text: "Rendre les grands débats constitutionnels accessibles par des formats clairs, documentés et orientés vers l'action.",
  },
  {
    value: "Coopération",
    text: "Relier les expériences africaines et internationales pour nourrir une culture commune de l'État de droit.",
  },
];

const milestones = [
  "Conférences plénières avec des voix académiques et institutionnelles",
  "Tables rondes sur les défis contemporains du constitutionnalisme",
  "Ressources partagées pour prolonger les échanges après le colloque",
  "Rencontres professionnelles dédiées aux collaborations futures",
];

const impactStats = [
  { value: "04", label: "axes scientifiques" },
  { value: "03", label: "jours de dialogue" },
  { value: "60+", label: "intervenants attendus" },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection animation="slideInLeft">
            <span className={styles.eyebrow}>À propos</span>
            <h1>À propos du colloque</h1>
            <p>
              Une rencontre internationale pour comprendre les mutations
              constitutionnelles et renforcer la culture de l&apos;État de droit.
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection animation="slideInRight" className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src="/images/about-book.webp"
            alt="Livre constitutionnel et symboles de justice"
            fill
            priority
            className={styles.heroImage}
          />
        </AnimatedSection>
      </section>

      <section className={styles.manifesto}>
        <AnimatedSection animation="fadeInUp" className={styles.manifestoText}>
          <span className={styles.sectionLabel}>Pourquoi ce colloque</span>
          <h2>Faire passer la Constitution du texte à la pratique.</h2>
          <p>
            Le colloque est conçu comme un espace de travail: on y analyse les
            textes, mais surtout les conditions concrètes qui permettent aux
            institutions de protéger les libertés, d&apos;arbitrer les crises et de
            rendre compte aux citoyens.
          </p>
        </AnimatedSection>
        <div className={styles.impactGrid}>
          {impactStats.map((item, index) => (
            <AnimatedSection key={item.label} animation="softZoom" delay={index * 0.06}>
              <div className={styles.impactCard}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className={styles.intro}>
        <AnimatedSection className={styles.introCard}>
          <span className={styles.sectionLabel}>Notre vision</span>
          <h2>Faire du droit constitutionnel un levier de dialogue public.</h2>
          <p>
            Nous croyons que la Constitution ne se résume pas à un texte: elle
            organise les libertés, protège les institutions et donne une méthode
            pour résoudre les tensions démocratiques.
          </p>
        </AnimatedSection>
        <div className={styles.commitmentGrid}>
          {commitments.map((item, index) => (
            <AnimatedSection key={item.value} animation="fadeInUp" delay={index * 0.08}>
              <article className={styles.commitmentCard}>
                <span>{`0${index + 1}`}</span>
                <h3>{item.value}</h3>
                <p>{item.text}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className={styles.experience}>
        <AnimatedSection animation="slideInLeft" className={styles.experienceImage}>
          <Image
            src="/images/hero-gavel.webp"
            alt="Marteau de justice sur un livre de constitution"
            fill
            className={styles.coverImage}
          />
        </AnimatedSection>
        <AnimatedSection animation="slideInRight" className={styles.experienceText}>
          <span className={styles.sectionLabel}>Ce que nous construisons</span>
          <h2>Une expérience pensée pour apprendre, débattre et coopérer.</h2>
          <ul>
            {milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </AnimatedSection>
      </section>

      <section className={styles.method}>
        <AnimatedSection animation="fadeInUp" className={styles.methodHeader}>
          <span className={styles.sectionLabel}>Méthode</span>
          <h2>Un format pensé pour produire des échanges utiles.</h2>
        </AnimatedSection>
        <div className={styles.methodGrid}>
          {["Écouter", "Confronter", "Documenter", "Transmettre"].map((item, index) => (
            <AnimatedSection key={item} animation="fadeInUp" delay={index * 0.06}>
              <article className={styles.methodCard}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
                <p>
                  {index === 0 && "Partir des expériences de terrain, des décisions et des pratiques institutionnelles."}
                  {index === 1 && "Mettre en discussion les approches académiques, juridictionnelles et administratives."}
                  {index === 2 && "Transformer les interventions en ressources consultables après le colloque."}
                  {index === 3 && "Diffuser une culture constitutionnelle claire auprès d'un public plus large."}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <AnimatedSection className={styles.fullCta}>
        <div>
          <span>Rejoindre le mouvement</span>
          <h2>Participez aux échanges qui façonnent la culture constitutionnelle.</h2>
        </div>
        <Link href="/inscription">Réserver ma place</Link>
      </AnimatedSection>

      <section className={styles.newsletterWrap}>
        <AnimatedSection>
          <NewsletterBox />
        </AnimatedSection>
      </section>
    </div>
  );
}
