from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.code_routes import router as code_router

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your API routes
app.include_router(code_router, prefix="/api")
