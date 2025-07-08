# Subtask API

This API provides RESTful endpoints to manage subtasks in the system.

## Endpoints

### GET /api/subtask

Returns a list of all subtasks. You can filter the fields returned by passing query parameters with the field names. You can also limit the number of results with the `index` query param.

**Query Parameters:**

- Any field name (e.g. `title`, `isDone`, etc.) — if present, only those fields will be returned for each subtask.
- `index` (optional): number — limits the number of subtasks returned.

**Examples:**

- `/api/subtask?title&isDone` returns only the title and isDone fields for all subtasks.
- `/api/subtask?index=5` returns the first 5 subtasks with all fields.
- `/api/subtask` returns all subtasks with all fields.

### GET /api/subtask/[id]

Returns a single subtask by its ID.

**Params:**

- `id` (int, required): Subtask ID (as part of the URL)

**Response:**

- 200: Subtask object (with its parent task)
- 400: Invalid subtask id
- 404: Subtask not found

### POST /api/subtask

Creates a new subtask.

**Body:**

```
{
  "taskId": int,
  "title": "string",
  "description": "string",
  "isDone": boolean (optional),
  "finishedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" (optional)
}
```

**Response:**

- 201: Created subtask object
- 400: Missing required fields

### PUT /api/subtask

Updates a subtask (full update).

**Body:**

```
{
  "id": int,
  ...other fields as in POST...
}
```

**Response:**

- 200: Updated subtask object
- 400: Missing or invalid subtask id

### PATCH /api/subtask

Updates a subtask (partial update).

**Body:**

```
{
  "id": int,
  ...fields to update...
}
```

**Response:**

- 200: Updated subtask object
- 400: Missing or invalid subtask id

### DELETE /api/subtask?id=ID

Deletes a subtask by its ID.

**Response:**

- 200: Success message
- 400: Missing or invalid subtask id

---

## Notes

- If no query params are provided, all fields are returned.
- If query params are provided, only those fields are returned.
- The `index` param limits the number of results.
- Returns related task in all responses.
