import datetime
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models import User, Program, Enrollment, Feedback, Evaluation
from app.utils.security import get_password_hash
from app.routers import auth, programs, feedback, evaluations, insights

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FeedbackAI.Main")

# 1. Initialize DB tables
Base.metadata.create_all(bind=engine)
logger.info("Database schemas initialized.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 2. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Register Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(programs.router, prefix=settings.API_V1_STR)
app.include_router(feedback.router, prefix=settings.API_V1_STR)
app.include_router(evaluations.router, prefix=settings.API_V1_STR)
app.include_router(insights.router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "FeedbackAI Python FastAPI Backend running successfully.",
        "docs": "/docs"
    }

# 4. Data Seeding on startup
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    try:
        # Check if users already exist
        if db.query(User).count() > 0:
            logger.info("Database already seeded. Skipping...")
            return
            
        logger.info("Seeding initial mock data for FeedbackAI...")
        
        # Seed Users
        admin = User(
            email="admin@company.com",
            name="John Doe",
            password_hash=get_password_hash("admin123"),
            role="admin",
            department="Operations"
        )
        trainer = User(
            email="trainer@company.com",
            name="Dr. Sarah Mitchell",
            password_hash=get_password_hash("trainer123"),
            role="trainer",
            department="Learning & Dev"
        )
        supervisor = User(
            email="supervisor@company.com",
            name="Robert Chen",
            password_hash=get_password_hash("supervisor123"),
            role="supervisor",
            department="Engineering"
        )
        trainee1 = User(
            email="trainee1@company.com",
            name="Alex Thompson",
            password_hash=get_password_hash("trainee123"),
            role="trainee",
            department="Sales"
        )
        trainee2 = User(
            email="trainee2@company.com",
            name="Jamie Martinez",
            password_hash=get_password_hash("trainee123"),
            role="trainee",
            department="Support"
        )
        
        db.add_all([admin, trainer, supervisor, trainee1, trainee2])
        db.commit()
        db.refresh(trainer)
        db.refresh(trainee1)
        db.refresh(trainee2)
        
        # Seed Programs
        prog1 = Program(
            name="Leadership Skills Workshop",
            description="Deep dive on leadership principles, communication techniques, and management best practices.",
            trainer_id=trainer.id,
            batch="Batch A",
            start_date=datetime.date(2026, 5, 15),
            end_date=datetime.date(2026, 5, 20),
            status="active"
        )
        prog2 = Program(
            name="Advanced Sales Techniques",
            description="Strategic selling, negotiations, and major account acquisition strategies.",
            trainer_id=trainer.id,
            batch="Batch B",
            start_date=datetime.date(2026, 5, 10),
            end_date=datetime.date(2026, 5, 18),
            status="completed"
        )
        prog3 = Program(
            name="Customer Service Excellence",
            description="Mastering communication, crisis control, and positive customer engagement skills.",
            trainer_id=trainer.id,
            batch="Batch C",
            start_date=datetime.date(2026, 5, 22),
            end_date=datetime.date(2026, 5, 28),
            status="active"
        )
        prog4 = Program(
            name="Technical Training Q2",
            description="Software engineering architectural patterns, scalability, and clean code paradigms.",
            trainer_id=trainer.id,
            batch="Batch D",
            start_date=datetime.date(2026, 6, 1),
            end_date=datetime.date(2026, 6, 10),
            status="upcoming"
        )
        
        db.add_all([prog1, prog2, prog3, prog4])
        db.commit()
        db.refresh(prog1)
        db.refresh(prog2)
        db.refresh(prog3)
        
        # Seed Enrollments
        enr1 = Enrollment(program_id=prog1.id, trainee_id=trainee1.id, feedback_submitted=True)
        enr2 = Enrollment(program_id=prog1.id, trainee_id=trainee2.id, feedback_submitted=False)
        
        enr3 = Enrollment(program_id=prog2.id, trainee_id=trainee1.id, feedback_submitted=True)
        enr4 = Enrollment(program_id=prog2.id, trainee_id=trainee2.id, feedback_submitted=True)
        
        enr5 = Enrollment(program_id=prog3.id, trainee_id=trainee2.id, feedback_submitted=False)
        
        db.add_all([enr1, enr2, enr3, enr4, enr5])
        db.commit()
        db.refresh(enr1)
        db.refresh(enr3)
        db.refresh(enr4)
        
        # Seed Feedbacks
        fb1 = Feedback(
            enrollment_id=enr1.id,
            rating_content=5,
            rating_delivery=4,
            rating_materials=4,
            rating_pace=4,
            rating_interaction=5,
            strengths="I loved the structured case studies and highly interactive team tasks.",
            improvements="Sessions sometimes overrun scheduled time blocks.",
            general="Overall, an excellent leadership session.",
            is_anonymous=False,
            is_draft=False
        )
        fb2 = Feedback(
            enrollment_id=enr3.id,
            rating_content=4,
            rating_delivery=5,
            rating_materials=5,
            rating_pace=3,
            rating_interaction=4,
            strengths="Excellent presentations, clear slides, and great presentation pace.",
            improvements="More exercises would make this training even better.",
            general="Very happy with Mike's insights.",
            is_anonymous=True,
            is_draft=False
        )
        fb3 = Feedback(
            enrollment_id=enr4.id,
            rating_content=5,
            rating_delivery=5,
            rating_materials=4,
            rating_pace=5,
            rating_interaction=5,
            strengths="Sarah mitchell is extremely supportive and clear in her expectations.",
            improvements="Slide sheets should have more bullet points.",
            general="Excellent program.",
            is_anonymous=False,
            is_draft=False
        )
        
        db.add_all([fb1, fb2, fb3])
        db.commit()
        
        # Seed Supervisor Evaluations
        eval1 = Evaluation(
            supervisor_id=supervisor.id,
            trainee_id=trainee1.id,
            program_id=prog2.id,
            readiness="ready",
            effectiveness="effective",
            can_apply_immediately=True,
            needs_support=False,
            comments="Alex has demonstrated outstanding implementation of the sales strategies learned."
        )
        db.add(eval1)
        db.commit()
        
        logger.info("Mock seeding successfully completed!")
    except Exception as e:
        logger.error(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()
