import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, parsePagination } from "@/helpers/apiHelpers";

// GET all tasks
export const GET = async (request) => {
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
    const { skip, take } = parsePagination(searchParams);
    const tasks = await prisma.task.findMany({
      select,
      ...(skip ? { skip } : {}),
      ...(take ? { take } : {}),
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch tasks", 500);
  }
};

// POST create a new task
export const POST = async (request) => {
  try {
    const {
      projectId,
      assignedToId,
      title,
      description,
      urgency,
      status,
      dueDate,
      finishedAt,
      subTasks,
    } = await request.json();
    if (!projectId || !title || !description || !urgency)
      return jsonError("Missing required fields", 400);
    const newTask = await prisma.task.create({
      data: {
        projectId,
        assignedToId,
        title,
        description,
        urgency,
        status: status ?? "PENDING",
        dueDate,
        finishedAt,
        subTasks: subTasks ? { create: subTasks } : undefined,
      },
      include: { project: true, assignedTo: true, subTasks: true },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to create task", 500);
  }
};

// PUT update a task (full update)
export const PUT = async (request) => {
  try {
    const {
      id,
      projectId,
      assignedToId,
      title,
      description,
      urgency,
      status,
      dueDate,
      finishedAt,
    } = await request.json();
    if (!id) return jsonError("Missing task id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid task id", 400);
    const updatedTask = await prisma.task.update({
      where: { id: idInt },
      data: {
        projectId,
        assignedToId,
        title,
        description,
        urgency,
        status,
        dueDate,
        finishedAt,
      },
      include: { project: true, assignedTo: true, subTasks: true },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to update task", 500);
  }
};

// PATCH update a task (partial update)
export const PATCH = async (request) => {
  try {
    const { id, ...data } = await request.json();
    if (!id) return jsonError("Missing task id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid task id", 400);
    const updatedTask = await prisma.task.update({
      where: { id: idInt },
      data,
      include: { project: true, assignedTo: true, subTasks: true },
    });
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to patch task", 500);
  }
};

// DELETE a task
export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return jsonError("Missing task id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid task id", 400);
    await prisma.task.delete({ where: { id: idInt } });
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return jsonError("Failed to delete task", 500);
  }
};
