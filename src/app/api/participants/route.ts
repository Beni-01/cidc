import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const participantSchema = z.object({
  titre: z.enum(["Monsieur", "Madame"], {
    message: "Le titre est requis",
  }),
  prenom: z.string().min(2, { message: "Le prénom est requis" }),
  nom: z.string().min(2, { message: "Le nom est requis" }),
  telephone: z.string().min(8, { message: "Numéro de téléphone invalide" }),
  email: z.email({ message: "Email invalide" }),
  profession: z.string().min(2, { message: "La profession est requise" }),
  fonction: z.string().min(2, { message: "La fonction est requise" }),
  organisation: z.string().min(2, { message: "L'organisation est requise" }),
  ville: z.string().min(2, { message: "La ville est requise" }),
  niveauEtude: z.string().min(2, { message: "Le niveau d'étude est requis" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = participantSchema.parse(body);

    // Check for existing participant
    const existingParticipant = await prisma.participant.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { telephone: validatedData.telephone },
        ],
      },
    });

    if (existingParticipant) {
      return NextResponse.json(
        { error: "Un participant avec cet email ou ce téléphone existe déjà." },
        { status: 400 }
      );
    }

    const participant = await prisma.participant.create({
      data: {
        ...validatedData,
        refTransaction: `REG-${crypto.randomUUID()}`,
      },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription." },
      { status: 500 }
    );
  }
}
