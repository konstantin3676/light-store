from dynaconf import Dynaconf
from pydantic import BaseModel


class APPConfig(BaseModel):
    app_version: str
    app_name: str
    app_host: str
    app_port: int


class HttpClientConfig(BaseModel):
    products_service_url: str
    orders_service_url: str
    http_timeout: float
    http_max_retries: int


class Settings(BaseModel):
    app: APPConfig
    http_client: HttpClientConfig


env_settings = Dynaconf(settings_file=["settings.toml"])

settings = Settings(
    app=env_settings["app_settings"],
    http_client=env_settings["http_client_settings"],
)
