import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function GET(request) {
  try {
    const cookie = request.cookies.get("token");
    if (!cookie) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const token = cookie.value;
    const decoded = decodeJwt(token);

    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
