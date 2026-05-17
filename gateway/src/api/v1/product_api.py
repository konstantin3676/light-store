from typing import Annotated

from fastapi import APIRouter, Depends, Query, status

from src.schemas.product_schema import ProductResponse
from src.services.auth_service import AuthService, get_auth_service
from src.services.product_service import ProductService, get_product_service

router = APIRouter()


@router.get(
    "/",
    response_model=list[ProductResponse],
    summary="Get all products",
)
async def get_all_products(
    skip: Annotated[int | None, Query(ge=0)] = 0,
    limit: Annotated[int | None, Query(ge=1, le=1000)] = 100,
    service: ProductService = Depends(get_product_service),
):
    products = await service.get_all(skip=skip, limit=limit)
    return products


@router.get(
    "/{product_id}/",
    response_model=ProductResponse,
    summary="Get a product by id",
)
async def get_product(
    product_id: int, service: ProductService = Depends(get_product_service)
):
    product = await service.get_by_id(product_id)
    return product


@router.delete(
    "/{product_id}/",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a product by id",
)
async def delete_product(
    product_id: int,
    product_service: ProductService = Depends(get_product_service),
    auth_service: AuthService = Depends(get_auth_service),
):
    await auth_service.get_current_user()
    await product_service.delete_product(product_id)
    return None
