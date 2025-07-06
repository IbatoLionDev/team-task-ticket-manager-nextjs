// src/app/(auth)/sign-up/action.js
"use server";

import { redirect } from "next/navigation";
import { API_BASE } from "@/lib/environments";

export async function signUpAction(formData) {
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!firstName || !lastName || !username || !email || !password)
    throw new Error("All fields are required");

  const res = await fetch(`${API_BASE}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, username, lastName, email, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to create user");
  }

  redirect("/sign-in");
}
