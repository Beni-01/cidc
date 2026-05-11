import Button from "@/features/shared/components/Button";
import styles from "./NewsletterBox.module.scss";

export default function NewsletterBox() {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <h3 className={styles.title}>Restez informé</h3>
        <p className={styles.description}>
          Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et mises à jour concernant le colloque.
        </p>
      </div>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Votre adresse email"
          className={styles.input}
          required
        />
        <Button variant="gold" type="submit" className={styles.submit}>
          S&apos;abonner
        </Button>
      </form>
    </div>
  );
}
