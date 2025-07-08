# User Dynamic Route API

This API provides an endpoint to fetch a single user by their ID.

## Endpoint

### GET /api/user/[id]

Returns a single user by their ID.

**Params:**

- `id` (int, required): User ID (as part of the URL)

**Response:**

- 200: User object (with their tasks)
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
