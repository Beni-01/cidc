import { NextResponse } from "next/server";
import { z } from "zod";
import { hashAdminPassword, requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères.")
    .max(32, "Le nom d'utilisateur est trop long.")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Utilisez uniquement lettres, chiffres, tirets, points ou underscores."),
  fullName: z.string().trim().max(80).optional().default(""),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  role: z.string().trim().min(2).max(32).optional().default("admin"),
  active: z.boolean().optional().default(true),
});

export async function GET() {
  const auth = await requireAdminApi();

  if (auth.response) {
    return auth.response;
  }

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      fullName: true,
      role: true,
      active: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();

  if (auth.response) {
    return auth.response;
  }

  try {
    const payload = createUserSchema.parse(await request.json());
    const user = await prisma.adminUser.create({
      data: {
        username: payload.username,
        fullName: payload.fullName || null,
        role: payload.role,
        active: payload.active,
        passwordHash: await hashAdminPassword(payload.password),
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        active: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Ce nom d'utilisateur existe déjà." },
        { status: 409 }
      );
    }

    console.error("Admin users API Error:", error);
    return NextResponse.json(
      { error: "Impossible de créer l'utilisateur admin." },
      { status: 500 }
    );
  }
}
