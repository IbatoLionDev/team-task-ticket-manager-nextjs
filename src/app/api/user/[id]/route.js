import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  const { id } = params;
  const idInt = typeof id === "string" ? parseInt(id, 10) : id;
  if (!idInt || isNaN(idInt)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: idInt },
      select: {
        id: true,
        firstName: true,
        username: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        tasks: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
