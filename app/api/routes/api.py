from fastapi import APIRouter

from app.api.routes import Demo

router = APIRouter()
router.include_router(Demo.router, tags=["Demo"], prefix="/users")
# router.include_router(Authentication.router, tags=["authentication"])