"use client";

import Button from "@/features/shared/components/Button";
import styles from "./ContactForm.module.scss";

export default function ContactForm() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <h2 className={styles.title}>Nos coordonnées</h2>
            <p className={styles.desc}>Notre équipe est disponible pour vous accompagner et répondre à toutes vos demandes.</p>
            
            <div className={styles.contactItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <strong>Adresse</strong>
                <p>Yaoundé, Cameroun<br />Faculté des Sciences Juridiques et Politiques</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <span className={styles.icon}>📞</span>
              <div>
                <strong>Téléphone</strong>
                <p>+237 6 12 34 56 78</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <span className={styles.icon}>✉</span>
              <div>
                <strong>E-mail</strong>
                <p>contact@colloque-droit-constitutionnel.org</p>
              </div>
            </div>
          </div>
          
          <div className={styles.formWrapper}>
            <h3 className={styles.formTitle}>Envoyer un message</h3>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Nom complet</label>
                  <input type="text" placeholder="Votre nom" required />
                </div>
                <div className={styles.field}>
                  <label>Adresse e-mail</label>
                  <input type="email" placeholder="Votre email" required />
                </div>
              </div>
              
              <div className={styles.field}>
                <label>Sujet</label>
                <input type="text" placeholder="Sujet de votre message" required />
              </div>
              
              <div className={styles.field}>
                <label>Votre message</label>
                <textarea placeholder="Comment pouvons-nous vous aider ?" rows={5} required></textarea>
              </div>
              
              <Button variant="gold" type="submit" className={styles.submit}>
                ENVOYER LE MESSAGE <span>→</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
