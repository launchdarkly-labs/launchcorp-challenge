# Launchcorp Backend

Python REST API for the Launchcorp Challenge app. Exposes a single sign-in endpoint that accepts only the `guest` user.

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

### `POST /login`

Authenticates the guest user. Any other name is rejected.

**Request body:**

```json
{
  "name": "guest"
}
```

The comparison is case-insensitive and trims surrounding whitespace, so `"Guest"`, `"GUEST"`, and `" guest "` all succeed.

**Responses:**

| Status | Description |
|--------|-------------|
| `200` | Sign-in successful — returns welcome message |
| `401` | Name was anything other than `guest` |

**Example:**

```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"name": "guest"}'
```

---

## Interactive API Docs

FastAPI provides built-in Swagger UI at:

```
http://localhost:8000/docs
```

---

## Notes

- There is no user database — the only valid identity is the literal `guest`. Restarting the server has no effect on sign-in.
- CORS is configured to allow requests from `http://localhost:5173` (the Vite dev server) only.
- This endpoint is intentionally minimal — there are no passwords, sessions, or tokens. Authentication is illustrative for the challenge/demo context and should not be used in production.

## Project Structure

```
backend/
├── main.py           # FastAPI app — single /login endpoint
└── requirements.txt  # Python dependencies
```
