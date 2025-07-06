# User API Documentation

This is a RESTful API for managing users. It provides endpoints to create, read, update, and delete user records.

## Base URL

`/api/user`

## Endpoints

### GET /api/user

Fetch all users.

- **Response:**
  - Status: 200 OK
  - Body: JSON array of user objects

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
