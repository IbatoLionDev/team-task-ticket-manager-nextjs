import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const allFields = [
    "id",
    "taskId",
    "task",
    "title",
    "description",
    "isDone",
    "createdAt",
    "updatedAt",
    "finishedAt",
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
  const subtaskId = typeof id === "string" ? parseInt(id, 10) : id;
  if (!subtaskId || isNaN(subtaskId)) {
    return NextResponse.json({ error: "Invalid subtask id" }, { status: 400 });
  }
  try {
    const subtask = await prisma.subtask.findUnique({
      where: { id: subtaskId },
      select,
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
