from decimal import Decimal

from sqlalchemy import Numeric
from sqlalchemy.orm import Mapped, mapped_column

from src.models.base import Base, BaseModelMixin


class Product(Base, BaseModelMixin):
    __tablename__ = "products"

    name: Mapped[str] = mapped_column(unique=True)
    desc: Mapped[str | None]
    price: Mapped[Decimal] = mapped_column(
        Numeric(precision=10, scale=2),
    )
    stock: Mapped[int]
    sku: Mapped[str]
