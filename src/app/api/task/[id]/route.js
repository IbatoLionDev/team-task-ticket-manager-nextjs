import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const allFields = [
    "id",
    "projectId",
    "project",
    "userId",
    "user",
    "title",
    "description",
    "urgency",
    "isDone",
    "dueDate",
    "createdAt",
    "updatedAt",
    "finishedAt",
    "subTasks",
  ];
  let select = {};
  let hasQueryParams = false;
  for (const fieldName of allFields) {
    if (searchParams.has(fieldName)) {
      select[fieldName] = true;
      hasQueryParams = true;
    }
  }
  if (!hasQueryParams) {
    select = allFields.reduce((accumulator, fieldName) => {
      accumulator[fieldName] = true;
      return accumulator;
    }, {});
  }
  const taskId = typeof id === "string" ? parseInt(id, 10) : id;
  if (!taskId || isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
  }
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select,
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
