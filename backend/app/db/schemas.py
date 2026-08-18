from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    name: str
    email: EmailStr
    language_pref: Optional[str] = "en"
    fitzpatrick_type: Optional[int] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginResponse(BaseModel):
    token: Token
    user: UserResponse

class DiagnosisResponse(BaseModel):
    id: UUID
    image_path: str
    primary_diagnosis: str
    confidence_score: float
    top_3_candidates: List[Dict[str, Any]]
    severity: str
    urgency_flag: str
    explanation_text: str
    audio_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class ConditionResponse(BaseModel):
    id: UUID
    condition_name: str
    fitzpatrick_spectrum: str
    category: str
    tropical_flag: bool
    description: str
    
    class Config:
        from_attributes = True

class DoctorResponse(BaseModel):
    id: UUID
    name: str
    specialization: str
    clinic_name: str
    consultation_fee: float
    distance: Optional[float] = None
    
    class Config:
        from_attributes = True
