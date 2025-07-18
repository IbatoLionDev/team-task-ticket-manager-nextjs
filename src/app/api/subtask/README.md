# Subtask API

This API provides RESTful endpoints to manage subtasks in the system.

## Endpoints

### GET /api/subtask

Returns a list of subtasks. You can filter the fields returned by passing query parameters with the field names. Si usas los parámetros `page` o `pageSize`, la respuesta será paginada; si no, se devuelven todos los subtasks.

**Query Parameters:**

- Any field name (e.g. `title`, `isDone`, etc.) — if present, only those fields will be returned for each subtask.
- `page` (optional): number — page number (pagination only if present)
- `pageSize` (optional): number — number of subtasks per page (pagination only if present)

**Examples:**

- `/api/subtask?title&isDone&page=2&pageSize=5` returns only the title and isDone fields for subtasks on page 2, 5 per page.
- `/api/subtask?page=1&pageSize=20` returns the first 20 subtasks with all fields.
- `/api/subtask` returns all subtasks with all fields (no pagination).

- **Response:**
  - Status: 200 OK
  - Body: JSON array of subtask objects (or paginated object if paginación activa)

### GET /api/subtask/[id]

Returns a single subtask by its ID. You can filter the fields returned by passing query parameters with the field names.

**Params:**

- `id` (int, required): Subtask ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `title`, `isDone`, etc.) — if present, only those fields will be returned for the subtask.

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
- Pagination is only applied if `page` or `pageSize` is present.
- Returns related task in all responses.
