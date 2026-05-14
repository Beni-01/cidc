import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_LIST_LIMIT = 500;

export async function GET() {
  try {
    const articleDelegate = prisma.article;

    const [
      subscriptions,
      participants,
      messages,
      articles,
      subscriptionCount,
      participantCount,
      messageCount,
      articleCount,
    ] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        orderBy: { createdAt: "desc" },
        take: ADMIN_LIST_LIMIT,
      }),
      prisma.participant.findMany({
        orderBy: { createdAt: "desc" },
        take: ADMIN_LIST_LIMIT,
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
        take: ADMIN_LIST_LIMIT,
      }),
      articleDelegate
        ? articleDelegate.findMany({
            orderBy: { createdAt: "desc" },
            take: ADMIN_LIST_LIMIT,
          })
        : Promise.resolve([]),
      prisma.newsletterSubscription.count(),
      prisma.participant.count(),
      prisma.contactMessage.count(),
      articleDelegate ? articleDelegate.count() : Promise.resolve(0),
    ]);

    return NextResponse.json({
      subscriptions,
      participants,
      messages,
      articles,
      counts: {
        subscriptions: subscriptionCount,
        participants: participantCount,
        messages: messageCount,
        articles: articleCount,
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
