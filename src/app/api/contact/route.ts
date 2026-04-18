import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, botcheck } = body as Record<string, string>;
    if (botcheck) {
      return NextResponse.json({ ok: false, error: "bot" }, { status: 400 });
    }
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
    }
    // Wire SMTP, Resend, or forwarding in production.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
