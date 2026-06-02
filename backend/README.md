# Launchcorp Backend

Python REST API for the Launchcorp Challenge app, handling user registration and authentication.

## Tech Stack

| Tool | Purpose |
|------|---------|
| FastAPI | Web framework |
| Uvicorn | ASGI server |
| Pydantic | Request validation |

## Getting Started

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Start the server

```bash
uvicorn main:app --reload --port 8000
```

API runs at **http://localhost:8000**

> The frontend expects the backend on port `8000`. Do not change the port without updating the `API` constant in `frontend/src/components/Auth.jsx`.

---

## API Endpoints

### `POST /register`

Creates a new user account.

**Request body:**

```json
{
  "name": "string",
  "password": "string"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | User created — returns welcome message |
| `409` | User already exists |

**Example:**

```bash
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "password": "secret"}'
```

---

### `POST /login`

Authenticates an existing user.

**Request body:**

```json
{
  "name": "string",
  "password": "string"
}
```

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | Login successful — returns welcome back message |
| `401` | Invalid name or password |

**Example:**

```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "password": "secret"}'
```

---

## Interactive API Docs

FastAPI provides built-in Swagger UI at:

```
http://localhost:8000/docs
```

---

## Notes

- User data is stored **in-memory** — all registered users are lost when the server restarts.
- CORS is configured to allow requests from `http://localhost:5173` (the Vite dev server) only.
- Passwords are stored in plain text — this is intentional for a challenge/demo context and should not be used in production.

## Project Structure

```
backend/
├── main.py           # FastAPI app — routes and in-memory store
└── requirements.txt  # Python dependencies
```
