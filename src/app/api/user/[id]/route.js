import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, safeParseId } from "@/helpers/apiHelpers";

export const GET = async (request, { params }) => {
  const userId = safeParseId(params.id);
  if (!userId) return jsonError("Invalid user id", 400);
  try {
    const { searchParams } = new URL(request.url);
    const allFields = [
      "id",
      "firstName",
      "username",
      "lastName",
      "email",
      "phoneNumber",
      "role",
      "createdAt",
      "updatedAt",
      "assignedTasks",
      "completedTasks",
      "completedSubtasks",
    ];
    const select = buildSelect(allFields, searchParams);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select,
    });
    if (!user) return jsonError("User not found", 404);
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch user", 500);
  }
};
