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

users = {"Ron", "Steve", "Linda", "Pete"}


class AuthRequest(BaseModel):
    name: str


@app.post("/login")
def login(payload: AuthRequest):
    if payload.name not in users:
        raise HTTPException(status_code=401, detail="Invalid name")
    return {"message": f"Welcome back, {payload.name}!"}
