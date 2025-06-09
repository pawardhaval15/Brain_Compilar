from pydantic import BaseModel

class CodeSubmission(BaseModel):
    language: str
    code: str
    input_data: str = ""
