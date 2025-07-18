# Task API

This API provides RESTful endpoints to manage tasks in the system.

## Endpoints

### GET /api/task

Returns a paginated list of tasks. You can filter the fields returned by passing query parameters with the field names. Pagination is handled with `page` and `pageSize` query params.

**Query Parameters:**

- Any field name (e.g. `title`, `urgency`, etc.) — if present, only those fields will be returned for each task.
- `page` (optional): number — page number (default: 1)
- `pageSize` (optional): number — number of tasks per page (default: 10)

**Examples:**

- `/api/task?title&urgency&page=2&pageSize=5` returns only the title and urgency fields for tasks on page 2, 5 per page.
- `/api/task?page=1&pageSize=20` returns the first 20 tasks with all fields.
- `/api/task` returns the first 10 tasks with all fields.

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "data": [ ...tasks... ],
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
  }
  ```

### GET /api/task/[id]

Returns a single task by its ID. You can filter the fields returned by passing query parameters with the field names.

**Params:**

- `id` (int, required): Task ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `title`, `urgency`, etc.) — if present, only those fields will be returned for the task.

**Response:**

- 200: Task object (with project, user, and subtasks)
- 400: Invalid task id
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

- If no query params are provided, all fields are returned.
- If query params are provided, only those fields are returned.
- Pagination is handled with `page` and `pageSize`.
- All dates must be in ISO 8601 format.
- The `subTasks` field is an array of subtask objects to be created with the task (optional).
- Returns related project, user, and subtasks in all responses.
