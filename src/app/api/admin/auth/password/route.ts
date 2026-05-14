import { NextResponse } from "next/server";
import { z } from "zod";
import { hashAdminPassword, requireAdminApi, verifyAdminPassword } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis."),
    newPassword: z.string().min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères."),
    confirmPassword: z.string().min(1, "La confirmation est requise."),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Les deux nouveaux mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export async function PATCH(request: Request) {
  const auth = await requireAdminApi();

  if (auth.response) {
    return auth.response;
  }

  try {
    const payload = passwordSchema.parse(await request.json());
    const user = await prisma.adminUser.findUnique({
      where: { id: auth.user.id },
      select: { id: true, passwordHash: true },
    });

    if (!user || !(await verifyAdminPassword(payload.currentPassword, user.passwordHash))) {
      return NextResponse.json(
        { error: "Le mot de passe actuel est incorrect." },
        { status: 400 }
      );
    }

    await prisma.adminUser.update({
      where: { id: user.id },
      data: {
        passwordHash: await hashAdminPassword(payload.newPassword),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Admin password API Error:", error);
    return NextResponse.json(
      { error: "Impossible de modifier le mot de passe." },
      { status: 500 }
    );
  }
}
