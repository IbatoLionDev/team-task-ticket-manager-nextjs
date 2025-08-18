"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useClientFetch } from "@/hooks/useClientFetch";

export function ProjectDelete({ projectId, onDeleteSuccess }) {
  const [triggerDelete, setTriggerDelete] = useState(false);

  const { data, loading, error } = useClientFetch(
    triggerDelete ? `/api/project?id=${projectId}` : null,
    "DELETE"
  );

  useEffect(() => {
    if (data) {
      setTriggerDelete(false);
      if (typeof onDeleteSuccess === "function") {
        onDeleteSuccess(projectId);
      }
    }
  }, [data, onDeleteSuccess, projectId]);

  const handleDelete = () => {
    if (!loading) {
      setTriggerDelete(true);
    }
  };

  return (
    <DropdownMenuItem onClick={handleDelete} disabled={loading}>
      <Trash2 className="text-muted-foreground" />
      <span>Delete Project</span>
      {loading && <span>...</span>}
      {error && <span className="text-red-600">{error}</span>}
    </DropdownMenuItem>
  );
}
