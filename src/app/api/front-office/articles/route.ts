import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const articleSchema = z.object({
  category: z.string().min(2, "La catégorie est requise"),
  title: z.string().min(6, "Le titre est trop court"),
  excerpt: z.string().min(20, "Le résumé est trop court"),
  image: z.string().min(1).default("/images/about-book.webp"),
  intro: z.string().min(20, "L'introduction est trop courte"),
  body: z.string().min(40, "Le contenu est trop court"),
  quote: z.string().min(10, "La citation est trop courte"),
  author: z.string().min(2, "L'auteur est requis"),
  readTime: z.string().min(2).default("5 min"),
  published: z.boolean().default(true),
});

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function createUniqueSlug(title: string) {
  const baseSlug = slugify(title) || `article-${Date.now()}`;
  let slug = baseSlug;
  let index = 2;

  while (await prisma.article.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  return slug;
}

export async function GET() {
  const auth = await requireAdminApi();

  if (auth.response) {
    return auth.response;
  }

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Articles GET API Error:", error);
    return NextResponse.json(
      { error: "Impossible de charger les articles." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();

  if (auth.response) {
    return auth.response;
  }

  try {
    const payload = articleSchema.parse(await req.json());
    const slug = await createUniqueSlug(payload.title);

    const article = await prisma.article.create({
      data: {
        ...payload,
        slug,
        date: new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date()),
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Articles POST API Error:", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer l'article." },
      { status: 500 }
    );
  }
}
