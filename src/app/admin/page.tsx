"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
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

type Tab = "newsletter" | "participants" | "messages" | "articles";

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

const tabLabels: Record<Tab, string> = {
  newsletter: "Newsletter",
  participants: "Participants",
  messages: "Messages",
  articles: "Articles",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function AdminPage() {
  const [overview, setOverview] = useState<Overview>(emptyOverview);
  const [activeTab, setActiveTab] = useState<Tab>("newsletter");
  const [articleForm, setArticleForm] = useState(initialArticleForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadOverview() {
    setIsLoading(true);
    const response = await fetch("/api/admin/overview", { cache: "no-store" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(typeof data?.error === "string" ? data.error : "Chargement impossible.");
    }

    setOverview(data);
    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    async function hydrateOverview() {
      try {
        const response = await fetch("/api/admin/overview", { cache: "no-store" });
        const data = await response.json();

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          throw new Error(typeof data?.error === "string" ? data.error : "Chargement impossible.");
        }

        setOverview(data);
      } catch (error) {
        if (isMounted) {
          setMessage(error instanceof Error ? error.message : "Impossible de charger les données.");
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

  const pendingParticipants = useMemo(
    () => overview.participants.filter((participant) => !participant.hasPayed).length,
    [overview.participants]
  );

  async function handleRefresh() {
    setMessage("");

    try {
      await loadOverview();
      setStatus("success");
      setMessage("Données actualisées.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Actualisation impossible.");
      setIsLoading(false);
    }
  }

  async function handleArticleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/articles", {
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
      setMessage("Article enregistré et relié à la page Actualités.");
      await loadOverview();
      setActiveTab("articles");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <main className={styles.page}>
      <aside className={styles.rail}>
        <Link className={styles.brand} href="/">
          <span>CI</span>
          <strong>CMS Colloque</strong>
        </Link>
        <nav>
          {Object.entries(tabLabels).map(([key, label]) => (
            <button
              className={activeTab === key ? styles.active : ""}
              key={key}
              onClick={() => setActiveTab(key as Tab)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>
        <Link className={styles.siteLink} href="/actualites">
          Voir le site public
        </Link>
      </aside>

      <section className={styles.content}>
        <header className={styles.hero}>
          <div>
            <span>Administration</span>
            <h1>CMS léger pour piloter le contenu du colloque.</h1>
            <p>
              Centralisez les abonnés newsletter, les inscriptions, les messages
              et la publication des articles sans interface lourde.
            </p>
          </div>
          <button type="button" onClick={handleRefresh}>
            Actualiser
          </button>
        </header>

        <section className={styles.metrics} aria-label="Indicateurs CMS">
          <article>
            <span>Newsletter</span>
            <strong>{overview.counts.subscriptions}</strong>
            <small>abonnés collectés</small>
          </article>
          <article>
            <span>Participants</span>
            <strong>{overview.counts.participants}</strong>
            <small>{pendingParticipants} en attente</small>
          </article>
          <article>
            <span>Messages</span>
            <strong>{overview.counts.messages}</strong>
            <small>demandes contact</small>
          </article>
          <article>
            <span>Articles</span>
            <strong>{overview.counts.articles}</strong>
            <small>contenus créés</small>
          </article>
        </section>

        {message && <p className={`${styles.status} ${styles[status]}`}>{message}</p>}

        <section className={styles.workspace}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span>{tabLabels[activeTab]}</span>
                <h2>Gestion des données</h2>
              </div>
              <p>Les 500 derniers éléments sont affichés.</p>
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
                        <th>Téléphone</th>
                        <th>Organisation</th>
                        <th>Ville</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overview.participants.map((item) => (
                        <tr key={item.id}>
                          <td>{item.prenom} {item.nom}</td>
                          <td>{item.email}</td>
                          <td>{item.telephone}</td>
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
                        <th>Résumé</th>
                        <th>Statut</th>
                        <th>Lien</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overview.articles.map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.category}</td>
                          <td>{item.excerpt}</td>
                          <td>{item.published ? "Publié" : "Brouillon"}</td>
                          <td>
                            <Link href={`/actualites/${item.slug}`}>Lire</Link>
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
            <section className={styles.card}>
              <span>Derniers abonnés</span>
              {latestSubscribers.length === 0 ? (
                <p>Aucun abonnement newsletter pour le moment.</p>
              ) : (
                latestSubscribers.map((item) => (
                  <div className={styles.miniRow} key={item.id}>
                    <strong>{item.email}</strong>
                    <small>{formatDate(item.createdAt)}</small>
                  </div>
                ))
              )}
            </section>

            <form className={styles.articleForm} onSubmit={handleArticleSubmit}>
              <span>Publication</span>
              <h2>Ajouter un article</h2>

              <div className={styles.formGrid}>
                <label>
                  Catégorie
                  <input
                    value={articleForm.category}
                    onChange={(event) => setArticleForm({ ...articleForm, category: event.target.value })}
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
                Corps de l&apos;article
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
                  Image
                  <select
                    value={articleForm.image}
                    onChange={(event) => setArticleForm({ ...articleForm, image: event.target.value })}
                  >
                    <option value="/images/about-book.webp">Livre constitutionnel</option>
                    <option value="/images/hero-gavel.webp">Marteau de justice</option>
                  </select>
                </label>
              </div>
              <label className={styles.checkbox}>
                <input
                  checked={articleForm.published}
                  onChange={(event) => setArticleForm({ ...articleForm, published: event.target.checked })}
                  type="checkbox"
                />
                Publier directement sur Actualités
              </label>

              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Enregistrement..." : "Publier l'article"}
              </button>
            </form>
          </aside>
        </section>
      </section>
    </main>
  );
}
