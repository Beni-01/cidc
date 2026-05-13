import { prisma } from "@/lib/prisma";

export interface NewsArticle {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  intro: string;
  body: string[];
  quote: string;
  author: string;
}

export const baseArticles: NewsArticle[] = [
  {
    slug: "culture-constitutionnelle-etat-de-droit",
    category: "Analyse",
    date: "12 mai 2026",
    readTime: "6 min",
    title: "Pourquoi la culture constitutionnelle reste décisive pour l'État de droit",
    excerpt:
      "Décryptage des mécanismes qui transforment les textes fondamentaux en pratiques institutionnelles.",
    image: "/images/about-book.webp",
    intro:
      "Un texte constitutionnel ne suffit pas à faire vivre l'État de droit. Il faut aussi des usages, une pédagogie publique et des institutions capables de rendre les règles compréhensibles.",
    body: [
      "La culture constitutionnelle désigne la manière dont une société lit, discute et applique ses principes fondamentaux. Elle dépasse le cercle des juristes: elle concerne les citoyens, les universités, les médias, les partis, les administrations et les juridictions.",
      "Dans les périodes de réforme ou de crise, cette culture devient un repère. Elle permet d'éviter que les débats institutionnels ne se réduisent à des rapports de force. Elle donne un langage commun pour parler de liberté, de responsabilité, de contrôle et de légitimité.",
      "Le colloque veut précisément ouvrir cet espace: confronter les expériences, identifier les pratiques qui fonctionnent et renforcer la confiance dans la norme constitutionnelle.",
    ],
    quote:
      "La Constitution devient vivante lorsqu'elle est comprise, discutée et utilisée comme instrument de responsabilité publique.",
    author: "Comité scientifique",
  },
  {
    slug: "cours-constitutionnelles-controle",
    category: "Veille",
    date: "08 mai 2026",
    readTime: "5 min",
    title: "Cours constitutionnelles: nouvelles tendances de contrôle",
    excerpt:
      "Panorama des décisions récentes sur les libertés publiques, les élections et la séparation des pouvoirs.",
    image: "/images/hero-gavel.webp",
    intro:
      "Les juridictions constitutionnelles occupent une place croissante dans l'équilibre institutionnel. Leur rôle évolue avec la complexité des contentieux publics.",
    body: [
      "Les décisions récentes montrent une attention renforcée aux garanties procédurales, à la transparence électorale et à la proportionnalité des restrictions aux libertés.",
      "Cette évolution oblige les acteurs publics à mieux motiver leurs décisions et à intégrer plus tôt le contrôle constitutionnel dans la fabrique des politiques publiques.",
      "La session dédiée à la justice constitutionnelle explorera ces tendances à partir de cas africains et comparés.",
    ],
    quote:
      "Le juge constitutionnel n'est pas seulement un gardien du texte; il devient aussi un acteur de la qualité démocratique.",
    author: "Cellule de veille",
  },
  {
    slug: "axes-scientifiques-edition-2025",
    category: "Colloque",
    date: "02 mai 2026",
    readTime: "4 min",
    title: "Les axes scientifiques de l'édition 2025",
    excerpt:
      "Présentation des thèmes qui guideront les conférences, ateliers et tables rondes.",
    image: "/images/about-book.webp",
    intro:
      "L'édition 2025 articule les débats autour de quatre axes: pouvoir constituant, justice constitutionnelle, citoyenneté administrative et coopération institutionnelle.",
    body: [
      "Chaque axe répond à une tension contemporaine: comment réformer sans fragiliser, contrôler sans bloquer, administrer sans éloigner, coopérer sans uniformiser.",
      "Le programme combine conférences, tables rondes et moments d'échange afin de rendre les discussions utiles aux chercheurs comme aux praticiens.",
      "Les ressources produites pendant le colloque seront ensuite partagées pour nourrir les travaux futurs.",
    ],
    quote:
      "Un bon colloque ne se contente pas d'exposer des idées; il organise les conditions d'une conversation durable.",
    author: "Coordination du colloque",
  },
  {
    slug: "confiance-institutions",
    category: "Entretien",
    date: "26 avril 2026",
    readTime: "7 min",
    title: "Renforcer la confiance dans les institutions",
    excerpt:
      "Un échange autour de la pédagogie constitutionnelle et de la responsabilité démocratique.",
    image: "/images/hero-gavel.webp",
    intro:
      "La confiance institutionnelle ne se décrète pas. Elle se construit par des règles lisibles, des pratiques constantes et une capacité à rendre compte.",
    body: [
      "Les institutions inspirent confiance lorsqu'elles rendent leurs décisions compréhensibles et lorsqu'elles acceptent les mécanismes de contrôle prévus par la Constitution.",
      "La pédagogie constitutionnelle joue ici un rôle central: elle permet aux citoyens d'identifier les droits, les procédures et les responsabilités de chacun.",
      "L'entretien revient sur les liens entre transparence, formation juridique et consolidation démocratique.",
    ],
    quote:
      "La confiance commence lorsque les règles cessent d'être perçues comme l'affaire d'une minorité.",
    author: "Rédaction",
  },
];

function toParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function getDatabaseArticles(): Promise<NewsArticle[]> {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return articles.map((article) => ({
    slug: article.slug,
    category: article.category,
    date: article.date,
    readTime: article.readTime,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    intro: article.intro,
    body: toParagraphs(article.body),
    quote: article.quote,
    author: article.author,
  }));
}

export async function getArticles(): Promise<NewsArticle[]> {
  const databaseArticles = await getDatabaseArticles();
  return [...databaseArticles, ...baseArticles];
}

export async function getArticleBySlug(slug: string) {
  const staticArticle = baseArticles.find((article) => article.slug === slug);

  if (staticArticle) {
    return staticArticle;
  }

  const databaseArticle = await prisma.article.findFirst({
    where: { slug, published: true },
  });

  if (!databaseArticle) {
    return undefined;
  }

  return {
    slug: databaseArticle.slug,
    category: databaseArticle.category,
    date: databaseArticle.date,
    readTime: databaseArticle.readTime,
    title: databaseArticle.title,
    excerpt: databaseArticle.excerpt,
    image: databaseArticle.image,
    intro: databaseArticle.intro,
    body: toParagraphs(databaseArticle.body),
    quote: databaseArticle.quote,
    author: databaseArticle.author,
  };
}
