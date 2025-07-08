# Project Dynamic Route API

This API provides an endpoint to fetch a single project by its ID.

## Endpoint

### GET /api/project/[id]

Returns a single project by its ID.

**Params:**

- `id` (int, required): Project ID (as part of the URL)

**Response:**

- 200: Project object (with its tasks)
- 400: Invalid project id
- 404: Project not found

**Example:**

```
GET /api/project/1
```

**Response:**

```
{
  "id": 1,
  "title": "Project A",
  "description": "Description...",
  ...
  "tasks": [ ... ]
}
```
