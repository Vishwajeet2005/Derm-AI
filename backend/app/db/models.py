import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    language_pref = Column(String, default="en")
    fitzpatrick_type = Column(Integer, nullable=True)
    location_lat = Column(Float, nullable=True)
    location_lon = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    diagnoses = relationship("Diagnosis", back_populates="user")
    progression_sessions = relationship("ProgressionSession", back_populates="user")

class Diagnosis(Base):
    __tablename__ = "diagnoses"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    image_path = Column(String, nullable=False)
    primary_diagnosis = Column(String, nullable=False)
    confidence_score = Column(Float, nullable=False)
    top_3_candidates = Column(JSON, nullable=False)
    severity = Column(String, nullable=False)
    urgency_flag = Column(String, nullable=False)
    explanation_text = Column(Text, nullable=False)
    audio_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="diagnoses")
    progression_entries = relationship("ProgressionEntry", back_populates="diagnosis")

class Condition(Base):
    __tablename__ = "conditions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    condition_name = Column(String, nullable=False)
    fitzpatrick_spectrum = Column(String, nullable=False)
    category = Column(String, nullable=False)
    tropical_flag = Column(Boolean, default=False)
    description = Column(Text, nullable=False)
    ontology_ref = Column(String, nullable=True)
    icd_code = Column(String, nullable=True)

class ProgressionSession(Base):
    __tablename__ = "progression_sessions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    condition_id = Column(UUID(as_uuid=True), ForeignKey("conditions.id"))
    start_date = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String, default="active")
    
    user = relationship("User", back_populates="progression_sessions")
    entries = relationship("ProgressionEntry", back_populates="session")

class ProgressionEntry(Base):
    __tablename__ = "progression_entries"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("progression_sessions.id"))
    image_path = Column(String, nullable=False)
    diagnosis_id = Column(UUID(as_uuid=True), ForeignKey("diagnoses.id"))
    recorded_at = Column(DateTime, default=datetime.utcnow)
    clinician_notes = Column(Text, nullable=True)
    
    session = relationship("ProgressionSession", back_populates="entries")
    diagnosis = relationship("Diagnosis", back_populates="progression_entries")

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    clinic_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    location_lat = Column(Float, nullable=False)
    location_lon = Column(Float, nullable=False)
    consultation_fee = Column(Float, nullable=False)
    insurance_accepted = Column(Boolean, default=False)
    languages_spoken = Column(JSON, nullable=False)
    contact = Column(String, nullable=False)
    verified = Column(Boolean, default=False)
