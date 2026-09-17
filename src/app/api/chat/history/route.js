import { NextResponse } from "next/server";
import { getFullHistory } from "@/lib/db";

export async function POST(req) {
  try {
    const { visitorId, limit = 30 } = await req.json().catch(() => ({}));

    if (!visitorId || typeof visitorId !== "string") {
      return NextResponse.json({ messages: [] });
    }

    const messages = await getFullHistory(visitorId, limit);
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("History fetch error:", err);
    return NextResponse.json({ messages: [] });
  }
}