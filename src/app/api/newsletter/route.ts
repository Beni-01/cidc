import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const newsletterSchema = z.object({
  email: z.email({ message: "Email invalide" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = newsletterSchema.parse(body);

    const subscription = await prisma.newsletterSubscription.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'abonnement." },
      { status: 500 }
    );
  }
}
