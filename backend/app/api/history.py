from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import Diagnosis, User
from .deps import get_current_user

router = APIRouter()

@router.get("")
def get_history(
    page: int = 1,
    limit: int = 100,
    condition: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    skip = (page - 1) * limit
    query = db.query(Diagnosis).filter(Diagnosis.user_id == current_user.id)
    
    if condition and condition != "All":
        query = query.filter(Diagnosis.primary_diagnosis.ilike(f"%{condition}%"))
        
    diagnoses = (
        query
        .order_by(Diagnosis.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    
    # Format for response
    results = []
    for d in diagnoses:
        results.append({
            "id": str(d.id),
            "image_path": d.image_path,
            "primary_diagnosis": d.primary_diagnosis,
            "confidence_score": d.confidence_score,
            "severity": d.severity,
            "urgency_flag": d.urgency_flag,
            "created_at": d.created_at.isoformat()
        })
        
    return {"data": results}
