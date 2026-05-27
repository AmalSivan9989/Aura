from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class FeedbackBase(BaseModel):
    rating_content: int = Field(..., ge=1, le=5)
    rating_delivery: int = Field(..., ge=1, le=5)
    rating_materials: int = Field(..., ge=1, le=5)
    rating_pace: int = Field(..., ge=1, le=5)
    rating_interaction: int = Field(..., ge=1, le=5)
    
    strengths: Optional[str] = None
    improvements: Optional[str] = None
    general: Optional[str] = None
    
    is_anonymous: bool = False
    is_draft: bool = False

class FeedbackCreate(FeedbackBase):
    program_id: str  # Frontend supplies program_id, backend resolves enrollment

class FeedbackResponse(FeedbackBase):
    id: str
    enrollment_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class AspectSentiment(BaseModel):
    positive: int
    neutral: int
    negative: int

class SentimentBreakdown(BaseModel):
    presentation_style: AspectSentiment
    content_depth: AspectSentiment
    practical_examples: AspectSentiment
    session_pace: AspectSentiment
