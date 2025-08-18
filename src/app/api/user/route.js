import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { jsonError, buildSelect, parsePagination } from "@/helpers/apiHelpers";

const validRoles = ["ADMIN", "USER"];
const validateRole = (r) => {
  if (!r) return "USER";
  if (!validRoles.includes(r)) return null;
  return r;
};
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

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const allFields = Object.keys(userSelectFields);
    const select = buildSelect(allFields, searchParams);
    const { skip, take } = parsePagination(searchParams);
    const users = await prisma.user.findMany({
      select,
      ...(skip ? { skip } : {}),
      ...(take ? { take } : {}),
    });
    return NextResponse.json(users, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to fetch users", 500);
  }
};

export const POST = async (request) => {
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
      return jsonError("Missing required fields", 400);
    const userRole = validateRole(role);
    if (userRole === null) return jsonError("Invalid role value", 400);
    const hashedPassword = await hash(password, 10);
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
  } catch (e) {
    console.error(e);
    return jsonError("Failed to create user", 500);
  }
};

export const PUT = async (request) => {
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
    if (!id) return jsonError("Missing user id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid user id", 400);
    const userRole = validateRole(role);
    if (role && userRole === null) return jsonError("Invalid role value", 400);
    const dataToUpdate = { firstName, username, lastName, email, phoneNumber };
    if (password) dataToUpdate.password = await hash(password, 10);
    if (userRole) dataToUpdate.role = userRole;
    const updatedUser = await prisma.user.update({
      where: { id: idInt },
      data: dataToUpdate,
      select: userSelectFields,
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (e) {
    console.error(e);
    return jsonError("Failed to update user", 500);
  }
};

export const PATCH = async (request) => {
  try {
    const { id, ...data } = await request.json();
    if (!id) return jsonError("Missing user id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid user id", 400);
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
  } catch (e) {
    console.error(e);
    return jsonError("Failed to patch user", 500);
  }
};

export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return jsonError("Missing user id", 400);
    const idInt = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idInt)) return jsonError("Invalid user id", 400);
    await prisma.user.delete({ where: { id: idInt } });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return jsonError("Failed to delete user", 500);
  }
};
