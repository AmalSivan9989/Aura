from sqlalchemy import Column, String, DateTime, JSON
from app.database import Base
import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class AIInsightCache(Base):
    __tablename__ = "ai_insight_caches"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    target_type = Column(String, nullable=False, index=True)  # weekly_dashboard, trainer_summary
    target_id = Column(String, nullable=True, index=True)  # e.g., trainer_id or program_id, or null for general
    insight_data = Column(JSON, nullable=False)
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)
