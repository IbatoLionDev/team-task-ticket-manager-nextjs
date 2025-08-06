"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useClientFetch } from "@/hooks/useClientFetch";

export function UserLogout() {
  const router = useRouter();
  const [shouldLogout, setShouldLogout] = useState(false);
  const { loading } = useClientFetch(
    shouldLogout ? "/api/logout" : null,
    "POST",
    {
      onSuccess: () => {
        router.push("/sign-in");
      },
    }
  );

  const handleLogout = () => {
    setShouldLogout(true);
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
