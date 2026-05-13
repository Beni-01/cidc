import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import NewsletterBox from "@/features/shared/components/NewsletterBox";
import { getArticleBySlug, getArticles } from "../articles";
import styles from "./page.module.scss";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articles = await getArticles();
  const relatedArticles = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection animation="slideInLeft">
            <Link href="/actualites" className={styles.backLink}>
              ← Retour aux actualités
            </Link>
            <div className={styles.meta}>
              <span>{article.category}</span>
              <time>{article.date}</time>
              <span>{article.readTime}</span>
            </div>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
          </AnimatedSection>
        </div>
        <AnimatedSection animation="slideInRight" className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className={styles.heroImage}
          />
        </AnimatedSection>
      </section>

      <article className={styles.article}>
        <AnimatedSection animation="fadeInUp" className={styles.articleIntro}>
          <span>Lecture</span>
          <p>{article.intro}</p>
        </AnimatedSection>

        <div className={styles.articleBody}>
          <AnimatedSection animation="fadeInUp" className={styles.content}>
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote>{article.quote}</blockquote>
            <footer>— {article.author}</footer>
          </AnimatedSection>

          <AnimatedSection animation="slideInRight" className={styles.aside}>
            <span>À retenir</span>
            <h2>Un article pour préparer le dialogue.</h2>
            <p>
              Cette lecture ouvre des pistes pour les sessions du colloque et
              les échanges entre chercheurs, praticiens et institutions.
            </p>
            <Link href="/inscription">Participer au colloque</Link>
          </AnimatedSection>
        </div>
      </article>

      <section className={styles.related}>
        <AnimatedSection animation="fadeInUp" className={styles.sectionHeader}>
          <span>À lire aussi</span>
          <h2>Prolonger la veille constitutionnelle</h2>
        </AnimatedSection>
        <div className={styles.relatedGrid}>
          {relatedArticles.map((item, index) => (
            <AnimatedSection key={item.slug} animation="fadeInUp" delay={index * 0.06}>
              <Link href={`/actualites/${item.slug}`} className={styles.relatedCard}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <AnimatedSection className={styles.fullCta}>
        <div>
          <span>Inscription</span>
          <h2>Rejoignez les discussions autour du droit constitutionnel.</h2>
        </div>
        <Link href="/inscription">S&apos;inscrire</Link>
      </AnimatedSection>

      <section className={styles.newsletterWrap}>
        <AnimatedSection>
          <NewsletterBox />
        </AnimatedSection>
      </section>
    </main>
  );
}
