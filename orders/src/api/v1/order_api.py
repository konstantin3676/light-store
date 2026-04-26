from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status

from src.schemas.order_schema import (
    CreateOrderRequest,
    OrderResponse,
    UpdateOrderRequest,
)
from src.services.order_service import OrderService, get_order_service

router = APIRouter()


@router.get(
    "/",
    response_model=list[OrderResponse],
    summary="Get all orders",
)
async def get_all_orders(
    skip: Annotated[int | None, Query(ge=0)] = 0,
    limit: Annotated[int | None, Query(ge=1, le=1000)] = 100,
    service: OrderService = Depends(get_order_service),
):
    orders = await service.get_all_orders(skip=skip, limit=limit)
    return orders


@router.get(
    "/{order_id}",
    response_model=OrderResponse,
    summary="Get a order by id",
)
async def get_order(
    order_id: int,
    service: OrderService = Depends(get_order_service),
):
    order = await service.get_order_by_id(order_id)
    return order


@router.post("/", response_model=OrderResponse, summary="Create new order")
async def add_order(
    order_data: CreateOrderRequest,
    service: OrderService = Depends(get_order_service),
):
    res = await service.create_order(order_data)
    return res


@router.put(
    "/{order_id}",
    response_model=OrderResponse,
    summary="Update a order by id",
)
async def update_order(
    order_id: int,
    order_data: UpdateOrderRequest,
    service: OrderService = Depends(get_order_service),
):
    res = await service.update_order(id=order_id, update_data=order_data)
    return res


@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a order by id",
)
async def delete_order(
    order_id: int,
    service: OrderService = Depends(get_order_service),
):
    deleted = await service.delete_order(order_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Order not found")
    return None
