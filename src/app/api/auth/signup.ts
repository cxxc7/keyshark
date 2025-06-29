import { NextRequest, NextResponse } from "next/server";

import { users } from "./users";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required." }, { status: 400 });
  }
  if (users.some(u => u.username === username)) {
    return NextResponse.json({ error: "Username already exists." }, { status: 409 });
  }
  users.push({ username, password, preferences: {} });
  return NextResponse.json({ success: true });
}
