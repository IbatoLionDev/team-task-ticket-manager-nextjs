import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const allFields = [
      "id",
      "title",
      "description",
      "owner",
      "type",
      "urgency",
      "expectedPayment",
      "startDate",
      "updatedAt",
      "finishedAt",
      "tasks",
    ];
    let select = {};
    let limit;
    let hasQueryParams = false;
    for (const fieldName of allFields) {
      if (searchParams.has(fieldName)) {
        select[fieldName] = true;
        hasQueryParams = true;
      }
    }
    if (searchParams.has("index")) {
      const indexValue = parseInt(searchParams.get("index"), 10);
      if (!isNaN(indexValue) && indexValue > 0) limit = indexValue;
    }
    if (!hasQueryParams) {
      select = allFields.reduce((accumulator, fieldName) => {
        accumulator[fieldName] = true;
        return accumulator;
      }, {});
    }
    const projects = await prisma.project.findMany({
      select,
      ...(limit ? { take: limit } : {}),
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create a new project
export async function POST(request) {
  try {
    const {
      title,
      description,
      owner,
      type,
      urgency,
      expectedPayment,
      startDate,
      finishedAt,
      tasks,
    } = await request.json();

    if (
      !title ||
      !description ||
      !owner ||
      !type ||
      !urgency ||
      expectedPayment === undefined
    )
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        owner,
        type,
        urgency,
        expectedPayment,
        startDate,
        finishedAt,
        tasks: tasks ? { create: tasks } : undefined,
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT update a project (full update)
export async function PUT(request) {
  try {
    const {
      id,
      title,
      description,
      owner,
      type,
      urgency,
      expectedPayment,
      startDate,
      finishedAt,
    } = await request.json();

    if (!id)
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json(
        { error: "Invalid project id" },
        { status: 400 }
      );

    const updatedProject = await prisma.project.update({
      where: { id: idInt },
      data: {
        title,
        description,
        owner,
        type,
        urgency,
        expectedPayment,
        startDate,
        finishedAt,
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// PATCH update a project (partial update)
export async function PATCH(request) {
  try {
    const { id, ...data } = await request.json();

    if (!id)
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json(
        { error: "Invalid project id" },
        { status: 400 }
      );

    const updatedProject = await prisma.project.update({
      where: { id: idInt },
      data,
      include: {
        tasks: true,
      },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to patch project" },
      { status: 500 }
    );
  }
}

// DELETE a project
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "Missing project id" },
        { status: 400 }
      );

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json(
        { error: "Invalid project id" },
        { status: 400 }
      );

    await prisma.project.delete({ where: { id: idInt } });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
