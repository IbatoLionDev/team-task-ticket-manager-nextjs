# Prisma Schema Models Documentation

This document provides an overview of the Prisma schema models used in this project, explaining each model and the rationale behind their design.

## Models

### User
Represents a user in the system.

- **Fields:**
  - `id`: Unique identifier.
  - `firstName`, `lastName`, `username`, `email`, `password`: Basic user information and credentials.
  - `phoneNumber`: Optional contact number.
  - `createdAt`, `updatedAt`: Timestamps for record creation and updates.
- **Relations:**
  - `assignedTasks`: Tasks assigned to this user.
  - `completedTasks`: Tasks completed by this user.
  - `completedSubtasks`: Subtasks completed by this user.

### Project
Represents a project that contains multiple tasks.

- **Fields:**
  - `id`: Unique identifier.
  - `title`, `description`, `owner`: Basic project details.
  - `type`: Enum indicating project type.
  - `urgency`: Enum indicating urgency level.
  - `expectedPayment`: Expected payment for the project.
  - `startDate`, `updatedAt`, `finishedAt`: Timestamps for project lifecycle.
- **Relations:**
  - `tasks`: List of tasks under this project.

### Task
Represents a task within a project.

- **Fields:**
  - `id`: Unique identifier.
  - `projectId`: Foreign key to the project.
  - `title`, `description`: Task details.
  - `urgency`: Urgency level of the task.
  - `isDone`: Boolean indicating if the task is done.
  - `status`: Enum `TaskStatus` indicating the current status (PENDING, IN_PROGRESS, DONE).
  - `dueDate`, `createdAt`, `updatedAt`, `finishedAt`: Timestamps related to the task.
- **Relations:**
  - `project`: The project this task belongs to.
  - `assignedTo`: User assigned to this task.
  - `completedBy`: User who completed this task (can be different from assigned user).
  - `subTasks`: List of subtasks under this task.

### Subtask
Represents a subtask under a task.

- **Fields:**
  - `id`: Unique identifier.
  - `taskId`: Foreign key to the parent task.
  - `title`, `description`: Subtask details.
  - `isDone`: Boolean indicating if the subtask is done.
  - `status`: Enum `TaskStatus` indicating the current status (PENDING, IN_PROGRESS, DONE).
  - `createdAt`, `updatedAt`, `finishedAt`: Timestamps related to the subtask.
- **Relations:**
  - `task`: The parent task.
  - `completedBy`: User who completed this subtask.

## Enums

### Urgency
Defines the urgency levels for projects and tasks.

- `LOW`
- `MEDIUM`
- `HIGH`

### TaskStatus
Defines the status of tasks and subtasks.

- `PENDING`: Task or subtask is pending and not started.
- `IN_PROGRESS`: Task or subtask is currently in progress.
- `DONE`: Task or subtask is completed.

### ProjectType
Defines the type of project.

- `DELIVER_AND_DONE`
- `DELIVER_AND_MAINTAIN`
- `MAINTAIN_EXISTING`
- `INTERNAL`

## Rationale

- The `TaskStatus` enum replaces the simple boolean `isDone` to provide more granular status tracking.
- The `assignedTo` and `completedBy` relations in Task and Subtask models allow tracking who is responsible for and who completed the work, supporting scenarios where these may differ.
- The separation of Task and Subtask models allows for hierarchical task management.
- Enums provide controlled vocabularies for fields like urgency and project type, improving data consistency.

This schema design aims to provide flexibility and clarity in managing projects, tasks, and user responsibilities.
