"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

type AdminUser = {
  id: number;
  username: string;
  fullName?: string | null;
  role: string;
  active: boolean;
  lastLoginAt?: string | null;
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

type Tab = "newsletter" | "participants" | "messages" | "articles" | "users";

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

const initialUserForm = {
  username: "",
  fullName: "",
  password: "",
  role: "admin",
  active: true,
};

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const tabLabels: Record<Tab, string> = {
  newsletter: "Newsletter",
  participants: "Participants",
  messages: "Messages",
  articles: "Articles",
  users: "Utilisateurs",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function AdminPage() {
  const router = useRouter();
  const [overview, setOverview] = useState<Overview>(emptyOverview);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("newsletter");
  const [articleForm, setArticleForm] = useState(initialArticleForm);
  const [userForm, setUserForm] = useState(initialUserForm);
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadAdminData() {
    setIsLoading(true);
    const [overviewResponse, usersResponse, meResponse] = await Promise.all([
      fetch("/api/admin/overview", { cache: "no-store" }),
      fetch("/api/admin/users", { cache: "no-store" }),
      fetch("/api/admin/auth/me", { cache: "no-store" }),
    ]);
    const [overviewData, usersData, meData] = await Promise.all([
      overviewResponse.json(),
      usersResponse.json(),
      meResponse.json(),
    ]);

    if (!overviewResponse.ok) {
      throw new Error(typeof overviewData?.error === "string" ? overviewData.error : "Chargement impossible.");
    }

    if (!usersResponse.ok) {
      throw new Error(typeof usersData?.error === "string" ? usersData.error : "Chargement des utilisateurs impossible.");
    }

    setOverview(overviewData);
    setUsers(usersData.users || []);
    setCurrentUser(meResponse.ok ? meData.user : null);
    setIsLoading(false);
  }

  useEffect(() => {
    let isMounted = true;

    async function hydrateAdminData() {
      try {
        const [overviewResponse, usersResponse, meResponse] = await Promise.all([
          fetch("/api/admin/overview", { cache: "no-store" }),
          fetch("/api/admin/users", { cache: "no-store" }),
          fetch("/api/admin/auth/me", { cache: "no-store" }),
        ]);
        const [overviewData, usersData, meData] = await Promise.all([
          overviewResponse.json(),
          usersResponse.json(),
          meResponse.json(),
        ]);

        if (!isMounted) {
          return;
        }

        if (!overviewResponse.ok || !usersResponse.ok) {
          throw new Error("Impossible de charger les données admin.");
        }

        setOverview(overviewData);
        setUsers(usersData.users || []);
        setCurrentUser(meResponse.ok ? meData.user : null);
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

    void hydrateAdminData();

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
      await loadAdminData();
      setStatus("success");
      setMessage("Données actualisées.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Actualisation impossible.");
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
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
      await loadAdminData();
      setActiveTab("articles");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  async function handleUserSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Utilisateur invalide.");
      }

      setUserForm(initialUserForm);
      setStatus("success");
      setMessage("Utilisateur admin créé avec succès.");
      await loadAdminData();
      setActiveTab("users");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Impossible de créer l'utilisateur.");
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/auth/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Mot de passe invalide.");
      }

      setPasswordForm(initialPasswordForm);
      setStatus("success");
      setMessage("Mot de passe modifié avec succès.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Impossible de modifier le mot de passe.");
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
        {currentUser && (
          <div className={styles.sessionBox}>
            <small>Connecté</small>
            <strong>{currentUser.fullName || currentUser.username}</strong>
            <span>{currentUser.role}</span>
          </div>
        )}
        <Link className={styles.siteLink} href="/actualites">
          Voir le site public
        </Link>
        <button className={styles.logoutButton} onClick={handleLogout} type="button">
          Déconnexion
        </button>
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
          <article>
            <span>Utilisateurs</span>
            <strong>{users.length}</strong>
            <small>accès admin</small>
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

                {activeTab === "users" && (
                  <table>
                    <thead>
                      <tr>
                        <th>Utilisateur</th>
                        <th>Nom</th>
                        <th>Rôle</th>
                        <th>Statut</th>
                        <th>Dernière connexion</th>
                        <th>Création</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item) => (
                        <tr key={item.id}>
                          <td>{item.username}</td>
                          <td>{item.fullName || "-"}</td>
                          <td>{item.role}</td>
                          <td>{item.active ? "Actif" : "Désactivé"}</td>
                          <td>{item.lastLoginAt ? formatDate(item.lastLoginAt) : "Jamais"}</td>
                          <td>{formatDate(item.createdAt)}</td>
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

            <form className={styles.articleForm} onSubmit={handleUserSubmit}>
              <span>Accès CMS</span>
              <h2>Créer un utilisateur</h2>

              <div className={styles.formGrid}>
                <label>
                  Username
                  <input
                    autoComplete="off"
                    onChange={(event) => setUserForm({ ...userForm, username: event.target.value })}
                    required
                    value={userForm.username}
                  />
                </label>
                <label>
                  Rôle
                  <input
                    onChange={(event) => setUserForm({ ...userForm, role: event.target.value })}
                    required
                    value={userForm.role}
                  />
                </label>
              </div>
              <label>
                Nom complet
                <input
                  onChange={(event) => setUserForm({ ...userForm, fullName: event.target.value })}
                  value={userForm.fullName}
                />
              </label>
              <label>
                Mot de passe
                <input
                  autoComplete="new-password"
                  minLength={6}
                  onChange={(event) => setUserForm({ ...userForm, password: event.target.value })}
                  required
                  type="password"
                  value={userForm.password}
                />
              </label>
              <label className={styles.checkbox}>
                <input
                  checked={userForm.active}
                  onChange={(event) => setUserForm({ ...userForm, active: event.target.checked })}
                  type="checkbox"
                />
                Compte actif
              </label>

              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Création..." : "Créer l'utilisateur"}
              </button>
            </form>

            <form className={styles.articleForm} onSubmit={handlePasswordSubmit}>
              <span>Sécurité</span>
              <h2>Modifier mon mot de passe</h2>

              <label>
                Mot de passe actuel
                <input
                  autoComplete="current-password"
                  onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
                  required
                  type="password"
                  value={passwordForm.currentPassword}
                />
              </label>
              <label>
                Nouveau mot de passe
                <input
                  autoComplete="new-password"
                  minLength={8}
                  onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
                  required
                  type="password"
                  value={passwordForm.newPassword}
                />
              </label>
              <label>
                Confirmer le nouveau mot de passe
                <input
                  autoComplete="new-password"
                  minLength={8}
                  onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
                  required
                  type="password"
                  value={passwordForm.confirmPassword}
                />
              </label>

              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Modification..." : "Modifier le mot de passe"}
              </button>
            </form>
          </aside>
        </section>
      </section>
    </main>
  );
}
