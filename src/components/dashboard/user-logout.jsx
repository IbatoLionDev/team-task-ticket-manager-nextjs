"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useClientFetch } from "@/hooks/useClientFetch";

export function UserLogout() {
  const router = useRouter();
  const { execute, loading } = useClientFetch({
    url: "/api/logout",
    method: "POST",
    onSuccess: () => {
      router.push("/sign-in");
    },
  });

  const handleLogout = () => {
    execute();
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="cursor-pointer"
      disabled={loading}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
