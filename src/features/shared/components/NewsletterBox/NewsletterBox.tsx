"use client";

import Button from "@/features/shared/components/Button";
import styles from "./NewsletterBox.module.scss";

export default function NewsletterBox() {
  return (
    <div className={styles.box}>
      <div className={styles.iconBox}>
        <span className={styles.icon}>✉</span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>Restez informé</h3>
        <p className={styles.description}>
          Recevez nos actualités, appels à communications<br />
          et informations sur le colloque.
        </p>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Votre adresse e-mail"
          className={styles.input}
          required
        />
        <Button variant="dark" type="submit" className={styles.submit}>
          S&apos;ABONNER
        </Button>
      </form>
    </div>
  );
}
