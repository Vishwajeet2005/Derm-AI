from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    language_pref: Optional[str] = "en"
    fitzpatrick_type: Optional[int] = None
    location_lat: Optional[float] = None
    location_lon: Optional[float] = None

class UserResponse(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    language_pref: str
    fitzpatrick_type: Optional[int]
    location_lat: Optional[float]
    location_lon: Optional[float]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class DiagnosisResponse(BaseModel):
    id: UUID
    image_path: str
    primary_diagnosis: str
    confidence_score: float
    top_3_candidates: List[Dict[str, Any]]
    severity: str
    urgency_flag: str
    explanation_text: str
    audio_url: Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ConditionResponse(BaseModel):
    id: UUID
    condition_name: str
    fitzpatrick_spectrum: str
    category: str
    tropical_flag: bool
    description: str
    ontology_ref: Optional[str]
    icd_code: Optional[str]
    
    model_config = ConfigDict(from_attributes=True)

class ProgressionSessionCreate(BaseModel):
    condition_id: UUID

class ProgressionSessionResponse(BaseModel):
    id: UUID
    user_id: UUID
    condition_id: UUID
    start_date: datetime
    last_updated: datetime
    status: str
    
    model_config = ConfigDict(from_attributes=True)

class ProgressionEntryResponse(BaseModel):
    id: UUID
    session_id: UUID
    image_path: str
    diagnosis_id: UUID
    recorded_at: datetime
    clinician_notes: Optional[str]
    
    model_config = ConfigDict(from_attributes=True)

class DoctorResponse(BaseModel):
    id: UUID
    name: str
    specialization: str
    clinic_name: str
    address: str
    location_lat: float
    location_lon: float
    consultation_fee: float
    insurance_accepted: bool
    languages_spoken: List[str]
    contact: str
    verified: bool
    distance_km: Optional[float] = None
    
    model_config = ConfigDict(from_attributes=True)
