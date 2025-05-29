import { ItemRepositoryInterface } from "../../../../domain/usecase/repository/item";
import { ItemEntity } from "../../../../domain/entity/item";
import {
  CreateItemUseCaseRequest,
  ListItemsUseCaseRequest,
} from "../../../../domain/usecase/ucio/item";
import { PrismaRepository } from "./repository";
import { Prisma } from "@prisma/client";
import { SectionEntity } from "../../../../domain/entity/section";
import { LawEntity } from "../../../../domain/entity/law";
import { DeviceEntity } from "../../../../domain/entity/device";

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
      include: {
        laws: true,
        devices: true,
        section: true,
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
          item.sectionId,
          new SectionEntity(item.section.id, item.section.name),
          item.laws.map((law) => new LawEntity(law.id, law.name)),
          item.devices.map(
            (device) => new DeviceEntity(device.id, device.name),
          ),
        ),
    );
  }
}

export { ItemPrismaRepository };
