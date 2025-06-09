import subprocess
import tempfile
import os

def execute_python_code(code: str, input_data: str):
    with tempfile.NamedTemporaryFile(mode='w+', suffix=".py", delete=False) as temp:
        temp.write(code)
        temp.flush()
        file_path = temp.name

    try:
        result = subprocess.run(
            ["python3", file_path],
            input=input_data.encode(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=5
        )
        return {
            "output": result.stdout.decode(),
            "errors": result.stderr.decode()
        }
    except subprocess.TimeoutExpired:
        return {"output": "", "errors": "Execution timed out."}
    finally:
        os.unlink(file_path)
