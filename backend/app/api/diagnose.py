from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import Diagnosis, User
from .deps import get_current_user
from ..ml.preprocess import preprocess_image, check_dermatological_image
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
        with open(file_path, "rb") as f:
            img_bytes = f.read()

        # 1. Non-skin and out-of-distribution image validation
        is_valid_skin, validation_message, skin_ratio = check_dermatological_image(img_bytes)
        if not is_valid_skin:
            if os.path.exists(file_path):
                os.remove(file_path)
            raise HTTPException(status_code=400, detail=validation_message)

        # 2. Preprocess
        img_array = preprocess_image(img_bytes)
        
        # 3. Predict
        prediction = predict(img_array)
        top_1_class = prediction["top_1_class"]
        confidence = prediction["top_1_confidence"]
        top_3 = prediction["top_3_list"]
        is_ood = prediction.get("is_out_of_distribution", False)
        
        # 4. Out-of-Distribution threshold: If top-1 confidence is below 18% or is_ood is True,
        # the model cannot identify any recognizable dermatological pathology
        if is_ood or confidence < 0.18:
            if os.path.exists(file_path):
                os.remove(file_path)
            raise HTTPException(
                status_code=400,
                detail="Not an appropriate image. The uploaded photograph could not be identified as a recognizable skin lesion or dermatological condition. Please upload a clear, focused photograph of the affected skin area."
            )
        
        # 5. Diagnostic Framework
        condition_details = get_condition_details(db, top_1_class)
        category = condition_details.get("category", "standard")
        severity = severity_assessment(top_1_class, confidence)
        urgency = urgency_flag(category)
        
        # 6. Explanation Generation
        desc = condition_details.get("description", "A skin condition requiring monitoring.")
        explanation = generate_explanation(top_1_class, severity, urgency, desc, confidence)
        
        # 7. Save to DB
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
        
    except HTTPException:
        raise
    except Exception as e:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception:
                pass
        raise HTTPException(status_code=500, detail=str(e))
