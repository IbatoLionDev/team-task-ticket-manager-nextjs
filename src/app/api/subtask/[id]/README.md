# Subtask Dynamic Route API

This API provides an endpoint to fetch a single subtask by its ID. You can filter the fields returned by passing query parameters with the field names.

## Endpoint

### GET /api/subtask/[id]

Returns a single subtask by its ID.

**Params:**

- `id` (int, required): Subtask ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `title`, `isDone`, etc.) — if present, only those fields will be returned for the subtask.

**Examples:**

- `/api/subtask/1?title&isDone` returns only the title and isDone fields for the subtask with id 1.
- `/api/subtask/1` returns all fields for the subtask with id 1.

**Response:**

- 200: Subtask object (with its parent task if requested)
- 400: Invalid subtask id
- 404: Subtask not found
