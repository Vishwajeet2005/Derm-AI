import asyncio
from app.db.database import SessionLocal, engine
from app.db.models import Condition, Base
import uuid

conditions = [
    {
        "condition_name": "Melanoma",
        "fitzpatrick_spectrum": "I-VI",
        "category": "malignant",
        "tropical_flag": False,
        "description": "A serious form of skin cancer that begins in cells known as melanocytes. It can develop from an existing mole or appear suddenly as a new dark spot on the skin. Early detection is critical.",
        "icd_code": "C43"
    },
    {
        "condition_name": "Eczema (Atopic Dermatitis)",
        "fitzpatrick_spectrum": "I-VI",
        "category": "inflammatory",
        "tropical_flag": False,
        "description": "A condition that makes your skin red and itchy. It's common in children but can occur at any age. It is long lasting and tends to flare periodically.",
        "icd_code": "L20"
    },
    {
        "condition_name": "Psoriasis",
        "fitzpatrick_spectrum": "I-VI",
        "category": "autoimmune",
        "tropical_flag": False,
        "description": "A skin disease that causes a rash with itchy, scaly patches, most commonly on the knees, elbows, trunk and scalp.",
        "icd_code": "L40"
    },
    {
        "condition_name": "Melanocytic nevus",
        "fitzpatrick_spectrum": "I-VI",
        "category": "benign",
        "tropical_flag": False,
        "description": "Commonly known as a mole, this is a type of non-cancerous skin growth made of pigment-producing cells (melanocytes).",
        "icd_code": "D22"
    },
    {
        "condition_name": "Basal cell carcinoma",
        "fitzpatrick_spectrum": "I-VI",
        "category": "malignant",
        "tropical_flag": False,
        "description": "A type of skin cancer that most often develops on areas of skin exposed to the sun, such as the face. It often appears as a slightly transparent bump on the skin.",
        "icd_code": "C44"
    }
]

def seed_conditions():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        print("Seeding conditions...")
        for c_data in conditions:
            # Check if exists
            exists = db.query(Condition).filter(Condition.condition_name == c_data["condition_name"]).first()
            if not exists:
                new_cond = Condition(
                    id=uuid.uuid4(),
                    condition_name=c_data["condition_name"],
                    fitzpatrick_spectrum=c_data["fitzpatrick_spectrum"],
                    category=c_data["category"],
                    tropical_flag=c_data["tropical_flag"],
                    description=c_data["description"],
                    icd_code=c_data["icd_code"]
                )
                db.add(new_cond)
        db.commit()
        print("Conditions seeded successfully!")
    except Exception as e:
        print(f"Error seeding conditions: {e}")
    finally:
        db.close()

if __name__ == '__main__':
    seed_conditions()
