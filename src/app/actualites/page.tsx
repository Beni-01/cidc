import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import NewsletterBox from "@/features/shared/components/NewsletterBox";
import { getArticles } from "./articles";
import styles from "./page.module.scss";

const briefs = [
  "Réformes institutionnelles",
  "Protection des libertés",
  "Justice électorale",
  "Pouvoirs publics",
];

export default async function NewsPage() {
  const allArticles = await getArticles();
  const [featured, ...secondaryArticles] = allArticles;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection animation="slideInLeft">
            <span>Actualités</span>
            <h1>Actualités</h1>
            <p>
              Une veille éditoriale pour éclairer les débats institutionnels et
              relier l&apos;actualité aux enjeux du colloque.
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection animation="slideInRight" className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src="/images/hero-gavel.webp"
            alt="Symboles de justice et de constitution"
            fill
            priority
            className={styles.heroImage}
          />
        </AnimatedSection>
      </section>

      <section className={styles.briefs}>
        {briefs.map((brief, index) => (
          <AnimatedSection key={brief} animation="fadeIn" delay={index * 0.06}>
            <span>{brief}</span>
          </AnimatedSection>
        ))}
      </section>

      <section className={styles.news}>
        <AnimatedSection animation="fadeInUp" className={styles.sectionHeader}>
          <span>À la une</span>
          <h2>Des analyses pour lire les institutions autrement</h2>
          <p>
            Une sélection de contenus pour comprendre les tensions actuelles du
            droit constitutionnel et préparer les échanges du colloque.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" className={styles.featuredArticle}>
          <div className={styles.featuredMedia}>
            <Image
              src={featured.image}
              alt="Livre et notes de droit constitutionnel"
              fill
              className={styles.coverImage}
            />
          </div>
          <div className={styles.featuredText}>
            <div className={styles.articleMeta}>
              <span>{featured.category}</span>
              <time>{featured.date}</time>
              <span>{featured.readTime}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <Link href={`/actualites/${featured.slug}`}>Lire l&apos;article</Link>
          </div>
        </AnimatedSection>

        <div className={styles.articleGrid}>
          {secondaryArticles.map((article, index) => (
            <AnimatedSection key={article.title} animation="fadeInUp" delay={index * 0.08}>
              <Link href={`/actualites/${article.slug}`} className={styles.articleCard}>
                <div className={styles.cardImage}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className={styles.coverImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.articleMeta}>
                    <span>{article.category}</span>
                    <time>{article.date}</time>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <strong>Lire l&apos;article</strong>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className={styles.insightBand}>
        <AnimatedSection animation="slideInLeft" className={styles.insightText}>
          <span>Observatoire</span>
          <h2>Une veille pensée pour devenir utile aux débats publics.</h2>
        </AnimatedSection>
        <div className={styles.insightList}>
          {allArticles.slice(0, 3).map((article, index) => (
            <AnimatedSection key={article.slug} animation="fadeInUp" delay={index * 0.06}>
              <Link href={`/actualites/${article.slug}`} className={styles.insightItem}>
                <small>0{index + 1}</small>
                <div>
                  <span>{article.category}</span>
                  <strong>{article.title}</strong>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <AnimatedSection className={styles.editorial}>
        <div>
          <span>Note éditoriale</span>
          <h2>Transformer la veille juridique en conversations utiles.</h2>
        </div>
        <p>
          Les contenus publiés ici préparent les débats du colloque: ils donnent
          du contexte, ouvrent des pistes et facilitent les rencontres entre
          praticiens, enseignants et institutions.
        </p>
      </AnimatedSection>

      <AnimatedSection className={styles.fullCta}>
        <div>
          <span>Participer</span>
          <h2>Rejoignez le colloque et prenez part aux débats constitutionnels.</h2>
        </div>
        <Link href="/inscription">S&apos;inscrire maintenant</Link>
      </AnimatedSection>

      <section className={styles.newsletterWrap}>
        <AnimatedSection>
          <NewsletterBox />
        </AnimatedSection>
      </section>
    </div>
  );
}
