# User API Documentation

This is a RESTful API for managing users. It provides endpoints to create, read, update, and delete user records.

## Base URL

`/api/user`

## Endpoints

### GET /api/user

Returns a list of users. You can filter the fields returned by passing query parameters with the field names. Si usas los parámetros `page` o `pageSize`, la respuesta será paginada; si no, se devuelven todos los usuarios.

**Query Parameters:**

- Any field name (e.g. `email`, `username`, etc.) — if present, only those fields will be returned for each user.
- `page` (optional): number — page number (pagination only if present)
- `pageSize` (optional): number — number of users per page (pagination only if present)

**Examples:**

- `/api/user?email&username&page=2&pageSize=5` returns only the email and username fields for users on page 2, 5 per page.
- `/api/user?page=1&pageSize=20` returns the first 20 users with all fields.
- `/api/user` returns all users with all fields (no pagination).

- **Response:**
  - Status: 200 OK
  - Body: JSON array of user objects (or paginated object if paginación activa)

### GET /api/user/[id]

Returns a single user by their ID. You can filter the fields returned by passing query parameters with the field names.

**Params:**

- `id` (int, required): User ID (as part of the URL)

**Query Parameters:**

- Any field name (e.g. `email`, `username`, etc.) — if present, only those fields will be returned for the user.

**Response:**

- 200: User object (with their tasks)
- 400: Invalid user id
- 404: User not found

### POST /api/user

Create a new user.

- **Request Body (JSON):**

  - `firstName` (string, required)
  - `username` (string, required)
  - `lastName` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `phoneNumber` (string, optional)

- **Response:**

  - Status: 201 Created
  - Body: JSON object of the created user

- **Errors:**
  - 400 Bad Request: Missing required fields
  - 500 Internal Server Error: Failed to create user

### PUT /api/user

Update a user fully.

- **Request Body (JSON):**

  - `id` (number, required)
  - `firstName` (string, optional)
  - `username` (string, optional)
  - `lastName` (string, optional)
  - `email` (string, optional)
  - `password` (string, optional)
  - `phoneNumber` (string, optional)

- **Response:**

  - Status: 200 OK
  - Body: JSON object of the updated user

- **Errors:**
  - 400 Bad Request: Missing user id
  - 500 Internal Server Error: Failed to update user

### PATCH /api/user

Partially update a user.

- **Request Body (JSON):**

  - `id` (number, required)
  - Other fields to update (any subset of user fields)

- **Response:**

  - Status: 200 OK
  - Body: JSON object of the updated user

- **Errors:**
  - 400 Bad Request: Missing user id
  - 500 Internal Server Error: Failed to patch user

### DELETE /api/user?id={id}

Delete a user by id.

- **Query Parameter:**

  - `id` (number, required)

- **Response:**

  - Status: 200 OK
  - Body: JSON object with success message

- **Errors:**
  - 400 Bad Request: Missing or invalid user id
  - 500 Internal Server Error: Failed to delete user

## Error Handling

All error responses return a JSON object with an `error` field describing the issue, along with an appropriate HTTP status code.

## Notes

- If no query params are provided, all fields are returned.
- If query params are provided, only those fields are returned.
- Pagination is only applied if `page` or `pageSize` is present.
- Passwords are never returned in responses.
