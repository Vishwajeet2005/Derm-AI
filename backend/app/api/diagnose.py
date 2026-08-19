from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import Diagnosis, User
from .deps import get_current_user
from ..ml.preprocess import preprocess_image
from ..ml.model import predict
from ..ml.diagnostic_framework import get_condition_details, severity_assessment, urgency_flag
from ..ml.voice_explainer import generate_explanation
import shutil
import os
import uuid

router = APIRouter()

# Ensure uploads directory exists
os.makedirs("uploads", exist_ok=True)

@router.post("")
async def create_diagnosis(
    file: UploadFile = File(...),
    fitzpatrick_type: int = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    file_path = f"uploads/{uuid.uuid4()}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # 1. Preprocess
        with open(file_path, "rb") as f:
            img_bytes = f.read()
        img_array = preprocess_image(img_bytes)
        
        # 2. Predict
        prediction = predict(img_array)
        top_1_class = prediction["top_1_class"]
        confidence = prediction["top_1_confidence"]
        top_3 = prediction["top_3_list"]
        
        # 3. Diagnostic Framework
        condition_details = get_condition_details(db, top_1_class)
        severity = severity_assessment(confidence)
        category = condition_details.get("category", "standard")
        urgency = urgency_flag(category)
        
        # 4. Explanation Generation
        desc = condition_details.get("description", "A skin condition requiring monitoring.")
        explanation = generate_explanation(top_1_class, severity, urgency, desc)
        
        # 5. Save to DB
        diagnosis = Diagnosis(
            user_id=current_user.id,
            image_path=file_path,
            primary_diagnosis=top_1_class,
            confidence_score=confidence,
            top_3_candidates=top_3,
            severity=severity,
            urgency_flag=urgency,
            explanation_text=explanation
        )
        db.add(diagnosis)
        db.commit()
        db.refresh(diagnosis)
        
        # Convert DB model to dict for response
        resp_data = {
            "id": str(diagnosis.id),
            "image_path": diagnosis.image_path,
            "primary_diagnosis": diagnosis.primary_diagnosis,
            "confidence_score": diagnosis.confidence_score,
            "top_3_candidates": diagnosis.top_3_candidates,
            "severity": diagnosis.severity,
            "urgency_flag": diagnosis.urgency_flag,
            "explanation_text": diagnosis.explanation_text,
            "audio_url": diagnosis.audio_url,
            "created_at": diagnosis.created_at.isoformat()
        }
        
        return {"data": resp_data}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
