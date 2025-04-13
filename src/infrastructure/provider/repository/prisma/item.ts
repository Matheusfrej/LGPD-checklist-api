import { ItemRepositoryInterface } from "../../../../domain/usecase/repository/item";
import { ItemEntity } from "../../../../domain/entity/item";
import { CreateItemUseCaseRequest } from "../../../../domain/usecase/ucio/item";
import { PrismaClient } from "@prisma/client";

class ItemPrismaRepository implements ItemRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  createItem(req: CreateItemUseCaseRequest): Promise<ItemEntity> {
    throw new Error("Method not implemented.");
  }

  async itemsExistByIds(ids: number[]): Promise<number[]> {
    const items = await this.prisma.items.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.filter((id) => !items.find((item) => item.id === id));
  }
}

export { ItemPrismaRepository };
