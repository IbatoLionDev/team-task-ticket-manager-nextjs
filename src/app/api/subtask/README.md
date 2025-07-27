# API Subtask Endpoint

This API endpoint provides full CRUD (Create, Read, Update, Delete) operations for the Subtask model, leveraging Prisma ORM for database interactions.

## Overview

The Subtask model includes fields for task association, status, and timestamps. This endpoint ensures proper handling of these fields and relations.

## Available HTTP Methods

### GET

- Retrieves a list of subtasks.
- Supports filtering fields via query parameters. For example, `?title=true&status=true` will return only those fields.
- Supports pagination with `page` and `pageSize` query parameters.
- Returns subtask data including related task entity.

### POST

- Creates a new subtask.
- Required fields in the request body: `taskId`, `title`, `description`.
- Optional fields: `status`, `finishedAt`.
- Returns the created subtask data including related task.

### PUT

- Fully updates an existing subtask identified by `id`.
- Accepts all subtask fields in the request body.
- Returns the updated subtask data including related task.

### PATCH

- Partially updates an existing subtask identified by `id`.
- Accepts any subset of subtask fields in the request body.
- Returns the updated subtask data including related task.

### DELETE

- Deletes a subtask identified by `id`.
- Requires `id` as a query parameter.
- Returns a success message upon deletion.

## Data Fields

- `id` (Int): Unique identifier for the subtask.
- `taskId` (Int): ID of the related task.
- `task` (Task): Related task object.
- `title` (String): Title of the subtask.
- `description` (String): Description of the subtask.
- `status` (TaskStatus enum): Current status of the subtask.
- `createdAt` (DateTime): Timestamp of subtask creation.
- `updatedAt` (DateTime): Timestamp of last update.
- `finishedAt` (DateTime, optional): Completion date of the subtask.

## Error Handling

- Returns appropriate HTTP status codes and error messages for:
  - Missing required fields.
  - Invalid subtask IDs.
  - Server errors during database operations.

## Pagination

- Use `page` and `pageSize` query parameters in GET requests to paginate results.
- Defaults: `page=1`, `pageSize=10` if not specified.

## Notes

- This endpoint is tightly coupled with the Prisma schema defined in `prisma/schema.prisma`.
- Related task entity is eagerly loaded to provide comprehensive subtask information.
- Ensure that client applications handle nested data appropriately.

## Example Requests

### GET subtasks with pagination and selected fields

```
GET /api/subtask?page=2&pageSize=5&title=true&status=true
```

### POST create a new subtask

```json
{
  "taskId": 1,
  "title": "New Subtask",
  "description": "Subtask description",
  "status": "PENDING",
  "finishedAt": null
}
```

### PUT update a subtask

```json
{
  "id": 1,
  "taskId": 1,
  "title": "Updated Subtask",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "finishedAt": null
}
```

### DELETE a subtask

```
DELETE /api/subtask?id=1
