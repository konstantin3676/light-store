from fastapi import Depends
from sqlalchemy import select, update
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_session
from src.models.product import Product
from src.schemas.product_schema import UpdateStockProduct


class ProductRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, id: int) -> Product | None:
        result = await self.db.execute(
            select(Product).where(Product.id == id),
        )
        return result.scalar_one_or_none()

    async def get_by_ids(self, product_ids: list[int]) -> list[Product]:
        if not product_ids:
            return []
        result = await self.db.execute(
            select(Product).where(Product.id.in_(product_ids))
        )
        return list(result.scalars().all())

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
    ) -> list[Product]:
        result = await self.db.execute(
            select(Product).offset(skip).limit(limit),
        )
        return list(result.scalars().all())

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

    async def update_stock(self, products_data: list[UpdateStockProduct]) -> None:
        if not products_data:
            return
        try:
            for item in products_data:
                await self.db.execute(
                    update(Product)
                    .where(Product.id == item.product_id)
                    .values(stock=item.quantity)
                )
            await self.db.commit()
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise e

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
