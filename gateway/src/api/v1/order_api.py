from fastapi import APIRouter, Depends

from src.schemas.order_schema import (
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
