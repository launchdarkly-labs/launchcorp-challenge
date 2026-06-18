import base64
import json

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Launchcorp API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Minimal context payload used purely for validation — not stored anywhere.
_LD_CONTEXT_B64 = base64.b64encode(
    json.dumps({"kind": "user", "key": "validate"}).encode()
).decode()
_LD_EVAL_URL = "https://clientsdk.launchdarkly.com/sdk/evalx/{}/contexts/{}"

# LD environment IDs are 24-character hex strings.
_CLIENT_ID_LENGTH = 24


class AuthRequest(BaseModel):
    name: str


class ClientIdRequest(BaseModel):
    client_id: str


@app.post("/login")
def login(payload: AuthRequest):
    if payload.name.strip().lower() != "guest":
        raise HTTPException(status_code=401, detail="Only the 'guest' user can sign in.")
    return {"message": "Welcome, guest!"}


@app.post("/validate-client-id")
async def validate_client_id(payload: ClientIdRequest):
    client_id = payload.client_id.strip()

    if len(client_id) != _CLIENT_ID_LENGTH:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid client-side ID — expected {_CLIENT_ID_LENGTH} characters, got {len(client_id)}.",
        )

    url = _LD_EVAL_URL.format(client_id, _LD_CONTEXT_B64)
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(url)
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="Could not reach LaunchDarkly to validate ID.")

    if resp.status_code == 401:
        raise HTTPException(status_code=401, detail="Invalid LaunchDarkly client-side ID.")

    return {"message": "Valid client-side ID."}
