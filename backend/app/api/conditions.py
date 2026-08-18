from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import Condition
import uuid

router = APIRouter()

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
