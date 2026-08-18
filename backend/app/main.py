from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.firebase import init_firebase
from app.db.database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DermAI API")

# Configure CORS
origins = settings.ALLOWED_ORIGINS.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    init_firebase()

@app.get("/")
def read_root():
    return {"message": "Welcome to DermAI API"}
