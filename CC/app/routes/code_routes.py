from fastapi import APIRouter
from app.models.submission_model import CodeSubmission
from app.controllers.code_controller import run_code_and_save

router = APIRouter()

@router.post("/run")
def run_code(submission: CodeSubmission):
    return run_code_and_save(submission.language, submission.code, submission.input_data)
