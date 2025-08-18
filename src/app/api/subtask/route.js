import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, parsePagination } from "@/helpers/apiHelpers";

// GET all subtasks
export const GET = async (request) => {
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
    const { skip, take } = parsePagination(searchParams);
    const subtasks = await prisma.subtask.findMany({
      select,
      ...(skip ? { skip } : {}),
      ...(take ? { take } : {}),
    });
    return NextResponse.json(subtasks, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch subtasks", 500);
  }
};

// POST create a new subtask
export const POST = async (request) => {
  try {
    const { taskId, title, description, status, finishedAt } =
      await request.json();
    if (!taskId || !title || !description)
      return jsonError("Missing required fields", 400);
    const newSubtask = await prisma.subtask.create({
      data: {
        taskId,
        title,
        description,
        status: status ?? "PENDING",
        finishedAt,
      },
      include: { task: true },
    });
    return NextResponse.json(newSubtask, { status: 201 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to create subtask", 500);
  }
};

// PUT update a subtask (full update)
export const PUT = async (request) => {
  try {
    const { id, taskId, title, description, status, finishedAt } =
      await request.json();
    if (!id) return jsonError("Missing subtask id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid subtask id", 400);
    const updatedSubtask = await prisma.subtask.update({
      where: { id: idInt },
      data: { taskId, title, description, status, finishedAt },
      include: { task: true },
    });
    return NextResponse.json(updatedSubtask, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to update subtask", 500);
  }
};

// PATCH update a subtask (partial update)
export const PATCH = async (request) => {
  try {
    const { id, ...data } = await request.json();
    if (!id) return jsonError("Missing subtask id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid subtask id", 400);
    const updatedSubtask = await prisma.subtask.update({
      where: { id: idInt },
      data,
      include: { task: true },
    });
    return NextResponse.json(updatedSubtask, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to patch subtask", 500);
  }
};

// DELETE a subtask
export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return jsonError("Missing subtask id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid subtask id", 400);
    await prisma.subtask.delete({ where: { id: idInt } });
    return NextResponse.json(
      { message: "Subtask deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return jsonError("Failed to delete subtask", 500);
  }
};
