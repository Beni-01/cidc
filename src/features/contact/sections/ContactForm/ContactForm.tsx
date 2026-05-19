"use client";

import { FormEvent, useState } from "react";
import AnimatedSection from "@/features/shared/components/AnimatedSection/AnimatedSection";
import Button from "@/features/shared/components/Button";
import styles from "./ContactForm.module.scss";

const contactItems = [
  { label: "Adresse", value: "Blazon Hotel\n119, Blvd Colonel Tshatshi\nKinshasa – Gombe, RDC", icon: "⌖" },
  { label: "Téléphone", value: "+243 812 963 415", icon: "☎" },
  { label: "E-mail", value: "colloqueja2025@proton.me", icon: "✉" },
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      nom: String(formData.get("nom") || ""),
      email: String(formData.get("email") || ""),
      telephone: String(formData.get("telephone") || ""),
      sujet: String(formData.get("sujet") || ""),
      message: String(formData.get("message") || ""),
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Votre message a bien été enregistré. Nous revenons vers vous rapidement.");
      event.currentTarget.reset();
    } else {
      setStatus("error");
      setMessage("Impossible d'envoyer le message pour le moment. Vérifiez les champs et réessayez.");
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <AnimatedSection animation="slideInLeft" className={styles.mapCard}>
            <iframe
              className={styles.mapFrame}
              title="Carte Blazon Hotel, Kinshasa"
              src="https://www.google.com/maps?q=Blazon%20Hotel%20119%20Boulevard%20Colonel%20Tshatshi%20Kinshasa%20Gombe%20RDC&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.hotelCard}>
              <strong>Blazon Hotel</strong>
              <span>119, Blvd Colonel Tshatshi<br />Kinshasa – Gombe</span>
              <small>4,4 ★ (822 avis)</small>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Blazon%20Hotel%20119%20Boulevard%20Colonel%20Tshatshi%20Kinshasa%20Gombe%20RDC"
                target="_blank"
                rel="noreferrer"
              >
                Ouvrir dans Maps
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideInRight" className={styles.infoCard}>
            <h2>Nos coordonnées</h2>
            <p>Notre équipe est disponible pour vous accompagner et répondre à toutes vos demandes.</p>
            {contactItems.map((item) => (
              <div className={styles.contactItem} key={item.label}>
                <span>{item.icon}</span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
            <div className={styles.socials}>
              {["f", "in", "ig", "x", "wa"].map((social) => (
                <a href="#" key={social} aria-label={social}>{social}</a>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection animation="softZoom">
          <div className={styles.formCard}>
            <h2>Envoyer un message</h2>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.row3}>
                <input name="nom" placeholder="Nom complet" required />
                <input name="email" type="email" placeholder="Adresse e-mail" required />
                <input name="telephone" placeholder="Téléphone" />
              </div>
              <input name="sujet" placeholder="Sujet" required />
              <textarea name="message" placeholder="Votre message" rows={6} required />
              {message && <p className={`${styles.formStatus} ${styles[status]}`}>{message}</p>}
              <Button variant="gold" type="submit" className={styles.submit} disabled={status === "loading"}>
                {status === "loading" ? "ENVOI..." : "ENVOYER LE MESSAGE"} <span>→</span>
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
