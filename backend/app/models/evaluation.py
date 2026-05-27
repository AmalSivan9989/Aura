from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Evaluation(Base):
    __tablename__ = "evaluations"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    supervisor_id = Column(String, ForeignKey("users.id"), nullable=False)
    trainee_id = Column(String, ForeignKey("users.id"), nullable=False)
    program_id = Column(String, ForeignKey("programs.id"), nullable=False)
    
    readiness = Column(String, nullable=False)  # ready, partially, not-ready
    effectiveness = Column(String, nullable=False)  # effective, moderate, limited
    
    can_apply_immediately = Column(Boolean, nullable=False, default=True)
    needs_support = Column(Boolean, nullable=False, default=False)
    
    comments = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    supervisor = relationship("User", foreign_keys=[supervisor_id])
    trainee = relationship("User", foreign_keys=[trainee_id])
    program = relationship("Program")
