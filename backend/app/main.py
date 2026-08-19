from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.firebase import init_firebase
from app.db.database import engine, Base
import traceback

# Import Routers
from app.api.auth import router as auth_router
from app.api.diagnose import router as diagnose_router
from app.api.history import router as history_router
from app.api.progression import router as progression_router
from app.api.doctors import router as doctors_router
from app.api.conditions import router as conditions_router

# Create tables
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print("Database connection failed on startup:", e)

from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title="DermAI API")

# Ensure uploads dir exists before mounting
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Configure CORS
origins = settings.ALLOWED_ORIGINS.split(",") if settings.ALLOWED_ORIGINS else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error", "traceback": traceback.format_exc()},
        headers={"Access-Control-Allow-Origin": request.headers.get("origin", "*")}
    )

@app.on_event("startup")
async def startup_event():
    init_firebase()

# Include Routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(diagnose_router, prefix="/api/v1/diagnose", tags=["diagnose"])
app.include_router(history_router, prefix="/api/v1/history", tags=["history"])
app.include_router(progression_router, prefix="/api/v1/progression", tags=["progression"])
app.include_router(doctors_router, prefix="/api/v1/doctors", tags=["doctors"])
app.include_router(conditions_router, prefix="/api/v1/conditions", tags=["conditions"])

@app.get("/")
def read_root():
    return {"message": "Welcome to DermAI API"}
