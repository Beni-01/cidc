import styles from "./PageHero.module.scss";

interface PageHeroProps {
  title: string;
  description?: string;
  image?: string;
}

export default function PageHero({ title, description, image }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      {image && <div className={styles.bgImage} style={{ backgroundImage: `url(${image})` }} />}
      
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          <div className={styles.breadcrumb}>
            <span>Accueil</span>
            <span className={styles.separator}>/</span>
            <span className={styles.active}>{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
