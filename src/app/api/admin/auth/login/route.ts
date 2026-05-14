import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE_NAME,
  createAdminToken,
  ensureDefaultAdmin,
  getAdminCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Le nom d'utilisateur est requis."),
  password: z.string().min(1, "Le mot de passe est requis."),
});

export async function POST(request: Request) {
  try {
    await ensureDefaultAdmin();

    const payload = loginSchema.parse(await request.json());
    const user = await prisma.adminUser.findUnique({
      where: { username: payload.username },
    });

    if (!user || !user.active || !(await verifyAdminPassword(payload.password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Nom d'utilisateur ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const cookieStore = await cookies();
    cookieStore.set(
      ADMIN_COOKIE_NAME,
      createAdminToken({ sub: user.id, username: user.username }),
      getAdminCookieOptions()
    );

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Admin login API Error:", error);
    return NextResponse.json(
      { error: "Impossible de connecter l'administrateur." },
      { status: 500 }
    );
  }
}
