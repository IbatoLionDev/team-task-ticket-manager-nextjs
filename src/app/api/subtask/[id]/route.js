import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, safeParseId } from "@/helpers/apiHelpers";

export const GET = async (request, { params }) => {
  const subtaskId = safeParseId(params.id);
  if (!subtaskId) return jsonError("Invalid subtask id", 400);
  try {
    const { searchParams } = new URL(request.url);
    const allFields = [
      "id",
      "taskId",
      "task",
      "title",
      "description",
      "status",
      "createdAt",
      "updatedAt",
      "finishedAt",
    ];
    const select = buildSelect(allFields, searchParams);
    const subtask = await prisma.subtask.findUnique({
      where: { id: subtaskId },
      select,
    });
    if (!subtask) return jsonError("Subtask not found", 404);
    return NextResponse.json(subtask, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch subtask", 500);
  }
};
