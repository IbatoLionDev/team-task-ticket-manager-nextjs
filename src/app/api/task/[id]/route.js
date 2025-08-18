import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, safeParseId } from "@/helpers/apiHelpers";

export const GET = async (request, { params }) => {
  const taskId = safeParseId(params.id);
  if (!taskId) return jsonError("Invalid task id", 400);
  try {
    const { searchParams } = new URL(request.url);
    const allFields = [
      "id",
      "projectId",
      "project",
      "assignedToId",
      "assignedTo",
      "title",
      "description",
      "urgency",
      "status",
      "dueDate",
      "createdAt",
      "updatedAt",
      "finishedAt",
      "subTasks",
    ];
    const select = buildSelect(allFields, searchParams);
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select,
    });
    if (!task) return jsonError("Task not found", 404);
    return NextResponse.json(task, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch task", 500);
  }
};
