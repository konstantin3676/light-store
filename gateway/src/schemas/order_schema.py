from decimal import Decimal
from enum import Enum
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field


class OrderStatusEnum(str, Enum):
    CREATED = "CREATED"
    PAID = "PAID"
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"
    RETURNED = "RETURNED"


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
    price_at_purchase: str


class CreateOrderRequest(BaseModel):
    address: str
    order_items: list[CreateOrderItemRequest]
