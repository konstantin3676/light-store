from decimal import Decimal
from typing import Annotated

from pydantic import BaseModel, Field


class Product(BaseModel):
    name: str
    desc: str | None = None
    price: Annotated[Decimal, Field(ge=0, max_digits=10, decimal_places=2)]
    stock: Annotated[int, Field(ge=0)]
    sku: str
