import { NextRequest, NextResponse } from "next/server";

// Define a type for users
type User = {
  username: string;
  password: string;
  preferences?: Record<string, unknown>; // or a more specific type if known
};

// This API route works with a custom header 'x-accounts' for demo/testing
export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required." }, { status: 400 });
  }

  let accounts: User[] = [];

  // Try to get accounts from custom header (sent from client)
  const rawAccounts = request.headers.get("x-accounts");
  if (rawAccounts) {
    try {
      accounts = JSON.parse(rawAccounts) as User[];
    } catch {
      return NextResponse.json({ error: "Invalid account header format." }, { status: 400 });
    }
  }

  // Find user in accounts
  const user = accounts.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    user: {
      username: user.username,
      preferences: user.preferences ?? {},
    },
  });
}
