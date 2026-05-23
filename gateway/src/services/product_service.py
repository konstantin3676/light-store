from fastapi import Depends, HTTPException, status

from src.dependencies import get_service_client
from src.schemas.product_schema import (
    CreateProductRequest,
    ProductResponse,
    UpdateProductRequest,
)
from src.services.http_client_service import HttpClientService


class ProductService:
    def __init__(self, service_client: HttpClientService):
        self.service_client = service_client

    async def get_all(
        self, skip: int | None, limit: int | None
    ) -> list[ProductResponse]:
        res = await self.service_client.call_service(
            service_name="products",
            method="GET",
            endpoint="/",
            params={"skip": skip, "limit": limit},
            headers={"Content-Type": "application/json"},
        )
        products = res.json()
        if not products:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Products not found",
            )
        return products

    async def get_by_id(self, id: int) -> ProductResponse:
        res = await self.service_client.call_service(
            service_name="products",
            method="GET",
            endpoint=f"/{id}",
            headers={"Content-Type": "application/json"},
        )
        product = res.json()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )
        return product

    async def create_product(self, data: CreateProductRequest) -> ProductResponse:
        res = await self.service_client.call_service(
            service_name="products",
            method="POST",
            endpoint="/",
            headers={"Content-Type": "application/json"},
            json=data.model_dump(mode="json"),
        )
        product = res.json()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )
        return product

    async def update_product(
        self, id: int, update_data: UpdateProductRequest
    ) -> ProductResponse:
        res = await self.service_client.call_service(
            service_name="products",
            method="PUT",
            endpoint=f"/{id}",
            headers={"Content-Type": "application/json"},
            json=update_data.model_dump(mode="json"),
        )
        product = res.json()
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )
        return product

    async def delete_product(self, id: int) -> None:
        await self.service_client.call_service(
            service_name="products",
            method="DELETE",
            endpoint=f"/{id}",
            headers={"Content-Type": "application/json"},
        )


async def get_product_service(
    service_client: HttpClientService = Depends(get_service_client),
) -> ProductService:
    return ProductService(service_client)
