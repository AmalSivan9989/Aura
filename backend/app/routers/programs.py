from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.program import Program, Enrollment
from app.models.user import User
from app.schemas.program import ProgramCreate, ProgramResponse, ProgramStatsResponse
from app.utils.deps import get_current_user, RoleChecker

router = APIRouter(prefix="/programs", tags=["Training Programs"])

@router.get("", response_model=List[ProgramStatsResponse])
def list_programs(
    status_filter: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Program)
    
    if status_filter and status_filter != "all":
        query = query.filter(Program.status == status_filter)
        
    if search:
        query = query.filter(
            (Program.name.contains(search)) | 
            (Program.description.contains(search))
        )
        
    programs = query.all()
    stats_list = []
    
    for p in programs:
        # Aggregated stats
        total_participants = db.query(Enrollment).filter(Enrollment.program_id == p.id).count()
        completed_feedback = db.query(Enrollment).filter(
            Enrollment.program_id == p.id,
            Enrollment.feedback_submitted == True
        ).count()
        
        pending_feedback = total_participants - completed_feedback
        
        # Resolve trainer name
        trainer_name = p.trainer.name if p.trainer else "Unknown"
        
        stats_list.append({
            "id": p.id,
            "name": p.name,
            "trainer": trainer_name,
            "batch": p.batch,
            "startDate": p.start_date.isoformat(),
            "endDate": p.end_date.isoformat(),
            "participants": total_participants,
            "completed": completed_feedback,
            "pending": pending_feedback,
            "status": p.status
        })
        
    return stats_list

@router.post("", response_model=ProgramResponse)
def create_program(
    program_data: ProgramCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["admin"]))
):
    trainer = db.query(User).filter(User.id == program_data.trainer_id, User.role == "trainer").first()
    if not trainer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trainer not found or user is not a trainer",
        )
        
    db_program = Program(
        name=program_data.name,
        description=program_data.description,
        trainer_id=program_data.trainer_id,
        batch=program_data.batch,
        start_date=program_data.start_date,
        end_date=program_data.end_date,
        status=program_data.status
    )
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program

@router.get("/{id}", response_model=ProgramResponse)
def get_program(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    program = db.query(Program).filter(Program.id == id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Program not found",
        )
    return program

@router.put("/{id}", response_model=ProgramResponse)
def update_program(
    id: str,
    program_data: ProgramCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["admin"]))
):
    program = db.query(Program).filter(Program.id == id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Program not found",
        )
    
    # Update fields
    program.name = program_data.name
    program.description = program_data.description
    program.trainer_id = program_data.trainer_id
    program.batch = program_data.batch
    program.start_date = program_data.start_date
    program.end_date = program_data.end_date
    program.status = program_data.status
    
    db.commit()
    db.refresh(program)
    return program

@router.delete("/{id}", response_model=dict)
def delete_program(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["admin"]))
):
    program = db.query(Program).filter(Program.id == id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Program not found",
        )
    db.delete(program)
    db.commit()
    return {"message": "Program deleted successfully"}

@router.post("/{id}/reminder")
def send_reminder(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(RoleChecker(["admin", "trainer"]))
):
    program = db.query(Program).filter(Program.id == id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Program not found",
        )
    
    # Query pending enrollments
    pending = db.query(Enrollment).filter(
        Enrollment.program_id == id,
        Enrollment.feedback_submitted == False
    ).all()
    
    trainee_names = [e.trainee.name for e in pending if e.trainee]
    
    return {
        "message": f"Reminders dispatched to {len(trainee_names)} pending trainees.",
        "notified_trainees": trainee_names
    }
