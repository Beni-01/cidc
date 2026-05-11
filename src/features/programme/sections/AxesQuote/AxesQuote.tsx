import styles from "./AxesQuote.module.scss";

export default function AxesQuote() {
  const axes = [
    "Ouverture officielle et enjeux du colloque",
    "Le pouvoir constituant et la légitimité constitutionnelle",
    "Le rôle du juge constitutionnel dans la consolidation de l'État de droit",
    "L'administration et le citoyen au cœur des constitutions modernes",
    "Regards croisés et perspectives africaines",
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.axes}>
            <span className={styles.tagline}>FOCUS DU JOUR</span>
            <h3 className={styles.title}>Axes essentiels de la journée</h3>
            <ul className={styles.list}>
              {axes.map((axis, i) => (
                <li key={i} className={styles.item}>
                  <span className={styles.check}>✓</span>
                  {axis}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.quoteBox}>
            <div className={styles.quoteIcon}>“</div>
            <p className={styles.quoteText}>
              « Comprendre la Constitution, c&apos;est comprendre la société que nous voulons bâtir. »
            </p>
            <p className={styles.author}>— Pr. Achille Mbembe</p>
          </div>
        </div>
      </div>
    </section>
  );
}
