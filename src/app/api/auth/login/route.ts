// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { users } from "../users"; // ✅ Correct import from sibling folder

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required." }, { status: 400 });
    }

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        preferences: user.preferences || {},
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Invalid JSON or internal server error." },
      { status: 500 }
    );
  }
}
