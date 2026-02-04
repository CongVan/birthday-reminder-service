# Birthday Reminder Service

A birthday reminder service built with Node.js, TypeScript, and Docker.

## Tech Stack
- Node.js
- TypeScript
- Turbo
- Biome
- Express
- Mongoose
- Redis
- BullMQ
- Zod
- Jest
## Prerequisites
- Docker
- Docker Compose
## Getting Started

To run the application locally, use Docker Compose. This setup utilizes `docker compose watch` for a better development experience, syncing your changes directly to the containers.

```docker compose up --watch``

The application consists of the following services:

| Service | Description | Port |
| :--- | :--- | :--- |
| **api** | The REST API service for managing users and reminders. | `8080` |
| **worker** | Background worker service for processing birthday checks and sending notifications. | - |
| **mongodb** | Primary database for storing user and reminder data. | `27017` |
| **redis_db** | Redis instance used for job queues and caching. | `6379` |

## Stopping the Application

To stop the services and remove the containers, run:

```bash
docker compose down
```
