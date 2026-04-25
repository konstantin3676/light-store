from enum import Enum


class OrderStatusEnum(str, Enum):
    CREATED = "created"
    PAID = "paid"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    RETURNED = "returned"
