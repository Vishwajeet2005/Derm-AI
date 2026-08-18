from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db.models import Doctor
import math

router = APIRouter()

def haversine(lat1, lon1, lat2, lon2):
    R = 6371.0 # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@router.get("/nearby")
def get_nearby_doctors(
    lat: float,
    lon: float,
    max_fee: float = None,
    insurance_accepted: bool = None,
    db: Session = Depends(get_db)
):
    query = db.query(Doctor)
    
    if max_fee is not None:
        query = query.filter(Doctor.consultation_fee <= max_fee)
    if insurance_accepted is not None:
        query = query.filter(Doctor.insurance_accepted == insurance_accepted)
        
    doctors = query.all()
    
    # Calculate distance and filter/sort
    results = []
    for doc in doctors:
        dist = haversine(lat, lon, doc.location_lat, doc.location_lon)
        doc_dict = {
            "id": str(doc.id),
            "name": doc.name,
            "specialization": doc.specialization,
            "clinic_name": doc.clinic_name,
            "address": doc.address,
            "consultation_fee": doc.consultation_fee,
            "insurance_accepted": doc.insurance_accepted,
            "languages_spoken": doc.languages_spoken,
            "contact": doc.contact,
            "verified": doc.verified,
            "distance_km": dist
        }
        results.append(doc_dict)
        
    # Sort by distance
    results.sort(key=lambda x: x["distance_km"])
    
    return {"data": results[:20]}
