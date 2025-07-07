import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  const { id } = params;
  const idInt = typeof id === "string" ? parseInt(id, 10) : id;
  if (!idInt || isNaN(idInt)) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }
  try {
    const task = await prisma.task.findUnique({
      where: { id: idInt },
      include: { project: true, user: true, subTasks: true },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}
