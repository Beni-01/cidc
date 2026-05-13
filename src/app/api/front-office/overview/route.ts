import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [subscriptions, participants, messages, articles] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.participant.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          id: true,
          prenom: true,
          nom: true,
          email: true,
          telephone: true,
          organisation: true,
          ville: true,
          hasPayed: true,
          createdAt: true,
        },
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);

    return NextResponse.json({
      subscriptions,
      participants,
      messages,
      articles,
      counts: {
        subscriptions: subscriptions.length,
        participants: participants.length,
        messages: messages.length,
        articles: articles.length,
      },
    });
  } catch (error) {
    console.error("Front-office overview API Error:", error);
    return NextResponse.json(
      { error: "Impossible de charger les données du front-office." },
      { status: 500 }
    );
  }
}
