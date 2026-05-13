"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";

type Subscription = {
  id: number;
  email: string;
  createdAt: string;
};

type Participant = {
  id: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  organisation: string;
  ville: string;
  hasPayed: boolean;
  createdAt: string;
};

type ContactMessage = {
  id: number;
  nom: string;
  email: string;
  telephone?: string | null;
  sujet: string;
  message: string;
  createdAt: string;
};

type Article = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
};

type Overview = {
  subscriptions: Subscription[];
  participants: Participant[];
  messages: ContactMessage[];
  articles: Article[];
  counts: {
    subscriptions: number;
    participants: number;
    messages: number;
    articles: number;
  };
};

const emptyOverview: Overview = {
  subscriptions: [],
  participants: [],
  messages: [],
  articles: [],
  counts: {
    subscriptions: 0,
    participants: 0,
    messages: 0,
    articles: 0,
  },
};

const initialArticleForm = {
  category: "Analyse",
  title: "",
  excerpt: "",
  image: "/images/about-book.webp",
  intro: "",
  body: "",
  quote: "",
  author: "Rédaction",
  readTime: "5 min",
  published: true,
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function FrontOfficePage() {
  const [overview, setOverview] = useState<Overview>(emptyOverview);
  const [activeTab, setActiveTab] = useState<"newsletter" | "participants" | "messages" | "articles">("newsletter");
  const [articleForm, setArticleForm] = useState(initialArticleForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadOverview() {
    setIsLoading(true);
    const response = await fetch("/api/front-office/overview", { cache: "no-store" });
    const data = await response.json();
    setOverview(data);
    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    async function hydrateOverview() {
      try {
        const response = await fetch("/api/front-office/overview", { cache: "no-store" });
        const data = await response.json();

        if (!isMounted) {
          return;
        }

        setOverview(data);
      } catch {
        if (isMounted) {
          setMessage("Impossible de charger les données.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void hydrateOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  const latestSubscribers = useMemo(
    () => overview.subscriptions.slice(0, 6),
    [overview.subscriptions]
  );

  async function handleArticleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/front-office/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Article invalide.");
      }

      setArticleForm(initialArticleForm);
      setStatus("success");
      setMessage("Article enregistré avec succès.");
      await loadOverview();
      setActiveTab("articles");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span>Front-office</span>
          <h1>Piloter le colloque en temps réel.</h1>
          <p>
            Suivez les inscriptions newsletter, les participants, les messages
            et publiez les articles du site depuis un seul espace.
          </p>
        </div>
        <Link href="/actualites">Voir le site public</Link>
      </section>

      <section className={styles.metrics}>
        <article>
          <span>Newsletter</span>
          <strong>{overview.counts.subscriptions}</strong>
          <p>abonnés</p>
        </article>
        <article>
          <span>Participants</span>
          <strong>{overview.counts.participants}</strong>
          <p>inscrits</p>
        </article>
        <article>
          <span>Messages</span>
          <strong>{overview.counts.messages}</strong>
          <p>contacts</p>
        </article>
        <article>
          <span>Articles</span>
          <strong>{overview.counts.articles}</strong>
          <p>publiés</p>
        </article>
      </section>

      <section className={styles.workspace}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <span>Données</span>
              <h2>Suivi des interactions</h2>
            </div>
            <button type="button" onClick={() => loadOverview()}>
              Actualiser
            </button>
          </div>

          <div className={styles.tabs}>
            <button className={activeTab === "newsletter" ? styles.active : ""} onClick={() => setActiveTab("newsletter")} type="button">
              Newsletter
            </button>
            <button className={activeTab === "participants" ? styles.active : ""} onClick={() => setActiveTab("participants")} type="button">
              Participants
            </button>
            <button className={activeTab === "messages" ? styles.active : ""} onClick={() => setActiveTab("messages")} type="button">
              Messages
            </button>
            <button className={activeTab === "articles" ? styles.active : ""} onClick={() => setActiveTab("articles")} type="button">
              Articles
            </button>
          </div>

          {isLoading ? (
            <div className={styles.empty}>Chargement des données...</div>
          ) : (
            <div className={styles.tableWrap}>
              {activeTab === "newsletter" && (
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.subscriptions.map((item) => (
                      <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{formatDate(item.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "participants" && (
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Organisation</th>
                      <th>Ville</th>
                      <th>Paiement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.participants.map((item) => (
                      <tr key={item.id}>
                        <td>{item.prenom} {item.nom}</td>
                        <td>{item.email}</td>
                        <td>{item.organisation}</td>
                        <td>{item.ville}</td>
                        <td>{item.hasPayed ? "Payé" : "En attente"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "messages" && (
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Sujet</th>
                      <th>Email</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.messages.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nom}</td>
                        <td>{item.sujet}</td>
                        <td>{item.email}</td>
                        <td>{item.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "articles" && (
                <table>
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Catégorie</th>
                      <th>Statut</th>
                      <th>Lien</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.articles.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.published ? "Publié" : "Brouillon"}</td>
                        <td>
                          <Link href={`/actualites/${item.slug}`}>Ouvrir</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.quickList}>
            <span>Derniers abonnés</span>
            {latestSubscribers.length === 0 ? (
              <p>Aucun abonnement newsletter pour le moment.</p>
            ) : (
              latestSubscribers.map((item) => (
                <div key={item.id}>
                  <strong>{item.email}</strong>
                  <small>{formatDate(item.createdAt)}</small>
                </div>
              ))
            )}
          </section>

          <form className={styles.articleForm} onSubmit={handleArticleSubmit}>
            <span>Publication</span>
            <h2>Ajouter un article</h2>

            <label>
              Catégorie
              <input
                value={articleForm.category}
                onChange={(event) => setArticleForm({ ...articleForm, category: event.target.value })}
              />
            </label>
            <label>
              Titre
              <input
                value={articleForm.title}
                onChange={(event) => setArticleForm({ ...articleForm, title: event.target.value })}
                required
              />
            </label>
            <label>
              Résumé
              <textarea
                value={articleForm.excerpt}
                onChange={(event) => setArticleForm({ ...articleForm, excerpt: event.target.value })}
                required
              />
            </label>
            <label>
              Introduction
              <textarea
                value={articleForm.intro}
                onChange={(event) => setArticleForm({ ...articleForm, intro: event.target.value })}
                required
              />
            </label>
            <label>
              Article
              <textarea
                value={articleForm.body}
                onChange={(event) => setArticleForm({ ...articleForm, body: event.target.value })}
                rows={7}
                required
              />
            </label>
            <label>
              Citation
              <input
                value={articleForm.quote}
                onChange={(event) => setArticleForm({ ...articleForm, quote: event.target.value })}
                required
              />
            </label>
            <div className={styles.formGrid}>
              <label>
                Auteur
                <input
                  value={articleForm.author}
                  onChange={(event) => setArticleForm({ ...articleForm, author: event.target.value })}
                />
              </label>
              <label>
                Lecture
                <input
                  value={articleForm.readTime}
                  onChange={(event) => setArticleForm({ ...articleForm, readTime: event.target.value })}
                />
              </label>
            </div>
            <label>
              Image
              <select
                value={articleForm.image}
                onChange={(event) => setArticleForm({ ...articleForm, image: event.target.value })}
              >
                <option value="/images/about-book.webp">Livre constitutionnel</option>
                <option value="/images/hero-gavel.webp">Marteau de justice</option>
              </select>
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={articleForm.published}
                onChange={(event) => setArticleForm({ ...articleForm, published: event.target.checked })}
              />
              Publier directement
            </label>

            {message && <p className={`${styles.status} ${styles[status]}`}>{message}</p>}

            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Enregistrement..." : "Publier l'article"}
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}
