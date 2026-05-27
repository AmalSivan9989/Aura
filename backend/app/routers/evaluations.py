from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.evaluation import Evaluation
from app.models.user import User
from app.models.program import Program
from app.schemas.evaluation import EvaluationCreate, EvaluationResponse, TraineeEvaluationHistoryItem
from app.utils.deps import get_current_user, RoleChecker

router = APIRouter(prefix="/evaluations", tags=["Supervisor Evaluations"])

@router.post("", response_model=EvaluationResponse)
def submit_evaluation(
    eval_data: EvaluationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["supervisor"]))
):
    # Verify trainee and program exist
    trainee = db.query(User).filter(User.id == eval_data.trainee_id, User.role == "trainee").first()
    if not trainee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trainee user not found",
        )
        
    program = db.query(Program).filter(Program.id == eval_data.program_id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Training program not found",
        )

    db_eval = Evaluation(
        supervisor_id=current_user.id,
        trainee_id=eval_data.trainee_id,
        program_id=eval_data.program_id,
        readiness=eval_data.readiness,
        effectiveness=eval_data.effectiveness,
        can_apply_immediately=eval_data.can_apply_immediately,
        needs_support=eval_data.needs_support,
        comments=eval_data.comments
    )
    db.add(db_eval)
    db.commit()
    db.refresh(db_eval)
    return db_eval

@router.get("/trainee/{trainee_id}", response_model=List[TraineeEvaluationHistoryItem])
def get_trainee_history(
    trainee_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["supervisor", "admin"]))
):
    """
    Returns historical assessments and program context for a specific trainee user.
    """
    evaluations = db.query(Evaluation).filter(Evaluation.trainee_id == trainee_id).all()
    history = []
    
    for ev in evaluations:
        history.append({
            "id": ev.id,
            "name": ev.trainee.name if ev.trainee else "Unknown",
            "role": ev.trainee.role if ev.trainee else "Trainee",
            "department": ev.trainee.department or "General",
            "training": ev.program.name if ev.program else "Unknown Training",
            "completionDate": ev.created_at.strftime("%B %d, %Y"),
            "readiness": ev.readiness,
            "comments": ev.comments
        })
    return history
