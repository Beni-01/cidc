import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`${styles.wrapper} ${styles[align]} ${light ? styles.light : ""}`}>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line} />
    </div>
  );
}
