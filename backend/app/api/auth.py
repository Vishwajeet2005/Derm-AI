from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import User
from ..db.schemas import UserCreate, UserResponse, Token
from ..core.security import get_password_hash, verify_password, create_access_token
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register", response_model=dict)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = User(
        name=user_in.name,
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        language_pref=user_in.language_pref,
        fitzpatrick_type=user_in.fitzpatrick_type,
        location_lat=user_in.location_lat,
        location_lon=user_in.location_lon,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token = create_access_token(subject=user.id)
    return {
        "data": {
            "token": {"access_token": access_token, "token_type": "bearer"},
            "user": UserResponse.model_validate(user).model_dump()
        }
    }

@router.post("/login", response_model=dict)
def login(login_req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_req.email).first()
    if not user or not verify_password(login_req.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(subject=user.id)
    return {
        "data": {
            "token": {"access_token": access_token, "token_type": "bearer"},
            "user": UserResponse.model_validate(user).model_dump()
        }
    }
