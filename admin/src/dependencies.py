from fastapi import FastAPI

from src.services.http_client_service import HttpClientService

_app: FastAPI | None = None


def set_app(app: FastAPI) -> None:
    global _app
    _app = app


def get_service_client() -> HttpClientService:
    if _app is None:
        raise RuntimeError("App instance not set. Call set_app() first.")
    return _app.state.service_client
