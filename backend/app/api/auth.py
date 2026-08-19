from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import User
from ..db.schemas import UserCreate, UserResponse, Token, UserUpdate
from ..core.security import get_password_hash, verify_password, create_access_token
from .deps import get_current_user

router = APIRouter()

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
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(subject=user.id)
    return {
        "data": {
            "token": {"access_token": access_token, "token_type": "bearer"},
            "user": UserResponse.model_validate(user).model_dump()
        }
    }

@router.put("/me", response_model=dict)
def update_user_profile(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if update_data.name is not None:
        current_user.name = update_data.name
    if update_data.language_pref is not None:
        current_user.language_pref = update_data.language_pref
    if update_data.fitzpatrick_type is not None:
        current_user.fitzpatrick_type = update_data.fitzpatrick_type
    if update_data.location_lat is not None:
        current_user.location_lat = update_data.location_lat
    if update_data.location_lon is not None:
        current_user.location_lon = update_data.location_lon
        
    db.commit()
    db.refresh(current_user)
    
    return {
        "data": {
            "user": UserResponse.model_validate(current_user).model_dump()
        }
    }
