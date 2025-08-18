import { NextResponse } from "next/server";
import { decodeJwt } from "jose";
export const GET = async (request) => {
  try {
    const cookie = request.cookies.get("token");
    if (!cookie) return NextResponse.json({ user: null }, { status: 401 });
    const decoded = decodeJwt(cookie.value);
    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
};
