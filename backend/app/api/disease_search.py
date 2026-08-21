from fastapi import APIRouter, Query
import os
import uuid

router = APIRouter()

@router.get("")
async def search_disease(q: str = Query(..., min_length=1)):
    api_key = os.getenv("EXTERNAL_DISEASE_API_KEY", "")
    
    if not api_key:
        # Mock response returning array of conditions so frontend ConditionLibraryPage maps correctly
        return {
            "data": [
                {
                    "id": str(uuid.uuid4()),
                    "condition_name": q.title(),
                    "category": "Pending External API",
                    "icd_code": "Pending",
                    "fitzpatrick_spectrum": "All",
                    "description": f"Detailed clinical description for '{q}'. Once you provide your API key (e.g. PubMed, MayoClinic, Wikipedia, or Infermedica), the real data and images will populate here.",
                    "images": [
                        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80"
                    ]
                }
            ]
        }

    # TODO: Implement external API logic here when user provides API key
    return {"data": []}
