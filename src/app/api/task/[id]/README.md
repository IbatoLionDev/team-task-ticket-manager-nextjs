# Task Dynamic Route API

This API provides an endpoint to fetch a single task by its ID.

## Endpoint

### GET /api/task/[id]

Returns a single task by its ID.

**Params:**

- `id` (int, required): Task ID (as part of the URL)

**Response:**

- 200: Task object (with project, user, and subtasks)
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
