import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  nom: z.string().min(2, { message: "Le nom est requis" }),
  email: z.email({ message: "Email invalide" }),
  telephone: z.string().optional(),
  sujet: z.string().min(2, { message: "Le sujet est requis" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const message = await prisma.contactMessage.create({ data });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
