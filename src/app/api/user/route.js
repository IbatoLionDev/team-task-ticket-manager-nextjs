import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const validRoles = ["ADMIN", "USER"];

function validateRole(role) {
  if (!role) return "USER"; // default role
  if (!validRoles.includes(role)) {
    return null; // invalid role
  }
  return role;
}

const userSelectFields = {
  id: true,
  firstName: true,
  username: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  assignedTasks: true,
  completedTasks: true,
  completedSubtasks: true,
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const allFields = Object.keys(userSelectFields);
    let select = {};

    // If no query params, select all fields directly
    if (![...searchParams.keys()].some((key) => allFields.includes(key))) {
      select = { ...userSelectFields };
    } else {
      for (const fieldName of allFields) {
        if (searchParams.has(fieldName)) {
          select[fieldName] = true;
        }
      }
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
    const {
      firstName,
      username,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    } = await request.json();

    if (!firstName || !username || !lastName || !email || !password)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const userRole = validateRole(role);
    if (userRole === null) {
      return NextResponse.json(
        { error: "Invalid role value" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10); // hash password before saving

    const newUser = await prisma.user.create({
      data: {
        firstName,
        username,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        role: userRole,
      },
      select: userSelectFields,
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
    const {
      id,
      firstName,
      username,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    } = await request.json();

    if (!id)
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });

    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt))
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

    const userRole = validateRole(role);
    if (role && userRole === null) {
      return NextResponse.json(
        { error: "Invalid role value" },
        { status: 400 }
      );
    }

    const dataToUpdate = {
      firstName,
      username,
      lastName,
      email,
      phoneNumber,
    };
    if (password) dataToUpdate.password = await hash(password, 10);
    if (userRole) dataToUpdate.role = userRole;

    const updatedUser = await prisma.user.update({
      where: { id: idInt },
      data: dataToUpdate,
      select: userSelectFields,
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
