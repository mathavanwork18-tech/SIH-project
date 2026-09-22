from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class AIUnderstandRequest(BaseModel):
    user_id: str = "artisan_001"
    language: str = "ta"
    input_type: str = "voice"
    transcript: str
    current_screen: str = "home"
    conversation_context: Optional[Dict[str, Any]] = None
    workflow_state: Optional[Dict[str, Any]] = None

class AIActionResponse(BaseModel):
    intent: str
    confidence: float
    action: str
    target_screen: str
    requires_camera: bool = False
    requires_confirmation: bool = False
    response_text: str
    next_step: Optional[str] = None
    extracted_params: Dict[str, Any] = Field(default_factory=dict)

class ImageAnalyzeRequest(BaseModel):
    image_url: Optional[str] = None
    image_base64: Optional[str] = None
    bg_mode: str = "studioWhite"

class CatalogueGenerateRequest(BaseModel):
    category: str = "Pottery"
    craft_type: Optional[str] = None
    material: Optional[str] = None
    artisan_name: str = "Kumar Swaminathan"
    location: str = "Salem, Tamil Nadu"
    language: str = "ta"

class CataloguePatchRequest(BaseModel):
    field: str
    value: Optional[str] = None
    modify_type: Optional[str] = None

class ProductCreateRequest(BaseModel):
    name: str
    category: str
    material: str
    craft_type: str
    price: float
    description: Dict[str, str]
    images: Dict[str, str]
    availability: str = "inStock"
