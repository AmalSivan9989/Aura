from pydantic import BaseModel
from datetime import date
from typing import Optional, List
from app.schemas.auth import UserResponse

class ProgramBase(BaseModel):
    name: str
    description: Optional[str] = None
    batch: str
    start_date: date
    end_date: date
    status: str = "upcoming"

class ProgramCreate(ProgramBase):
    trainer_id: str

class ProgramResponse(ProgramBase):
    id: str
    trainer_id: str
    trainer: Optional[UserResponse] = None

    class Config:
        from_attributes = True

class EnrollmentBase(BaseModel):
    program_id: str
    trainee_id: str

class EnrollmentCreate(EnrollmentBase):
    pass

class EnrollmentResponse(EnrollmentBase):
    id: str
    feedback_submitted: bool
    trainee: Optional[UserResponse] = None
    program: Optional[ProgramResponse] = None

    class Config:
        from_attributes = True

class ProgramStatsResponse(BaseModel):
    id: str
    name: str
    trainer: str
    batch: str
    startDate: str
    endDate: str
    participants: int
    completed: int
    pending: int
    status: str
