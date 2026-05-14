import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import NewsletterBox from "@/features/shared/components/NewsletterBox";
import styles from "./page.module.scss";

const resources = [
  {
    type: "Actes",
    title: "Actes du colloque 2025",
    description: "Synthèses, communications et conclusions issues des sessions principales.",
    meta: "PDF / 124 pages",
  },
  {
    type: "Étude",
    title: "Justice constitutionnelle et État de droit",
    description: "Note de cadrage sur le rôle des cours constitutionnelles dans la consolidation démocratique.",
    meta: "Document de travail",
  },
  {
    type: "Rapport",
    title: "Participation citoyenne et normes fondamentales",
    description: "Regards croisés sur les mécanismes de consultation, de contrôle et de redevabilité.",
    meta: "Analyse comparative",
  },
  {
    type: "Bibliographie",
    title: "Lectures essentielles",
    description: "Une sélection commentée pour préparer les discussions du colloque.",
    meta: "Sélection académique",
  },
  {
    type: "Appel",
    title: "Appels à communications",
    description: "Calendrier, axes thématiques et recommandations pour proposer une contribution.",
    meta: "Ouvert aux chercheurs",
  },
  {
    type: "Décisions",
    title: "Décisions constitutionnelles commentées",
    description: "Repères jurisprudentiels pour suivre l'évolution des libertés et des institutions.",
    meta: "Veille juridique",
  },
];

const sharedTopics = [
  "Libertés fondamentales",
  "Séparation des pouvoirs",
  "Contentieux constitutionnel",
  "Décentralisation",
  "Élections et institutions",
];

const collections = [
  {
    title: "Préparer une intervention",
    text: "Supports de cadrage, bibliographies commentées et repères méthodologiques pour structurer une contribution.",
  },
  {
    title: "Suivre les débats",
    text: "Synthèses thématiques, décisions commentées et notes de veille pour garder le fil des discussions.",
  },
  {
    title: "Partager après le colloque",
    text: "Actes, recommandations et ressources ouvertes pour prolonger les échanges avec votre institution.",
  },
];

export default function ResourcesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection animation="slideInLeft">
            <span>Ressources partagées</span>
            <h1>Ressources</h1>
            <p>
              Documents, lectures et supports utiles pour préparer vos
              interventions et prolonger les échanges du colloque.
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection animation="slideInRight" className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src="/images/about-book.webp"
            alt="Documents de droit constitutionnel"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className={styles.heroImage}
          />
        </AnimatedSection>
      </section>

      <section className={styles.topicStrip}>
        {sharedTopics.map((topic, index) => (
          <AnimatedSection key={topic} animation="fadeIn" delay={index * 0.05}>
            <span>{topic}</span>
          </AnimatedSection>
        ))}
      </section>

      <section className={styles.libraryIntro}>
        <AnimatedSection animation="slideInLeft" className={styles.libraryText}>
          <span>Centre documentaire</span>
          <h2>Des ressources classées par usage, pas seulement par format.</h2>
          <p>
            La page rassemble ce qui aide vraiment les participants: comprendre
            les enjeux avant les sessions, documenter les débats pendant le
            colloque, puis capitaliser après l&apos;événement.
          </p>
        </AnimatedSection>
        <div className={styles.collectionGrid}>
          {collections.map((item, index) => (
            <AnimatedSection key={item.title} animation="fadeInUp" delay={index * 0.06}>
              <article className={styles.collectionCard}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className={styles.resources}>
        <AnimatedSection className={styles.sectionHeader}>
          <span>Documents</span>
          <h2>Explorer les contenus disponibles</h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {resources.map((resource, index) => (
            <AnimatedSection key={resource.title} animation="fadeInUp" delay={index * 0.06}>
              <article className={styles.card}>
                <div className={styles.cardTop}>
                  <span>{resource.type}</span>
                  <strong>{resource.meta}</strong>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <Link href="/contact">Demander l&apos;accès</Link>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <AnimatedSection className={styles.featured}>
        <div className={styles.featuredText}>
          <span>Ressource phare</span>
          <h2>Guide de préparation des sessions</h2>
          <p>
            Un support clair pour suivre le programme, identifier les axes de
            discussion et organiser vos notes avant les panels.
          </p>
        </div>
        <Link href="/programme">Consulter le programme</Link>
      </AnimatedSection>

      <AnimatedSection className={styles.fullCta}>
        <div>
          <span>Inscription</span>
          <h2>Accédez aux ressources complètes en participant au colloque.</h2>
        </div>
        <Link href="/inscription">S&apos;inscrire</Link>
      </AnimatedSection>

      <section className={styles.newsletterWrap}>
        <AnimatedSection>
          <NewsletterBox />
        </AnimatedSection>
      </section>
    </div>
  );
}
