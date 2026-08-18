from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    FIREBASE_CREDENTIALS_PATH: str = "./firebase-credentials.json"
    ALLOWED_ORIGINS: str = "http://localhost:3000"
    MODEL_PATH: str = "./ml/saved_model/dermai_efficientnetb3"

    class Config:
        env_file = "../.env"

settings = Settings()
