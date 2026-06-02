from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Launchcorp API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5176"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory store
users: dict[str, str] = {}


class AuthRequest(BaseModel):
    name: str
    password: str


@app.post("/register")
def register(payload: AuthRequest):
    if payload.name in users:
        raise HTTPException(status_code=409, detail="User already exists")
    users[payload.name] = payload.password
    return {"message": f"Welcome to Launchcorp, {payload.name}!"}


@app.post("/login")
def login(payload: AuthRequest):
    if users.get(payload.name) != payload.password:
        raise HTTPException(status_code=401, detail="Invalid name or password")
    return {"message": f"Welcome back, {payload.name}!"}
