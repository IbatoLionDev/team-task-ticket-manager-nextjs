# Subtask Dynamic Route API

This API provides an endpoint to fetch a single subtask by its ID.

## Endpoint

### GET /api/subtask/[id]

Returns a single subtask by its ID.

**Params:**

- `id` (int, required): Subtask ID (as part of the URL)

**Response:**

- 200: Subtask object (with its parent task)
- 400: Invalid subtask id
- 404: Subtask not found

**Example:**

```
GET /api/subtask/1
```

**Response:**

```
{
  "id": 1,
  "title": "Subtask A",
  ...
  "task": { ... }
}
```
