import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  const { id } = params;
  const idInt = typeof id === "string" ? parseInt(id, 10) : id;
  if (!idInt || isNaN(idInt)) {
    return NextResponse.json({ error: "Invalid subtask id" }, { status: 400 });
  }
  try {
    const subtask = await prisma.subtask.findUnique({
      where: { id: idInt },
      include: { task: true },
    });
    if (!subtask) {
      return NextResponse.json({ error: "Subtask not found" }, { status: 404 });
    }
    return NextResponse.json(subtask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch subtask" },
      { status: 500 }
    );
  }
}
