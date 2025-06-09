from fastapi import HTTPException
from app.services.compiler_service import execute_python_code
from app.database.connection import get_db_connection

def run_code_and_save(language, code, input_data):
    if language.lower() != "python":
        raise HTTPException(status_code=400, detail="Only Python is supported currently.")

    result = execute_python_code(code, input_data)

    raw_output = result["output"].strip()
    output_lines = raw_output.splitlines()  # For proper formatting
    errors = result["errors"]

    # Save raw output string to DB
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO code_submissions (language, code, input_data, output, errors)
        VALUES (%s, %s, %s, %s, %s)
    """, (language, code, input_data, raw_output, errors))
    conn.commit()
    conn.close()

    return {
        "output": output_lines,
        "errors": errors
    }
