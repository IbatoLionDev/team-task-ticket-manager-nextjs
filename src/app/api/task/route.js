import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        user: true,
        subTasks: true,
      },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST create a new task
export async function POST(request) {
  try {
    const {
      projectId,
      userId,
      title,
      description,
      urgency,
      isDone,
      dueDate,
      finishedAt,
      subTasks,
    } = await request.json();

    if (!projectId || !title || !description || !urgency)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const newTask = await prisma.task.create({
      data: {
        projectId,
        userId,
        title,
        description,
        urgency,
        isDone: isDone ?? false,
        dueDate,
        finishedAt,
        subTasks: subTasks ? { create: subTasks } : undefined,
      },
      include: {
        project: true,
        user: true,
        subTasks: true,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

// PUT update a task (full update)
export async function PUT(request) {
  try {
    const {
      id,
      projectId,
      userId,
      title,
      description,
      urgency,
      isDone,
      dueDate,
      finishedAt,
    } = await request.json();

    if (!id)
      return NextResponse.json({ error: "Missing task id" }, { status: 400 });

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json({ error: "Invalid task id" }, { status: 400 });

    const updatedTask = await prisma.task.update({
      where: { id: idInt },
      data: {
        projectId,
        userId,
        title,
        description,
        urgency,
        isDone,
        dueDate,
        finishedAt,
      },
      include: {
        project: true,
        user: true,
        subTasks: true,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// PATCH update a task (partial update)
export async function PATCH(request) {
  try {
    const { id, ...data } = await request.json();

    if (!id)
      return NextResponse.json({ error: "Missing task id" }, { status: 400 });

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json({ error: "Invalid task id" }, { status: 400 });

    const updatedTask = await prisma.task.update({
      where: { id: idInt },
      data,
      include: {
        project: true,
        user: true,
        subTasks: true,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to patch task" },
      { status: 500 }
    );
  }
}

// DELETE a task
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "Missing task id" }, { status: 400 });

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json({ error: "Invalid task id" }, { status: 400 });

    await prisma.task.delete({ where: { id: idInt } });

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
