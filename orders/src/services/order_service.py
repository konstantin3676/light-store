from collections.abc import Sequence

from fastapi import Depends, HTTPException, status

from src.dependencies import get_service_client
from src.models.order import Order
from src.repositories.order import OrderRepository, get_order_repository
from src.schemas.order_schema import CreateOrderRequest
from src.services.http_client_service import HttpClientService


class OrderService:
    def __init__(self, repo: OrderRepository, service_client: HttpClientService):
        self.repo = repo
        self.service_client = service_client

    async def get_all_orders(
        self, skip: int | None, limit: int | None
    ) -> Sequence[Order]:
        res = await self.repo.get_all_orders(skip=skip, limit=limit)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Orders not found",
            )
        return res

    async def get_order_by_id(self, id: int) -> Order:
        res = await self.repo.get_order_by_id(id)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found",
            )
        return res

    async def create_order(self, order_data: CreateOrderRequest) -> Order:
        products_response = await self.service_client.call_service(
            service_name="products",
            method="POST",
            endpoint="check-availability",
            json={"product_ids": [item.product_id for item in order_data.order_items]},
            headers={"Content-Type": "application/json"},
        )
        availability_data = products_response.json()
        products_map = {p["id"]: p for p in availability_data}

        update_stock_data = []
        for item in order_data.order_items:
            product_info = products_map.get(item.product_id)
            if not product_info or product_info["stock"] < item.quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product {item.product_id} not available in requested quantity",
                )
            new_stock = product_info["stock"] - item.quantity
            update_stock_data.append(
                {"product_id": item.product_id, "quantity": new_stock}
            )

        order = await self.repo.create_order(order_data)
        if not order:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create order",
            )

        try:
            await self.service_client.call_service(
                service_name="products",
                method="POST",
                endpoint="update-stock",
                json={"products": update_stock_data},
            )
            return order
        except HTTPException as stock_error:
            try:
                await self.repo.delete_order(order.id)
                print(
                    f"Order {order.id} deleted due to stock update failure: {stock_error.detail}"
                )
            except Exception as repo_error:
                print(
                    f"CRITICAL: Failed to delete order {order.id} after stock update failure. "
                    f"Stock error: {stock_error.detail}, "
                    f"Repo error: {str(repo_error)}"
                )

            raise stock_error

    # async def update_order(self, id: int, update_data: UpdateOrderRequest) -> Order:
    #     pass

    async def delete_order(self, id: int) -> bool:
        res = await self.repo.delete_order(id)
        return res


async def get_order_service(
    repo: OrderRepository = Depends(get_order_repository),
    service_client: HttpClientService = Depends(get_service_client),
) -> OrderService:
    return OrderService(repo, service_client)
