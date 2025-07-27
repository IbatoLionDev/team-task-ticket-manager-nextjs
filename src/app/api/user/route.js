import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const allFields = [
      "id",
      "firstName",
      "username",
      "lastName",
      "email",
      "phoneNumber",
      "createdAt",
      "updatedAt",
      "assignedTasks",
      "completedTasks",
      "completedSubtasks",
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
    // Pagination logic: only apply if page or pageSize is present
    let skip, take;
    const hasPage = searchParams.has("page");
    const hasPageSize = searchParams.has("pageSize");
    if (hasPage || hasPageSize) {
      const page = parseInt(searchParams.get("page"), 10) || 1;
      const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;
      if (page > 0 && pageSize > 0) {
        skip = (page - 1) * pageSize;
        take = pageSize;
      }
    }
    const users = await prisma.user.findMany({
      select,
      ...(typeof skip !== "undefined" ? { skip } : {}),
      ...(typeof take !== "undefined" ? { take } : {}),
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { firstName, username, lastName, email, password, phoneNumber } =
      await request.json();

    if (!firstName || !username || !lastName || !email || !password)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const hashedPassword = await hash(password, 10); // hash password before saving

    const newUser = await prisma.user.create({
      data: {
        firstName,
        username,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
      },
      select: {
        id: true,
        firstName: true,
        username: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        assignedTasks: true,
        completedTasks: true,
        completedSubtasks: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, firstName, username, lastName, email, password, phoneNumber } =
      await request.json();

    if (!id)
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

    const dataToUpdate = {
      firstName,
      username,
      lastName,
      email,
      phoneNumber,
    };
    if (password) dataToUpdate.password = await hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: idInt },
      data: dataToUpdate,
      select: {
        id: true,
        firstName: true,
        username: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        assignedTasks: true,
        completedTasks: true,
        completedSubtasks: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const { id, ...data } = await request.json();

    if (!id)
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

    if (data.password) data.password = await hash(data.password, 10);
    else delete data.password;

    const updatedUser = await prisma.user.update({
      where: { id: idInt },
      data,
      select: {
        id: true,
        firstName: true,
        username: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        assignedTasks: true,
        completedTasks: true,
        completedSubtasks: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to patch user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

    await prisma.user.delete({ where: { id: idInt } });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
