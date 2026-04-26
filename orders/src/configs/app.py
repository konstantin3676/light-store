from dynaconf import Dynaconf
from pydantic import BaseModel


class APPConfig(BaseModel):
    app_version: str
    app_name: str
    app_host: str
    app_port: int


class DBConfig(BaseModel):
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    db_port: int

    @property
    def dsl(self):
        return (
            f"postgresql+asyncpg://{self.db_user}:{self.db_password}"
            f"@{self.db_host}:{self.db_port}/{self.db_name}"
        )

    @property
    def dsl_test(self):
        return (
            f"postgresql+asyncpg://{self.db_user}:{self.db_password}"
            f"@localhost:{self.db_port}/{self.db_name}"
        )

    @property
    def dsn(self) -> str:
        return self.dsl


class HttpClientConfig(BaseModel):
    products_service_url: str
    http_timeout: float
    http_max_retries: int


class Settings(BaseModel):
    app: APPConfig
    db: DBConfig
    http_client: HttpClientConfig


env_settings = Dynaconf(settings_file=["settings.toml"])

settings = Settings(
    app=env_settings["app_settings"],
    db=env_settings["db_settings"],
    http_client=env_settings["http_client_settings"],
)
