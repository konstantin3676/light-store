from typing import Annotated

from fastapi import APIRouter, Depends, Query

from src.schemas.order_schema import (
    AllOrderResponse,
    CreateOrderRequest,
    OrderResponse,
)
from src.services.order_service import OrderService, get_order_service

router = APIRouter()


@router.post("/", response_model=OrderResponse, summary="Create new order")
async def add_order(
    order_data: CreateOrderRequest,
    service: OrderService = Depends(get_order_service),
):
    res = await service.create_order(order_data)
    return res


@router.get(
    "/",
    response_model=list[AllOrderResponse],
    summary="Get all orders",
)
async def get_all_orders(
    skip: Annotated[int | None, Query(ge=0)] = 0,
    limit: Annotated[int | None, Query(ge=1, le=1000)] = 100,
    service: OrderService = Depends(get_order_service),
):
    orders = await service.get_all_orders(skip=skip, limit=limit)
    return orders
