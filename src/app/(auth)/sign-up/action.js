// src/app/(auth)/sign-up/action.js
"use server";

import { redirect } from "next/navigation";
import { API_BASE } from "@/lib/environments"; // importamos la constante

export async function signUpAction(formData) {
  // 1. Extraer valores
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const username = formData.get("username")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  // 2. Loguear después del get
  console.log("firstName:", firstName);
  console.log("lastName: ", lastName);
  console.log("username: ", username);
  console.log("email:    ", email);
  console.log("password: ", password);

  // 3. Validar
  if (!firstName || !lastName || !username || !email || !password) {
    throw new Error("All fields are required");
  }

  // 4. Llamada a la API interna usando la constante API_BASE
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

  // 5. Redirigir al sign-in
  redirect("/sign-in");
}
