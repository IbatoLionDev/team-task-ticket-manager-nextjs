import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
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

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        username,
        lastName,
        email,
        password: password ? await hash(password, 10) : undefined, // conditionally hash updated password
        phoneNumber,
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

    const dataToUpdate = {
      ...data,
      password: data.password ? await hash(data.password, 10) : undefined, // apply hash on partial password update
    };

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
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

    const idInt = parseInt(id, 10);
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
