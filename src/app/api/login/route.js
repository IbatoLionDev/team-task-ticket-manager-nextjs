import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password)
      return NextResponse.json(
        { error: "Missing identifier or password" },
        { status: 400 }
      );

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    if (user.password !== password)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );

    return NextResponse.json(
      {
        message: "Login successful",
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Login failed due to server error" },
      { status: 500 }
    );
  }
}
