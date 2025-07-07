import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  const { id } = params;
  const idInt = typeof id === "string" ? parseInt(id, 10) : id;
  if (!idInt || isNaN(idInt)) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }
  try {
    const project = await prisma.project.findUnique({
      where: { id: idInt },
      include: { tasks: true },
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
