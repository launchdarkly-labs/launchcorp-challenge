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


class AuthRequest(BaseModel):
    name: str


@app.post("/login")
def login(payload: AuthRequest):
    if payload.name.strip().lower() != "guest":
        raise HTTPException(status_code=401, detail="Only the 'guest' user can sign in.")
    return {"message": "Welcome, guest!"}
