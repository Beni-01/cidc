import Link from "next/link";
import styles from "./InfoCards.module.scss";

const cards = [
  {
    title: "Ressources",
    description: "Accédez aux actes, études, rapports et analyses sur le droit constitutionnel.",
    linkText: "EXPLORER LES RESSOURCES",
    linkUrl: "/ressources",
    icon: "📖", // Placeholder for actual icon/svg
    variant: "dark", // Dark green
  },
  {
    title: "Programme",
    description: "Découvrez le programme complet : sessions, ateliers, tables rondes et événements spéciaux.",
    linkText: "CONSULTER LE PROGRAMME",
    linkUrl: "/programme",
    icon: "👥",
    variant: "gold", // Gold gradient/bg
  },
  {
    title: "Réseau",
    description: "Rejoignez une communauté internationale engagée pour le renforcement de la culture constitutionnelle.",
    linkText: "REJOINDRE LE RÉSEAU",
    linkUrl: "/contact", // Or a specific network page
    icon: "🌐",
    variant: "light", // Light cream/grey with dot pattern
  },
];

export default function InfoCards() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((card, index) => (
            <div key={index} className={`${styles.card} ${styles[card.variant]}`}>
              <div className={styles.icon}>{card.icon}</div>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.description}>{card.description}</p>
              <Link href={card.linkUrl} className={styles.link}>
                {card.linkText} <span className={styles.arrow}>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
