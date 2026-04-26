from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.api.v1.order_api import router as order_router
from src.configs.app import settings
from src.dependencies import set_app
from src.services.http_client_service import HttpClientService


@asynccontextmanager
async def lifespan(app: FastAPI):
    set_app(app)
    app.state.service_client = HttpClientService()
    app.state.service_client.create_client(
        service_name="products",
        base_url=settings.http_client.products_service_url,
    )
    try:
        yield
    finally:
        await app.state.service_client.close_all()


app = FastAPI(
    title=settings.app.app_name,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)


app.include_router(order_router, prefix="/api/v1/orders", tags=["order"])
