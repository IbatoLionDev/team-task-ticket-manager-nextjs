import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, parsePagination } from "@/helpers/apiHelpers";

// GET all projects
export const GET = async (request) => {
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
    const select = buildSelect(allFields, searchParams);
    const { skip, take } = parsePagination(searchParams);
    const projects = await prisma.project.findMany({
      select,
      ...(skip ? { skip } : {}),
      ...(take ? { take } : {}),
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch projects", 500);
  }
};

// POST create a new project
export const POST = async (request) => {
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
      return jsonError("Missing required fields", 400);
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
      include: { tasks: true },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to create project", 500);
  }
};

// PUT update a project (full update)
export const PUT = async (request) => {
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
    if (!id) return jsonError("Missing project id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid project id", 400);
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
      include: { tasks: true },
    });
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to update project", 500);
  }
};

// PATCH update a project (partial update)
export const PATCH = async (request) => {
  try {
    const { id, ...data } = await request.json();
    if (!id) return jsonError("Missing project id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid project id", 400);
    const updatedProject = await prisma.project.update({
      where: { id: idInt },
      data,
      include: { tasks: true },
    });
    return NextResponse.json(updatedProject, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to patch project", 500);
  }
};

// DELETE a project
export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return jsonError("Missing project id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid project id", 400);
    await prisma.project.delete({ where: { id: idInt } });
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return jsonError("Failed to delete project", 500);
  }
};
