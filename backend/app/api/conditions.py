from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import Condition
import uuid

router = APIRouter()

@router.get("/search")
def search_conditions(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    conditions = db.query(Condition).filter(Condition.condition_name.ilike(f"%{q}%")).all()
    
    return {
        "data": [
            {
                "id": str(c.id),
                "condition_name": c.condition_name,
                "fitzpatrick_spectrum": c.fitzpatrick_spectrum,
                "category": c.category,
                "tropical_flag": c.tropical_flag,
                "description": c.description,
                "ontology_ref": c.ontology_ref,
                "icd_code": c.icd_code
            } for c in conditions
        ]
    }

@router.get("/{condition_id}")
def get_condition(condition_id: str, db: Session = Depends(get_db)):
    try:
        cond_uuid = uuid.UUID(condition_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid condition ID format")
        
    condition = db.query(Condition).filter(Condition.id == cond_uuid).first()
    if not condition:
        raise HTTPException(status_code=404, detail="Condition not found")
        
    return {
        "data": {
            "id": str(condition.id),
            "condition_name": condition.condition_name,
            "fitzpatrick_spectrum": condition.fitzpatrick_spectrum,
            "category": condition.category,
            "tropical_flag": condition.tropical_flag,
            "description": condition.description,
            "ontology_ref": condition.ontology_ref,
            "icd_code": condition.icd_code
        }
    }
