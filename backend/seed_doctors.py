from app.db.database import SessionLocal, engine
from app.db.models import Base, Doctor
import math

Base.metadata.create_all(bind=engine)
db = SessionLocal()

doctors = [
    {
        "name": "Sarah Jenkins",
        "specialization": "Medical Dermatology",
        "clinic_name": "Clear Skin Clinic NYC",
        "address": "123 Park Ave, New York, NY",
        "location_lat": 40.7128,
        "location_lon": -74.0060,
        "consultation_fee": 150.0,
        "insurance_accepted": True,
        "languages_spoken": ["en", "es"],
        "contact": "+1 (555) 123-4567",
        "verified": True
    },
    {
        "name": "Michael Chen",
        "specialization": "Cosmetic Dermatology",
        "clinic_name": "Bay Area Derma",
        "address": "456 Market St, San Francisco, CA",
        "location_lat": 37.7749,
        "location_lon": -122.4194,
        "consultation_fee": 200.0,
        "insurance_accepted": False,
        "languages_spoken": ["en", "zh"],
        "contact": "+1 (555) 987-6543",
        "verified": True
    },
    {
        "name": "Aarav Sharma",
        "specialization": "Clinical Dermatology",
        "clinic_name": "Mumbai Skin Care",
        "address": "Bandra West, Mumbai, India",
        "location_lat": 19.0760,
        "location_lon": 72.8777,
        "consultation_fee": 30.0,
        "insurance_accepted": True,
        "languages_spoken": ["en", "hi"],
        "contact": "+91 98765 43210",
        "verified": True
    },
    {
        "name": "Elena Rodriguez",
        "specialization": "Pediatric Dermatology",
        "clinic_name": "Madrid Derma",
        "address": "Gran Via 10, Madrid, Spain",
        "location_lat": 40.4168,
        "location_lon": -3.7038,
        "consultation_fee": 100.0,
        "insurance_accepted": True,
        "languages_spoken": ["en", "es"],
        "contact": "+34 600 123 456",
        "verified": True
    }
]

for doc in doctors:
    existing = db.query(Doctor).filter(Doctor.name == doc["name"]).first()
    if not existing:
        db.add(Doctor(**doc))

db.commit()
print("Doctors seeded.")
