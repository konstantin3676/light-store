from fastapi import Depends, HTTPException, status

from src.dependencies import get_service_client
from src.schemas.order_schema import CreateOrderRequest, OrderResponse
from src.services.http_client_service import HttpClientService


class OrderService:
    def __init__(self, service_client: HttpClientService):
        self.service_client = service_client

    async def create_order(self, order_data: CreateOrderRequest) -> OrderResponse:
        res = await self.service_client.call_service(
            service_name="orders",
            method="POST",
            endpoint="/",
            json=order_data.model_dump(),
            headers={"Content-Type": "application/json"},
        )
        order = res.json()
        if not order:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create order",
            )
        return order


async def get_order_service(
    service_client: HttpClientService = Depends(get_service_client),
) -> OrderService:
    return OrderService(service_client)
