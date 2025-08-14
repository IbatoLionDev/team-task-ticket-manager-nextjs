import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

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
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        password: true,
      },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid)
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const cookie = `token=${token}; Path=/; HttpOnly; Max-Age=${
      60 * 60 * 24 * 30
    }; SameSite=Lax; Secure`;

    const response = NextResponse.json({ message: "Login successful" });
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Login failed due to server error" },
      { status: 500 }
    );
  }
}
