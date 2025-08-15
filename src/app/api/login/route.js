import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 30,
  JWT_EXPIRES = "30d";
const jsonError = (m, s = 400) =>
  NextResponse.json({ error: m }, { status: s });
const buildCookie = (t) =>
  `token=${t}; Path=/; HttpOnly; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
const tokenPayload = (u) => ({
  id: u.id,
  email: u.email,
  username: u.username,
  role: u.role,
});

export const POST = async (request) => {
  try {
    const { identifier, password } = await request.json();
    if (!identifier || !password)
      return jsonError("Missing identifier or password", 400);
    const secret = process.env.JWT_SECRET;
    if (!secret)
      return jsonError("Server misconfiguration: missing JWT secret", 500);
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: identifier }, { username: identifier }] },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        password: true,
      },
    });
    if (!user) return jsonError("User not found", 401);
    if (!(await compare(password, user.password)))
      return jsonError("Incorrect password", 401);
    const token = jwt.sign(tokenPayload(user), secret, {
      expiresIn: JWT_EXPIRES,
    });
    const res = NextResponse.json({ message: "Login successful" });
    res.headers.set("Set-Cookie", buildCookie(token));
    return res;
  } catch (e) {
    console.error(e);
    return jsonError("Login failed due to server error", 500);
  }
};
