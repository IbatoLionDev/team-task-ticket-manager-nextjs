# Project API

This API provides RESTful endpoints to manage projects in the system.

## Endpoints

### GET /api/project

Returns a list of projects. You can filter the fields returned by passing query parameters with the field names. If you use the `page` or `pageSize` parameters, the response will be paginated; otherwise, all projects are returned.

**Query Parameters:**

- Any field name (e.g. `title`, `owner`, etc.) — if present, only those fields will be returned for each project.
- `page` (optional): number — page number (pagination only if present)
- `pageSize` (optional): number — number of projects per page (pagination only if present)

**Examples:**

- `/api/project?title&owner&page=2&pageSize=5` returns only the title and owner fields for projects on page 2, 5 per page.
- `/api/project?page=1&pageSize=20` returns the first 20 projects with all fields.
- `/api/project` returns all projects with all fields (no pagination).

- **Response:**
  - Status: 200 OK
  - Body: JSON array of project objects (or paginated object if pagination is active)

### GET /api/project/[id]

Returns a single project by its ID. You can filter the fields returned by passing query parameters with the field names.

**Params:**

- `id` (int, required): Project ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `title`, `owner`, etc.) — if present, only those fields will be returned for the project.

**Response:**

- 200: Project object (with its tasks)
- 400: Invalid project id
- 404: Project not found

### POST /api/project

Creates a new project.

**Body:**

```
{
  "title": "string",
  "description": "string",
  "owner": "string",
  "type": "DELIVER_AND_DONE" | "DELIVER_AND_MAINTAIN" | "MAINTAIN_EXISTING" | "INTERNAL",
  "urgency": "LOW" | "MEDIUM" | "HIGH",
  "expectedPayment": float,
  "startDate": "YYYY-MM-DDTHH:mm:ss.sssZ" (optional),
  "finishedAt": "YYYY-MM-DDTHH:mm:ss.sssZ" (optional),
  "tasks": [ { ...task fields... } ] (optional)
}
```

**Response:**

- 201: Created project object
- 400: Missing required fields

### PUT /api/project

Updates a project (full update).

**Body:**

```
{
  "id": int,
  ...other fields as in POST...
}
```

**Response:**

- 200: Updated project object
- 400: Missing or invalid project id

### PATCH /api/project

Updates a project (partial update).

**Body:**

```
{
  "id": int,
  ...fields to update...
}
```

**Response:**

- 200: Updated project object
- 400: Missing or invalid project id

### DELETE /api/project?id=ID

Deletes a project by its ID.

**Response:**

- 200: Success message
- 400: Missing or invalid project id

---

## Notes

- If no query params are provided, all fields are returned.
- If query params are provided, only those fields are returned.
- Pagination is only applied if `page` or `pageSize` is present.
- All dates must be in ISO 8601 format.
- The `tasks` field is an array of task objects to be created with the project (optional).
- Returns related tasks in all responses.
