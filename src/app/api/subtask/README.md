# Subtask API

This API provides RESTful endpoints to manage subtasks in the system.

## Endpoints

### GET /api/subtask

Returns a list of all subtasks.

**Response:**

- 200: Array of subtask objects (with their parent task)

### GET /api/subtask/[id]

Returns a single subtask by its ID.

**Params:**

- `id` (int, required): Subtask ID

**Response:**

- 200: Subtask object (with its parent task)
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

- All dates must be in ISO 8601 format.
- Returns related task in all responses.
