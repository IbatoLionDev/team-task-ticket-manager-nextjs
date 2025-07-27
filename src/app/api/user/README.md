# API User Endpoint

This API endpoint provides full CRUD (Create, Read, Update, Delete) operations for the User model, leveraging Prisma ORM for database interactions.

## Overview

The User model includes personal information fields and relations to tasks and subtasks. This endpoint ensures secure handling of sensitive data such as passwords by hashing them before storage.

## Available HTTP Methods

### GET

- Retrieves a list of users.
- Supports filtering fields via query parameters. For example, `?firstName=true&email=true` will return only those fields.
- Supports pagination with `page` and `pageSize` query parameters.
- Returns user data including related tasks:
  - `assignedTasks`: Tasks assigned to the user.
  - `completedTasks`: Tasks completed by the user.
  - `completedSubtasks`: Subtasks completed by the user.

### POST

- Creates a new user.
- Required fields in the request body: `firstName`, `username`, `lastName`, `email`, `password`.
- Passwords are hashed using bcrypt before being saved.
- Optional field: `phoneNumber`.
- Returns the created user data including related tasks.

### PUT

- Fully updates an existing user identified by `id`.
- Accepts all user fields in the request body.
- Password, if provided, is hashed before saving.
- Returns the updated user data including related tasks.

### PATCH

- Partially updates an existing user identified by `id`.
- Accepts any subset of user fields in the request body.
- Password, if provided, is hashed before saving.
- Returns the updated user data including related tasks.

### DELETE

- Deletes a user identified by `id`.
- Requires `id` as a query parameter.
- Returns a success message upon deletion.

## Data Fields

- `id` (Int): Unique identifier for the user.
- `firstName` (String): User's first name.
- `username` (String): Unique username.
- `lastName` (String): User's last name.
- `email` (String): Unique email address.
- `password` (String): Hashed password (never returned in responses).
- `phoneNumber` (String, optional): User's phone number.
- `createdAt` (DateTime): Timestamp of user creation.
- `updatedAt` (DateTime): Timestamp of last update.
- Relations:
  - `assignedTasks` (Task[]): Tasks assigned to the user.
  - `completedTasks` (Task[]): Tasks completed by the user.
  - `completedSubtasks` (Subtask[]): Subtasks completed by the user.

## Error Handling

- Returns appropriate HTTP status codes and error messages for:
  - Missing required fields.
  - Invalid user IDs.
  - Server errors during database operations.

## Security Considerations

- Passwords are securely hashed using bcrypt before storage.
- Passwords are never returned in API responses.
- Input validation is performed to ensure data integrity.

## Pagination

- Use `page` and `pageSize` query parameters in GET requests to paginate results.
- Defaults: `page=1`, `pageSize=10` if not specified.

## Notes

- This endpoint is tightly coupled with the Prisma schema defined in `prisma/schema.prisma`.
- Relations to tasks and subtasks are eagerly loaded to provide comprehensive user-related data.
- Ensure that client applications handle the nested task data appropriately.

## Example Requests

### GET users with pagination and selected fields

```
GET /api/user?page=2&pageSize=5&firstName=true&email=true
```

### POST create a new user

```json
{
  "firstName": "John",
  "username": "john_doe",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phoneNumber": "123-456-7890"
}
```

### PUT update a user

```json
{
  "id": 1,
  "firstName": "John",
  "username": "john_doe_updated",
  "lastName": "Doe",
  "email": "john_new@example.com",
  "password": "newsecurepassword123",
  "phoneNumber": "123-456-7890"
}
```

### DELETE a user

```
DELETE /api/user?id=1
