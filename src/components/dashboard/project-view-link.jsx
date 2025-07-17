import Link from "next/link";
import { Folder } from "lucide-react";

export function ProjectViewLink({ projectId }) {
  return (
    <Link href={`/dashboard/projects/${projectId}`}>
      <Folder className="text-muted-foreground" />
      <span>View Project</span>
    </Link>
  );
}
