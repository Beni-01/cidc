import Image from "next/image";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import RegistrationForm from "@/features/inscription/sections/RegistrationForm/RegistrationForm";
import styles from "./page.module.scss";

export default function InscriptionPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <AnimatedSection animation="fadeInUp">
            <span className={styles.tagline}>INSCRIPTION</span>
            <h1>
              Rejoignez le colloque<br />
              et faites entendre <span>votre voix.</span>
            </h1>
            <i />
            <p>
              Remplissez le formulaire ci-dessous pour vous inscrire. Un email de confirmation vous sera envoyé avec tous les détails pratiques.
            </p>
          </AnimatedSection>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.dots} />
          <Image
            src="/images/hero-gavel.webp"
            alt="Balance de justice et dossier d'inscription"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <AnimatedSection animation="softZoom" className={styles.formReveal}>
        <RegistrationForm />
      </AnimatedSection>
    </div>
  );
}
