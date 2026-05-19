import Image from "next/image";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import ContactForm from "@/features/contact/sections/ContactForm/ContactForm";
import NewsletterBox from "@/features/shared/components/NewsletterBox/NewsletterBox";
import styles from "./page.module.scss";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection animation="fadeInUp">
            <h1>Contact</h1>
            <p>
              Pour toute question ou information complémentaire, n&apos;hésitez pas à nous écrire ou à nous appeler. Notre équipe vous répondra avec plaisir.
            </p>
          </AnimatedSection>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src="/images/hero-gavel.webp"
            alt="Balance de justice et stylo"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <ContactForm />

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
