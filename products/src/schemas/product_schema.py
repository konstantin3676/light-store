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


class ProductAvailabilityResponse(BaseModel):
    id: int
    stock: int
    model_config = ConfigDict(from_attributes=True)


class CreateProductRequest(BaseModel):
    name: str
    desc: str | None = None
    price: Annotated[
        Decimal,
        Field(ge=0, max_digits=10, decimal_places=2),
    ]
    stock: Annotated[int, Field(ge=0)]
    sku: str


class UpdateProductRequest(BaseModel):
    name: str | None = None
    desc: str | None = None
    price: Annotated[
        Decimal | None,
        Field(ge=0, max_digits=10, decimal_places=2),
    ] = None
    stock: Annotated[int | None, Field(ge=0)] = None
    sku: str | None = None


class ProductsRequest(BaseModel):
    product_ids: list[int]


class UpdateStockProduct(BaseModel):
    product_id: int
    quantity: int


class UpdateStockRequest(BaseModel):
    products: list[UpdateStockProduct]
