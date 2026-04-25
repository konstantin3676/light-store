from collections.abc import Sequence

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_session
from src.models.product import Product


class ProductRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, id: int) -> Product | None:
        result = await self.db.execute(
            select(Product).where(Product.id == id),
        )
        return result.scalar_one_or_none()

    async def get_by_name(self, name: str) -> Product | None:
        result = await self.db.execute(
            select(Product).where(Product.name == name),
        )
        return result.scalar_one_or_none()

    async def exists_by_name(self, name: str) -> bool:
        product = await self.get_by_name(name)
        return product is not None

    async def get_all(
        self, skip: int | None = 0, limit: int | None = 100
    ) -> Sequence[Product]:
        result = await self.db.execute(
            select(Product).offset(skip).limit(limit),
        )
        return result.scalars().all()

    async def create(self, product_data: dict) -> Product | None:
        product = Product(**product_data)
        self.db.add(product)
        await self.db.commit()
        await self.db.refresh(product)
        return product

    async def update(self, id: int, update_data: dict) -> Product | None:
        product = await self.get_by_id(id)
        if not product:
            return None
        for key, value in update_data.items():
            setattr(product, key, value)
        await self.db.commit()
        await self.db.refresh(product)
        return product

    async def delete(self, id: int) -> bool:
        product = await self.get_by_id(id)
        if not product:
            return False
        await self.db.delete(product)
        await self.db.commit()
        return True


async def get_product_repository(
    db: AsyncSession = Depends(get_session),
) -> ProductRepository:
    return ProductRepository(db)
