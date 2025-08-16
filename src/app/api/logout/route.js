import { NextResponse } from "next/server";
export const POST = async () => {
  const res = NextResponse.json({ message: "Logout successful" });
  res.headers.set(
    "Set-Cookie",
    "token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure"
  );
  return res;
};
