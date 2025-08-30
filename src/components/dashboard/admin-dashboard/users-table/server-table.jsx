/* eslint-disable react/prop-types */
import UsersTableClient from "./client-table";

// Server wrapper: fetches data from internal API and passes to client component
export default async function UsersTableServer(props) {
  const { searchParams = {} } = props || {};

  // Use NEXT_PUBLIC_API_BASE from .env (e.g. http://localhost:3000/api)
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api";
  const baseNoSlash = base.replace(/\/$/, "");
  const urlString = `${baseNoSlash}/user`;

  const url = new URL(urlString);
  Object.entries(searchParams || {}).forEach(
    ([k, v]) => v != null && url.searchParams.set(k, String(v))
  );

  const res = await fetch(url.toString(), { cache: "no-store" });
  const users = await res.json();

  // compute simple metrics
  const total = Array.isArray(users) ? users.length : 0;
  const admins = Array.isArray(users)
    ? users.filter((u) => u.role === "ADMIN").length
    : 0;
  const recent = Array.isArray(users)
    ? users.filter((u) => {
        try {
          return (
            new Date(u.createdAt) >
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          );
        } catch {
          return false;
        }
      }).length
    : 0;

  return (
    <UsersTableClient users={users || []} metrics={{ total, admins, recent }} />
  );
}
