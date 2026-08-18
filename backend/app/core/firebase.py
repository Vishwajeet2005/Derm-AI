import os
import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

db = None

def init_firebase():
    global db
    try:
        if os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred)
            db = firestore.client()
            logger.info("Firebase initialized successfully.")
        else:
            logger.warning(f"Firebase credentials not found at {settings.FIREBASE_CREDENTIALS_PATH}. Firebase features will be disabled.")
    except Exception as e:
        logger.error(f"Error initializing Firebase: {e}")

def get_firestore_db():
    return db
