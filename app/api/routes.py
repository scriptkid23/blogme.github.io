from fastapi import APIRouter

from app.controllers import Demo

router = APIRouter()
router.include_router(Demo.router, tags=["Demo"], prefix="/users")
