import { ItemRepositoryInterface } from "../../../../domain/usecase/repository/item";
import { ItemEntity } from "../../../../domain/entity/item";
import {
  CreateItemUseCaseRequest,
  ListItemsUseCaseRequest,
} from "../../../../domain/usecase/ucio/item";
import { PrismaRepository } from "./repository";
import { Prisma } from "@prisma/client";

class ItemPrismaRepository
  extends PrismaRepository
  implements ItemRepositoryInterface
{
  protected withTransaction(tx: Prisma.TransactionClient): this {
    return new ItemPrismaRepository(tx) as this;
  }

  createItem(req: CreateItemUseCaseRequest): Promise<ItemEntity> {
    throw new Error("Method not implemented." + req);
  }

  async itemsExistByIds(ids: number[]): Promise<number[]> {
    const items = await this.prisma.items.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.filter((id) => !items.find((item) => item.id === id));
  }

  async list(req: ListItemsUseCaseRequest): Promise<ItemEntity[]> {
    const items = await this.prisma.items.findMany({
      where: {
        laws: {
          some: {
            id: { in: req.laws },
          },
        },
        ...(req.devices?.length
          ? {
              OR: [
                {
                  devices: {
                    some: {
                      id: { in: req.devices },
                    },
                  },
                },
                {
                  devices: {
                    none: {}, // também aceita quem não tem nenhum device
                  },
                },
              ],
            }
          : {
              devices: {
                none: {}, // se não passou nada, só traz quem não tem device
              },
            }),
      },
    });

    return items.map(
      (item) =>
        new ItemEntity(
          item.id,
          item.code,
          item.itemDesc,
          item.recommendations,
          item.isMandatory,
        ),
    );
  }
}

export { ItemPrismaRepository };
