from fastapi import FastAPI

from src.api.v1.product_api import router as product_router
from src.configs.app import settings

app = FastAPI(
    title=settings.app.app_name,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

app.include_router(product_router, prefix="/api/v1/products", tags=["product"])
