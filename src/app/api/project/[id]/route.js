import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, safeParseId } from "@/helpers/apiHelpers";

export const GET = async (request, { params }) => {
  const projectId = safeParseId(params.id);
  if (!projectId) return jsonError("Invalid project id", 400);
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
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select,
    });
    if (!project) return jsonError("Project not found", 404);
    return NextResponse.json(project, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch project", 500);
  }
};
