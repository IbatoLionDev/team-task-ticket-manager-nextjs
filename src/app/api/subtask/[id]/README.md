# API Subtask by ID Endpoint

This endpoint provides detailed information about a specific subtask identified by its ID.

## Available Method

### GET

- Retrieves a subtask by its ID.
- Supports field selection via query parameters. For example, `?title=true&status=true` will return only those fields.
- Returns subtask information including related task entity.

## Managed Fields

- `id` (Int): Unique identifier of the subtask.
- `taskId` (Int): ID of the associated task.
- `task` (Task): The task object.
- `title` (String): Title of the subtask.
- `description` (String): Description of the subtask.
- `status` (TaskStatus enum): Current status of the subtask.
- `createdAt` (DateTime): Timestamp when the subtask was created.
- `updatedAt` (DateTime): Timestamp when the subtask was last updated.
- `finishedAt` (DateTime, optional): Timestamp when the subtask was finished.

## Error Handling

- Returns appropriate HTTP status codes and error messages for:
  - Invalid subtask ID.
  - Subtask not found.
  - Server errors during the query.

## Notes

- This endpoint is adapted to the Prisma schema defined in `prisma/schema.prisma`.
- Related task entity is eagerly loaded to provide comprehensive subtask information.
- Client applications should handle nested data appropriately.

## Example Request

```
GET /api/subtask/1?title=true&status=true
```

Returns the subtask with ID 1, showing only the `title` and `status` fields along with related task entity.
