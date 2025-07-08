import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
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
  const projectId = typeof id === "string" ? parseInt(id, 10) : id;
  if (!projectId || isNaN(projectId)) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select,
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
