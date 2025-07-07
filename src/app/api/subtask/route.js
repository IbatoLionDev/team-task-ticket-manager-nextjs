import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all subtasks
export async function GET() {
  try {
    const subtasks = await prisma.subtask.findMany({
      include: {
        task: true,
      },
    });
    return NextResponse.json(subtasks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch subtasks" },
      { status: 500 }
    );
  }
}

// POST create a new subtask
export async function POST(request) {
  try {
    const { taskId, title, description, isDone, finishedAt } =
      await request.json();

    if (!taskId || !title || !description)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const newSubtask = await prisma.subtask.create({
      data: {
        taskId,
        title,
        description,
        isDone: isDone ?? false,
        finishedAt,
      },
      include: {
        task: true,
      },
    });

    return NextResponse.json(newSubtask, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create subtask" },
      { status: 500 }
    );
  }
}

// PUT update a subtask (full update)
export async function PUT(request) {
  try {
    const { id, taskId, title, description, isDone, finishedAt } =
      await request.json();

    if (!id)
      return NextResponse.json(
        { error: "Missing subtask id" },
        { status: 400 }
      );

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json(
        { error: "Invalid subtask id" },
        { status: 400 }
      );

    const updatedSubtask = await prisma.subtask.update({
      where: { id: idInt },
      data: {
        taskId,
        title,
        description,
        isDone,
        finishedAt,
      },
      include: {
        task: true,
      },
    });

    return NextResponse.json(updatedSubtask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update subtask" },
      { status: 500 }
    );
  }
}

// PATCH update a subtask (partial update)
export async function PATCH(request) {
  try {
    const { id, ...data } = await request.json();

    if (!id)
      return NextResponse.json(
        { error: "Missing subtask id" },
        { status: 400 }
      );

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json(
        { error: "Invalid subtask id" },
        { status: 400 }
      );

    const updatedSubtask = await prisma.subtask.update({
      where: { id: idInt },
      data,
      include: {
        task: true,
      },
    });

    return NextResponse.json(updatedSubtask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to patch subtask" },
      { status: 500 }
    );
  }
}

// DELETE a subtask
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "Missing subtask id" },
        { status: 400 }
      );

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json(
        { error: "Invalid subtask id" },
        { status: 400 }
      );

    await prisma.subtask.delete({ where: { id: idInt } });

    return NextResponse.json(
      { message: "Subtask deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete subtask" },
      { status: 500 }
    );
  }
}
