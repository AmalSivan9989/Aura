from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EvaluationBase(BaseModel):
    trainee_id: str
    program_id: str
    readiness: str  # ready, partially, not-ready
    effectiveness: str  # effective, moderate, limited
    can_apply_immediately: bool = True
    needs_support: bool = False
    comments: Optional[str] = None

class EvaluationCreate(EvaluationBase):
    pass

class EvaluationResponse(EvaluationBase):
    id: str
    supervisor_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class TraineeEvaluationHistoryItem(BaseModel):
    id: str
    name: str
    role: str
    department: str
    training: str
    completionDate: str
    readiness: str
    comments: Optional[str]
