from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.program import Enrollment, Program
from app.models.feedback import Feedback
from app.models.user import User
from app.schemas.feedback import FeedbackCreate, FeedbackResponse
from app.utils.deps import get_current_user, RoleChecker
from app.services.ai_service import ai_service

router = APIRouter(prefix="/feedback", tags=["Trainee Feedback"])

@router.get("/pending", response_model=List[dict])
def get_pending_feedback(
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["trainee"]))
):
    """
    Returns active/completed training sessions for which this trainee is enrolled
    and has NOT yet submitted final feedback.
    """
    enrollments = db.query(Enrollment).join(Program).filter(
        Enrollment.trainee_id == current_user.id,
        Enrollment.feedback_submitted == False
    ).all()
    
    result = []
    for e in enrollments:
        result.append({
            "enrollment_id": e.id,
            "program_id": e.program.id,
            "program_name": e.program.name,
            "trainer_name": e.program.trainer.name if e.program.trainer else "Unknown",
            "batch": e.program.batch,
            "start_date": e.program.start_date.isoformat(),
            "end_date": e.program.end_date.isoformat(),
            "status": e.program.status
        })
    return result

@router.post("", response_model=FeedbackResponse)
def submit_feedback(
    feedback_data: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["trainee"]))
):
    """
    Submits new feedback for a program. Finds the active enrollment, 
    saves ratings & comments, runs real-time sentiment metrics, and marks it as completed.
    """
    # Find active enrollment
    enrollment = db.query(Enrollment).filter(
        Enrollment.program_id == feedback_data.program_id,
        Enrollment.trainee_id == current_user.id
    ).first()
    
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trainee is not enrolled in this program",
        )
        
    # Check if feedback already submitted (and is not a draft)
    existing_feedback = db.query(Feedback).filter(Feedback.enrollment_id == enrollment.id).first()
    if existing_feedback and not existing_feedback.is_draft and not feedback_data.is_draft:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Feedback already submitted for this program",
        )
        
    if existing_feedback:
        # Update existing draft
        existing_feedback.rating_content = feedback_data.rating_content
        existing_feedback.rating_delivery = feedback_data.rating_delivery
        existing_feedback.rating_materials = feedback_data.rating_materials
        existing_feedback.rating_pace = feedback_data.rating_pace
        existing_feedback.rating_interaction = feedback_data.rating_interaction
        existing_feedback.strengths = feedback_data.strengths
        existing_feedback.improvements = feedback_data.improvements
        existing_feedback.general = feedback_data.general
        existing_feedback.is_anonymous = feedback_data.is_anonymous
        existing_feedback.is_draft = feedback_data.is_draft
        
        db_feedback = existing_feedback
    else:
        # Create new feedback
        db_feedback = Feedback(
            enrollment_id=enrollment.id,
            rating_content=feedback_data.rating_content,
            rating_delivery=feedback_data.rating_delivery,
            rating_materials=feedback_data.rating_materials,
            rating_pace=feedback_data.rating_pace,
            rating_interaction=feedback_data.rating_interaction,
            strengths=feedback_data.strengths,
            improvements=feedback_data.improvements,
            general=feedback_data.general,
            is_anonymous=feedback_data.is_anonymous,
            is_draft=feedback_data.is_draft
        )
        db.add(db_feedback)
        
    if not feedback_data.is_draft:
        enrollment.feedback_submitted = True
        
    db.commit()
    db.refresh(db_feedback)
    
    # Trigger background sentiment logging (for aggregated analytics later)
    # We call it synchronously here since mock is sub-millisecond, but in production we can use background tasks.
    if not feedback_data.is_draft:
        try:
            ai_service.analyze_sentiment(
                strengths=db_feedback.strengths,
                improvements=db_feedback.improvements,
                general=db_feedback.general
            )
        except Exception:
            pass # Non-blocking to user submission
            
    return db_feedback
