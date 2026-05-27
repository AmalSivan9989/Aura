from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    enrollment_id = Column(String, ForeignKey("enrollments.id"), unique=True, nullable=False)
    
    # Rating Categories (1-5 scale)
    rating_content = Column(Integer, nullable=False)
    rating_delivery = Column(Integer, nullable=False)
    rating_materials = Column(Integer, nullable=False)
    rating_pace = Column(Integer, nullable=False)
    rating_interaction = Column(Integer, nullable=False)
    
    # Comments text
    strengths = Column(String, nullable=True)
    improvements = Column(String, nullable=True)
    general = Column(String, nullable=True)
    
    is_anonymous = Column(Boolean, nullable=False, default=False)
    is_draft = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    enrollment = relationship("Enrollment", back_populates="feedback")
