"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import styles from "./page.module.scss";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Connexion impossible.");
      }

      router.push(nextPath.startsWith("/admin") ? nextPath : "/admin");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Connexion impossible.");
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link className={styles.backLink} href="/">
          Retour au site
        </Link>
        <span>Accès sécurisé</span>
        <h1>Connexion Admin</h1>
        <p>
          Connectez-vous pour gérer les newsletters, participants, messages,
          articles et utilisateurs du CMS.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Nom d&apos;utilisateur
            <input
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              required
              value={username}
            />
          </label>
          <label>
            Mot de passe
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          {message && <p className={styles.error}>{message}</p>}

          <button disabled={status === "loading"} type="submit">
            {status === "loading" ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <small>
          Identifiants par défaut: <strong>admin</strong> / <strong>admin</strong>.
          Pensez à créer un autre utilisateur avec un mot de passe robuste.
        </small>
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className={styles.page} />}>
      <AdminLoginForm />
    </Suspense>
  );
}
