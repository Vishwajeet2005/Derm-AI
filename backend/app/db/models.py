import uuid
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
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
    image_path = Column(String)
    primary_diagnosis = Column(String)
    confidence_score = Column(Float)
    top_3_candidates = Column(JSON)
    severity = Column(String)
    urgency_flag = Column(String)
    explanation_text = Column(Text)
    audio_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="diagnoses")
    progression_entries = relationship("ProgressionEntry", back_populates="diagnosis")

class Condition(Base):
    __tablename__ = "conditions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    condition_name = Column(String, index=True)
    fitzpatrick_spectrum = Column(String)
    category = Column(String)
    tropical_flag = Column(Boolean, default=False)
    description = Column(Text)
    ontology_ref = Column(String, nullable=True)
    icd_code = Column(String, nullable=True)

    progression_sessions = relationship("ProgressionSession", back_populates="condition")

class ProgressionSession(Base):
    __tablename__ = "progression_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    condition_id = Column(UUID(as_uuid=True), ForeignKey("conditions.id"))
    start_date = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String, default="active")

    user = relationship("User", back_populates="progression_sessions")
    condition = relationship("Condition", back_populates="progression_sessions")
    entries = relationship("ProgressionEntry", back_populates="session")

class ProgressionEntry(Base):
    __tablename__ = "progression_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("progression_sessions.id"))
    image_path = Column(String)
    diagnosis_id = Column(UUID(as_uuid=True), ForeignKey("diagnoses.id"), nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)
    clinician_notes = Column(Text, nullable=True)

    session = relationship("ProgressionSession", back_populates="entries")
    diagnosis = relationship("Diagnosis", back_populates="progression_entries")

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, index=True)
    specialization = Column(String)
    clinic_name = Column(String)
    address = Column(String)
    location_lat = Column(Float)
    location_lon = Column(Float)
    consultation_fee = Column(Float)
    insurance_accepted = Column(Boolean, default=False)
    languages_spoken = Column(JSON)
    contact = Column(String)
    verified = Column(Boolean, default=False)
