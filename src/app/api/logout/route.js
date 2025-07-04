import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" });

  // Expire the token by overwriting with Max-Age=0
  response.headers.set(
    "Set-Cookie",
    "token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure"
  );

  return response;
}
