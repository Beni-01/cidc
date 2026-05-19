"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/features/shared/components/Button";
import styles from "./NewsletterBox.module.scss";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function getErrorMessage(error: unknown) {
    if (typeof error === "string") {
      return error;
    }

    if (Array.isArray(error)) {
      return error
        .map((item) => {
          if (item && typeof item === "object" && "message" in item) {
            return String(item.message);
          }

          return null;
        })
        .filter(Boolean)
        .join(" ");
    }

    return "Impossible d'enregistrer votre adresse.";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(data?.error));
      }

      setStatus("success");
      setMessage("Merci, votre abonnement a bien été enregistré.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.iconBox}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={styles.svgIcon}
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>Restez informé</h3>
        <p className={styles.description}>
          Recevez nos actualités, appels à communications<br />
          et informations sur le colloque.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "loading"}
            required
          />
          {message && (
            <p className={`${styles.message} ${styles[status]}`} role="status">
              {message}
            </p>
          )}
        </div>
        <Button variant="dark" type="submit" className={styles.submit} disabled={status === "loading"}>
          {status === "loading" ? "ENVOI..." : "S'ABONNER"}
        </Button>
      </form>
    </div>
  );
}
