from collections.abc import Sequence

from fastapi import Depends, HTTPException, status

from src.models.product import Product
from src.repositories.product import ProductRepository, get_product_repository
from src.schemas.product_schema import CreateProductRequest, UpdateProductRequest


class ProductService:
    def __init__(self, repo: ProductRepository):
        self.repo = repo

    async def get_all(self, skip: int | None, limit: int | None) -> Sequence[Product]:
        res = await self.repo.get_all(skip=skip, limit=limit)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Products not found",
            )
        return res

    async def get_by_id(self, id: int) -> Product:
        res = await self.repo.get_by_id(id)
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )
        return res

    async def create_product(self, product_data: CreateProductRequest) -> Product:
        if await self.check_name(product_data.name):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A product with this name already exists",
            )
        res = await self.repo.create(product_data.model_dump())
        if not res:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product creation failed",
            )
        return res

    async def update_course(
        self, id: int, update_data: UpdateProductRequest
    ) -> Product:
        product = await self.get_by_id(id)

        if update_data.name and update_data.name != product.name:
            if await self.check_name(update_data.name):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A product with this name already exists",
                )
        update_dict = {
            k: v for k, v in update_data.model_dump().items() if v is not None
        }
        if update_dict:
            res = await self.repo.update(id, update_dict)
            if not res:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Product not found",
                )
            return res
        return product

    async def check_name(self, name: str) -> bool:
        return await self.repo.exists_by_name(name)

    async def delete_product(self, id: int) -> bool:
        res = await self.repo.delete(id)
        return res


async def get_product_service(
    repo: ProductRepository = Depends(get_product_repository),
) -> ProductService:
    return ProductService(repo)
