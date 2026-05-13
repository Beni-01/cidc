import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import styles from "./Partners.module.scss";

const partners = [
  { name: "CSM", fullName: "Conseil Supérieur de la Magistrature", country: "RDC" },
  { name: "UPEC", fullName: "Faculté de Droit", country: "France" },
  { name: "LexisNexis", fullName: "LexisNexis", country: "International" },
  { name: "UNDP", fullName: "United Nations Development Programme", country: "International" },
  { name: "Cour Constitutionnelle", fullName: "Cour Constitutionnelle", country: "RDC" },
  { name: "Cour de Cassation", fullName: "Cour de Cassation", country: "RDC" },
  { name: "FONAREV", fullName: "Fonds National des Réparations", country: "RDC" },
  { name: "WIDAL", fullName: "Fondation Widal", country: "International" },
];

export default function Partners() {
  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <AnimatedSection animation="fadeInUp" className={styles.header}>
          <span className={styles.tagline}>NOS PARTENAIRES</span>
          <h2 className={styles.title}>Ils nous soutiennent</h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <AnimatedSection key={index} animation="fadeInUp" delay={index * 0.08}>
              <div className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.logoPlaceholder}>
                  <span>{partner.name.charAt(0)}</span>
                </div>
                <h3 className={styles.name}>{partner.name}</h3>
                <span className={styles.fullName}>{partner.fullName}</span>
              </div>
            </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
