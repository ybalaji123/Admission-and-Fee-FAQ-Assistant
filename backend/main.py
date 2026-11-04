"""FastAPI entry point for the KLU admissions assistant."""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from starlette.concurrency import run_in_threadpool

from backend.rag import KLUAssistant

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"
load_dotenv(ROOT / ".env")
assistant: KLUAssistant | None = None
startup_error: str | None = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Prepare the local knowledge index before FastAPI starts serving requests."""
    global assistant, startup_error
    if os.getenv("GEMINI_API_KEY", "").strip():
        try:
            assistant = KLUAssistant()
            # Indexing calls Gemini and ChromaDB, so run the blocking work off
            # FastAPI's asynchronous event loop.
            await run_in_threadpool(assistant.ensure_index)
        except Exception as error:
            # The page can still load; /api/health explains why chat is unavailable.
            startup_error = str(error)
            assistant = None
    else:
        startup_error = "Gemini is not configured. Add GEMINI_API_KEY to .env."
    yield


app = FastAPI(title="KLU Admissions Assistant", version="1.0.0", lifespan=lifespan)
app.mount("/static", StaticFiles(directory=FRONTEND), name="static")


class ChatTurn(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(max_length=1000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[ChatTurn] = Field(default_factory=list, max_length=12)


@app.get("/")
async def home() -> FileResponse:
    return FileResponse(FRONTEND / "index.html")


@app.get("/api/health")
async def health() -> dict[str, object]:
    return {
        "ready": assistant is not None,
        "indexed_rows": assistant.collection.count() if assistant and assistant.collection else 0,
        "message": "Ready" if assistant else (startup_error or "Gemini is not configured."),
    }


@app.post("/api/chat")
async def chat(request: ChatRequest) -> dict[str, object]:
    """Send a student's question to the RAG assistant and return its answer."""
    if assistant is None:
        raise HTTPException(status_code=503, detail=startup_error or "Gemini is not configured.")
    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=422, detail="Please enter a question.")
    try:
        history = [turn.model_dump() for turn in request.history]
        # Gemini calls are blocking network I/O; keep them out of the event loop.
        return await run_in_threadpool(assistant.answer, message, history)
    except Exception as error:
        raise HTTPException(status_code=502, detail=f"The assistant could not reach Gemini or the knowledge index: {error}") from error
