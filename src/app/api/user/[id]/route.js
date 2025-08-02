import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
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
  let select = {};

  // Negative programming: if no query params, select all fields directly
  if (![...searchParams.keys()].some((key) => allFields.includes(key)))
    select = allFields.reduce((accumulator, fieldName) => {
      accumulator[fieldName] = true;
      return accumulator;
    }, {});
  else
    for (const fieldName of allFields)
      if (searchParams.has(fieldName)) select[fieldName] = true;

  const userId = typeof id === "string" ? parseInt(id, 10) : id;
  if (!userId || isNaN(userId))
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select,
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
