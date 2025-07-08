# Task API

This API provides RESTful endpoints to manage tasks in the system.

## Endpoints

### GET /api/task

Returns a list of all tasks.

**Response:**

- 200: Array of task objects (with project, user, and subtasks)

### GET /api/task/[id]

Returns a single task by its ID.

**Params:**

- `id` (int, required): Task ID

**Response:**

- 200: Task object (with project, user, and subtasks)
- 404: Task not found

### POST /api/task

Creates a new task.

**Body:**

```
{
  "projectId": int,
  "userId": int (optional),
  "title": "string",
  "description": "string",
  "urgency": "LOW" | "MEDIUM" | "HIGH",
  "isDone": boolean (optional),
  "dueDate": "YYYY-MM-DDTHH:mm:ss.sssZ" (optional),
  "finishedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" (optional),
  "subTasks": [ { ...subtask fields... } ] (optional)
}
```

**Response:**

- 201: Created task object
- 400: Missing required fields

### PUT /api/task

Updates a task (full update).

**Body:**

```
{
  "id": int,
  ...other fields as in POST...
}
```

**Response:**

- 200: Updated task object
- 400: Missing or invalid task id

### PATCH /api/task

Updates a task (partial update).

**Body:**

```
{
  "id": int,
  ...fields to update...
}
```

**Response:**

- 200: Updated task object
- 400: Missing or invalid task id

### DELETE /api/task?id=ID

Deletes a task by its ID.

**Response:**

- 200: Success message
- 400: Missing or invalid task id

---

## Notes

- All dates must be in ISO 8601 format.
- The `subTasks` field is an array of subtask objects to be created with the task (optional).
- Returns related project, user, and subtasks in all responses.
