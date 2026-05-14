import { NextResponse } from "next/server";
import { getCurrentAdminUser } from "@/lib/admin-auth";

export async function GET() {
  const user = await getCurrentAdminUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  return NextResponse.json({ user });
}
