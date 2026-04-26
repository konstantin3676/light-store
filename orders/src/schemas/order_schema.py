from decimal import Decimal
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field

from src.models.sql_enums import OrderStatusEnum


class AllOrderResponse(BaseModel):
    id: int
    address: str
    status: OrderStatusEnum
    model_config = ConfigDict(from_attributes=True)


class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price_at_purchase: Annotated[
        Decimal,
        Field(max_digits=10, decimal_places=2),
    ]


class OrderResponse(BaseModel):
    id: int
    address: str
    status: OrderStatusEnum
    order_items: list[OrderItemResponse]
    model_config = ConfigDict(from_attributes=True)


class CreateOrderItemRequest(BaseModel):
    product_id: int
    quantity: Annotated[int, Field(gt=0)]
    price_at_purchase: Annotated[
        Decimal,
        Field(ge=0, max_digits=10, decimal_places=2),
    ]


class CreateOrderRequest(BaseModel):
    address: str
    order_items: list[CreateOrderItemRequest]


class UpdateOrderItemRequest(BaseModel):
    id: int | None = None
    product_id: int | None = None
    quantity: Annotated[int | None, Field(ge=0)] = None
    price_at_purchase: Annotated[
        Decimal | None,
        Field(ge=0, max_digits=10, decimal_places=2),
    ] = None


class UpdateOrderRequest(BaseModel):
    address: str | None = None
    status: OrderStatusEnum | None = None
    order_items: list[UpdateOrderItemRequest] | None = None
