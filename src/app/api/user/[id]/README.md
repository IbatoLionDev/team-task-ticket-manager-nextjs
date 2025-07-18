# User Dynamic Route API

This API provides an endpoint to fetch a single user by their ID. You can filter the fields returned by passing query parameters with the field names.

## Endpoint

### GET /api/user/[id]

Returns a single user by their ID.

**Params:**

- `id` (int, required): User ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `email`, `username`, etc.) — if present, only those fields will be returned for the user.

**Examples:**

- `/api/user/1?email&username` returns only the email and username fields for the user with id 1.
- `/api/user/1` returns all fields for the user with id 1.

**Response:**

- 200: User object (with their tasks if requested)
- 400: Invalid user id
- 404: User not found

**Example:**

```
GET /api/user/1
```

**Response:**

```
{
  "id": 1,
  "firstName": "John",
  "username": "john123",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "createdAt": "2025-07-07T12:00:00.000Z",
  "updatedAt": "2025-07-07T12:00:00.000Z",
  "tasks": [ ... ]
}
```
