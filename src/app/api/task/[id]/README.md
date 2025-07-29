# API Task by ID Endpoint

This endpoint provides detailed information about a specific task identified by its ID.

## Available Method

### GET

- Retrieves a task by its ID.
- Supports field selection via query parameters. For example, `?title=true&status=true` will return only those fields.
- Returns task information including related entities:
  - `project`: The project to which the task belongs.
  - `assignedTo`: The user assigned to the task.
  - `subTasks`: The subtasks associated with the task.

## Managed Fields

- `id` (Int): Unique identifier of the task.
- `projectId` (Int): ID of the related project.
- `project` (Project): Related project object.
- `assignedToId` (Int, optional): ID of the assigned user.
- `assignedTo` (User, optional): Assigned user object.
- `title` (String): Title of the task.
- `description` (String): Description of the task.
- `urgency` (Urgency enum): Urgency level of the task.
- `status` (TaskStatus enum): Current status of the task.
- `dueDate` (DateTime, optional): Due date of the task.
- `createdAt` (DateTime): Timestamp of task creation.
- `updatedAt` (DateTime): Timestamp of last update.
- `finishedAt` (DateTime, optional): Completion date of the task.
- `subTasks` (Subtask[]): List of subtasks.

## Error Handling

- Returns appropriate HTTP status codes and error messages for:
  - Invalid task ID.
  - Task not found.
  - Server errors during the query.

## Notes

- This endpoint is adapted to the Prisma schema defined in `prisma/schema.prisma`.
- Related entities are eagerly loaded to provide comprehensive task information.
- Client applications should handle nested data appropriately.

## Example Request

```
GET /api/task/1?title=true&status=true
```

Returns the task with ID 1, showing only the `title` and `status` fields along with related entities.
