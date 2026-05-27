from sqlalchemy import Column, String, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Program(Base):
    __tablename__ = "programs"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    trainer_id = Column(String, ForeignKey("users.id"), nullable=False)
    batch = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(String, nullable=False, default="upcoming")  # upcoming, active, completed

    trainer = relationship("User")
    enrollments = relationship("Enrollment", back_populates="program", cascade="all, delete-orphan")

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    program_id = Column(String, ForeignKey("programs.id"), nullable=False)
    trainee_id = Column(String, ForeignKey("users.id"), nullable=False)
    feedback_submitted = Column(Boolean, nullable=False, default=False)

    program = relationship("Program", back_populates="enrollments")
    trainee = relationship("User")
    feedback = relationship("Feedback", back_populates="enrollment", uselist=False, cascade="all, delete-orphan")
