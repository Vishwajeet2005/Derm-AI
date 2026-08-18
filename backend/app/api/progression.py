from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..db.models import ProgressionSession, ProgressionEntry, User, Condition
from .deps import get_current_user
import uuid
import os
import shutil

router = APIRouter()

os.makedirs("uploads/progression", exist_ok=True)

@router.post("/start")
def start_progression(
    condition_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    session = ProgressionSession(
        user_id=current_user.id,
        condition_id=uuid.UUID(condition_id)
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    
    return {"data": {"session_id": str(session.id), "status": session.status}}

@router.post("/entry")
def add_progression_entry(
    session_id: str = Form(...),
    diagnosis_id: str = Form(...),
    clinician_notes: str = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify session belongs to user
    session = db.query(ProgressionSession).filter(
        ProgressionSession.id == uuid.UUID(session_id),
        ProgressionSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    file_path = f"uploads/progression/{uuid.uuid4()}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    entry = ProgressionEntry(
        session_id=session.id,
        image_path=file_path,
        diagnosis_id=uuid.UUID(diagnosis_id),
        clinician_notes=clinician_notes
    )
    db.add(entry)
    
    # Update session last_updated
    session.last_updated = entry.recorded_at
    
    db.commit()
    db.refresh(entry)
    
    return {"data": {"entry_id": str(entry.id)}}

@router.get("/{session_id}")
def get_progression_entries(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify session
    session = db.query(ProgressionSession).filter(
        ProgressionSession.id == uuid.UUID(session_id),
        ProgressionSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    entries = db.query(ProgressionEntry).filter(ProgressionEntry.session_id == session.id).order_by(ProgressionEntry.recorded_at.asc()).all()
    
    results = []
    for e in entries:
        # Also join with diagnosis to get diagnosis_name and severity
        diag = e.diagnosis
        results.append({
            "id": str(e.id),
            "image_url": e.image_path,
            "recorded_at": e.recorded_at.isoformat(),
            "clinician_notes": e.clinician_notes,
            "diagnosis_name": diag.primary_diagnosis if diag else "Unknown",
            "severity": diag.severity if diag else "Unknown"
        })
        
    return {"data": results}
