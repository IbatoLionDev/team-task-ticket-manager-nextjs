# Project Dynamic Route API

This API provides an endpoint to fetch a single project by its ID. You can filter the fields returned by passing query parameters with the field names.

## Endpoint

### GET /api/project/[id]

Returns a single project by its ID.

**Params:**

- `id` (int, required): Project ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `title`, `owner`, etc.) — if present, only those fields will be returned for the project.

**Examples:**

- `/api/project/1?title&owner` returns only the title and owner fields for the project with id 1.
- `/api/project/1` returns all fields for the project with id 1.

**Response:**

- 200: Project object (with its tasks if requested)
- 400: Invalid project id
- 404: Project not found
