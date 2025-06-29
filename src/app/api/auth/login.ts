import { NextRequest, NextResponse } from "next/server";

// This API route now works with a custom header 'x-accounts' for demo/testing
export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required." }, { status: 400 });
  }
  let accounts = [];
  // Try to get accounts from custom header (sent from client)
  if (request.headers.get("x-accounts")) {
    try {
      accounts = JSON.parse(request.headers.get("x-accounts")!);
    } catch {}
  }
  // Find user in accounts
  const user = accounts.find((u: any) => u.username === username && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  return NextResponse.json({ success: true, user: { username: user.username, preferences: user.preferences } });
// End of file
}
