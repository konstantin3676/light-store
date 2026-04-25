from collections.abc import Sequence

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.database import get_session
from src.models.order import Order, OrderItem
from src.schemas.order_schema import (
    CreateOrderRequest,
    UpdateOrderItemRequest,
    UpdateOrderRequest,
)


class OrderRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_order_by_id(self, id: int) -> Order | None:
        result = await self.db.execute(
            select(Order)
            .where(Order.id == id)
            .options(selectinload(Order.order_items)),
        )
        return result.scalar_one_or_none()

    async def get_all_orders(
        self, skip: int | None = 0, limit: int | None = 100
    ) -> Sequence[Order]:
        result = await self.db.execute(
            select(Order).offset(skip).limit(limit),
        )
        return result.scalars().all()

    async def create_order(self, order_data: CreateOrderRequest) -> Order | None:
        order = Order(address=order_data.address)
        order.order_items = [
            OrderItem(
                product_id=item.product_id,
                quantity=item.quantity,
                price_at_purchase=item.price_at_purchase,
            )
            for item in order_data.order_items
        ]
        self.db.add(order)
        await self.db.commit()
        result = await self.db.execute(
            select(Order)
            .where(Order.id == order.id)
            .options(selectinload(Order.order_items))
        )
        return result.scalar_one_or_none()

    async def _update_order_items(
        self, order: Order, items_data: list[UpdateOrderItemRequest]
    ) -> None:
        existing_items = {item.id: item for item in order.order_items}
        updated_item_ids = set()
        for item_data in items_data:
            if item_data.id is not None and item_data.id in existing_items:
                item = existing_items[item_data.id]
                if item_data.product_id is not None:
                    item.product_id = item_data.product_id
                if item_data.quantity is not None:
                    item.quantity = item_data.quantity
                if item_data.price_at_purchase is not None:
                    item.price_at_purchase = item_data.price_at_purchase
                updated_item_ids.add(item.id)
            else:
                new_item = OrderItem(
                    order_id=order.id,
                    product_id=item_data.product_id,
                    quantity=item_data.quantity,
                    price_at_purchase=item_data.price_at_purchase,
                )
                order.order_items.append(new_item)
        items_to_delete = [
            item for item in order.order_items if item.id not in updated_item_ids
        ]
        for item in items_to_delete:
            order.order_items.remove(item)

    async def update_order(
        self, id: int, update_data: UpdateOrderRequest
    ) -> Order | None:
        order = await self.get_order_by_id(id)
        if not order:
            return None
        if update_data.address is not None:
            order.address = update_data.address
        if update_data.status is not None:
            order.status = update_data.status
        await self._update_order_items(order, update_data.order_items)
        await self.db.commit()
        order = await self.get_order_by_id(id)
        return order

    async def delete_order(self, id: int) -> bool:
        order = await self.get_order_by_id(id)
        if not order:
            return False
        await self.db.delete(order)
        await self.db.commit()
        return True


async def get_Order_repository(
    db: AsyncSession = Depends(get_session),
) -> OrderRepository:
    return OrderRepository(db)
