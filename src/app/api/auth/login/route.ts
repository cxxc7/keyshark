import { NextRequest, NextResponse } from "next/server";
import { users } from "../users";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required." }, { status: 400 });
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  return NextResponse.json({ success: true, user: { username: user.username, preferences: user.preferences } });
}
