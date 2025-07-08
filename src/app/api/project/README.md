# Project API

This API provides RESTful endpoints to manage projects in the system.

## Endpoints

### GET /api/project

Returns a list of all projects.

**Response:**

- 200: Array of project objects (with their tasks)

### GET /api/project/[id]

Returns a single project by its ID.

**Params:**

- `id` (int, required): Project ID

**Response:**

- 200: Project object (with its tasks)
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

- All dates must be in ISO 8601 format.
- The `tasks` field is an array of task objects to be created with the project (optional).
- Returns related tasks in all responses.
