from decimal import Decimal
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field


class ProductResponse(BaseModel):
    id: int
    name: str
    desc: str | None = None
    price: Annotated[
        Decimal,
        Field(ge=0, max_digits=10, decimal_places=2),
    ]
    model_config = ConfigDict(from_attributes=True)
