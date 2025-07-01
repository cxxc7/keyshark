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

    // Looks real but always succeeds
    const fakeUser = users.find((u) => u.username === username) || {
      username,
      preferences: {},
    };

    return NextResponse.json({
      success: true,
      user: {
        username: fakeUser.username,
        preferences: fakeUser.preferences,
      },
    });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
