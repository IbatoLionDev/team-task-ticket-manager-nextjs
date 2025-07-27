# API Task Endpoint

This API endpoint provides full CRUD (Create, Read, Update, Delete) operations for the Task model, leveraging Prisma ORM for database interactions.

## Overview

The Task model includes fields for project association, assigned user, status, urgency, and related subtasks. This endpoint ensures proper handling of these fields and relations.

## Available HTTP Methods

### GET

- Retrieves a list of tasks.
- Supports filtering fields via query parameters. For example, `?title=true&status=true` will return only those fields.
- Supports pagination with `page` and `pageSize` query parameters.
- Returns task data including related entities:
  - `project`: The project to which the task belongs.
  - `assignedTo`: The user assigned to the task.
  - `subTasks`: The subtasks associated with the task.

### POST

- Creates a new task.
- Required fields in the request body: `projectId`, `title`, `description`, `urgency`.
- Optional fields: `assignedToId`, `status`, `dueDate`, `finishedAt`, `subTasks`.
- Returns the created task data including related entities.

### PUT

- Fully updates an existing task identified by `id`.
- Accepts all task fields in the request body.
- Returns the updated task data including related entities.

### PATCH

- Partially updates an existing task identified by `id`.
- Accepts any subset of task fields in the request body.
- Returns the updated task data including related entities.

### DELETE

- Deletes a task identified by `id`.
- Requires `id` as a query parameter.
- Returns a success message upon deletion.

## Data Fields

- `id` (Int): Unique identifier for the task.
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
  - Missing required fields.
  - Invalid task IDs.
  - Server errors during database operations.

## Pagination

- Use `page` and `pageSize` query parameters in GET requests to paginate results.
- Defaults: `page=1`, `pageSize=10` if not specified.

## Notes

- This endpoint is tightly coupled with the Prisma schema defined in `prisma/schema.prisma`.
- Related entities are eagerly loaded to provide comprehensive task information.
- Ensure that client applications handle nested data appropriately.

## Example Requests

### GET tasks with pagination and selected fields

```
GET /api/task?page=2&pageSize=5&title=true&status=true
```

### POST create a new task

```json
{
  "projectId": 1,
  "assignedToId": 2,
  "title": "New Task",
  "description": "Task description",
  "urgency": "HIGH",
  "status": "PENDING",
  "dueDate": "2024-08-01T00:00:00.000Z",
  "finishedAt": null,
  "subTasks": [
    {
      "title": "Subtask 1",
      "description": "Subtask description",
      "status": "PENDING"
    }
  ]
}
```

### PUT update a task

```json
{
  "id": 1,
  "projectId": 1,
  "assignedToId": 2,
  "title": "Updated Task",
  "description": "Updated description",
  "urgency": "MEDIUM",
  "status": "IN_PROGRESS",
  "dueDate": "2024-08-15T00:00:00.000Z",
  "finishedAt": null
}
```

### DELETE a task

```
DELETE /api/task?id=1
