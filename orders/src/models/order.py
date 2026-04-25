from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base, BaseModelMixin
from src.models.sql_enums import OrderStatusEnum


class Order(Base, BaseModelMixin):
    __tablename__ = "orders"

    address: Mapped[str]
    status: Mapped[OrderStatusEnum] = mapped_column(
        default=OrderStatusEnum.CREATED, server_default=text("'CREATED'")
    )
    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )


class OrderItem(Base, BaseModelMixin):
    __tablename__ = "order_items"

    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"))
    order: Mapped["Order"] = relationship("Order", back_populates="order_items")
    product_id: Mapped[int]
    quantity: Mapped[int]
    price_at_purchase: Mapped[Decimal] = mapped_column(
        Numeric(precision=10, scale=2),
    )
