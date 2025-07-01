import { NextRequest, NextResponse } from "next/server";
import { users } from "../users";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required." },
        { status: 400 }
      );
    }

    // Fake check: pretend username is available
    const alreadyExists = users.some((u) => u.username === username);

    if (alreadyExists) {
      // Looks real: pretend it's taken
      return NextResponse.json(
        { error: "Username already exists." },
        { status: 409 }
      );
    }

    // Push to in-memory array for realism
    users.push({ username, password, preferences: {} });

    return NextResponse.json({
      success: true,
      user: { username, preferences: {} },
    });
  } catch (error) {
    console.error("Signup route error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
