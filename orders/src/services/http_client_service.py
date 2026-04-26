from typing import Any

import httpx
from fastapi import HTTPException, status

from src.configs.app import settings


class HttpClientService:
    def __init__(
        self,
        timeout: float = settings.http_client.http_timeout,
        max_retries: int = settings.http_client.http_max_retries,
    ):
        self.timeout = timeout
        self.max_retries = max_retries
        self._clients: dict[str, httpx.AsyncClient] = {}

    def create_client(self, service_name: str, base_url: str) -> None:
        if service_name not in self._clients:
            transport = httpx.AsyncHTTPTransport(
                retries=self.max_retries,
            )
            self._clients[service_name] = httpx.AsyncClient(
                base_url=base_url,
                timeout=self.timeout,
                transport=transport,
            )

    async def call_service(
        self,
        service_name: str,
        method: str,
        endpoint: str,
        json: Any | None = None,
        params: dict | None = None,
        headers: dict | None = None,
    ) -> httpx.Response:
        client = self._clients[service_name]
        try:
            response = await client.request(
                method=method, url=endpoint, json=json, params=params, headers=headers
            )
            response.raise_for_status()
            return response
        except httpx.TimeoutException:
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail=f"Timeout connecting to {service_name}",
            )
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Error from {service_name}: {e.response.text}",
            )
        except httpx.NetworkError:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Network error connecting to {service_name}",
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unexpected error calling {service_name}: {str(e)}",
            )

    async def close_all(self):
        for client in self._clients.values():
            await client.aclose()
        self._clients.clear()
