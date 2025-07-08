# Task Dynamic Route API

This API provides an endpoint to fetch a single task by its ID. You can filter the fields returned by passing query parameters with the field names.

## Endpoint

### GET /api/task/[id]

Returns a single task by its ID.

**Params:**

- `id` (int, required): Task ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `title`, `urgency`, etc.) — if present, only those fields will be returned for the task.

**Examples:**

- `/api/task/1?title&urgency` returns only the title and urgency fields for the task with id 1.
- `/api/task/1` returns all fields for the task with id 1.

**Response:**

- 200: Task object (with project, user, and subtasks if requested)
- 400: Invalid task id
- 404: Task not found

**Example:**

```
GET /api/task/1
```

**Response:**

```
{
  "id": 1,
  "title": "Task A",
  ...
  "project": { ... },
  "user": { ... },
  "subTasks": [ ... ]
}
```
