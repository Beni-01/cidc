import Button from "@/features/shared/components/Button";
import styles from "./DownloadBar.module.scss";

export default function DownloadBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.iconBox}>
            <span className={styles.icon}>📅</span>
          </div>
          <div className={styles.content}>
            <h3>Préparez votre expérience</h3>
            <p>Consultez le programme complet des trois jours et planifiez vos sessions.</p>
          </div>
          <Button variant="gold" className={styles.btn}>
            TÉLÉCHARGER LE PROGRAMME <span className={styles.arrow}>↓</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
