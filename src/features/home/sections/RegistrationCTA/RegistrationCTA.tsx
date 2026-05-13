import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import Button from "@/features/shared/components/Button";
import styles from "./RegistrationCTA.module.scss";

export default function RegistrationCTA() {
  return (
    <section className={styles.registrationCTA}>
      <div className={styles.backgroundImage} />
      <div className={styles.overlay} />
      
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp" delay={0.1}>
          <div className={styles.content}>
            <span className={styles.tagline}>INSCRIPTION</span>
            <h2 className={styles.title}>
              Rejoignez le dialogue<br />
              constitutionnel international
            </h2>
            <p className={styles.description}>
              Participez à cet événement unique où experts, praticiens<br />
              et universitaires se rassemblent pour façonner l&apos;avenir<br />
              du droit constitutionnel en Afrique et au-delà.
            </p>
            <div className={styles.actions}>
              <Button variant="gold" size="lg" href="/inscription" className={styles.primaryBtn}>
                S&apos;INSCRIRE AU COLLOQUE <span className={styles.arrow}>→</span>
              </Button>
              <Button variant="outline" size="lg" href="/programme" className={styles.secondaryBtn}>
                VOIR LE PROGRAMME
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
