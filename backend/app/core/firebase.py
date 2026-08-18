import os
import logging
import firebase_admin
from firebase_admin import credentials, firestore
from .config import settings

logger = logging.getLogger(__name__)

db = None

def init_firebase():
    global db
    if os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
        try:
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred)
            db = firestore.client()
            logger.info("Firebase initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")
            db = None
    else:
        logger.warning("Firebase credentials not found. Progression tracking will use mock storage.")
        db = None

def get_firestore_db():
    return db
