"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function UsersTableClient({ users = [], metrics = {} }) {
  const [data, setData] = React.useState(users || []);

  React.useEffect(() => setData(users || []), [users]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <div className="text-xs text-muted-foreground">Total users</div>
          <div className="text-lg font-semibold">
            {metrics.total ?? data.length}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Admins</div>
          <div className="text-lg font-semibold">{metrics.admins ?? 0}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">New (7d)</div>
          <div className="text-lg font-semibold">{metrics.recent ?? 0}</div>
        </div>
        <div className="ml-auto">
          <Badge variant="secondary">Server-rendered table</Badge>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{`${u.firstName ?? ""} ${
                u.lastName ?? ""
              }`}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <span className="capitalize">{u.role?.toLowerCase()}</span>
              </TableCell>
              <TableCell>
                {u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
