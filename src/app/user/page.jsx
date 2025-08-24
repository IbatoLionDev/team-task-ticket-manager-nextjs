import UsersTableServer from "@/components/dashboard/admin-dashboard/users-table/server-table";

export default async function UserPage({ searchParams }) {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <UsersTableServer searchParams={searchParams} />
    </main>
  );
}
