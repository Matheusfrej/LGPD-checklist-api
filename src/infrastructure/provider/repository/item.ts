import * as itemService from "@/internal/database/postgresql/item";
import { ItemRepositoryInterface } from "../../../domain/usecase/repository/item";
import { ItemEntity } from "../../../domain/entity/item";
import { CreateItemUseCaseRequest } from "../../../domain/usecase/ucio/item";

class ItemPrismaRepository implements ItemRepositoryInterface {
  createItem(req: CreateItemUseCaseRequest): Promise<ItemEntity> {
    throw new Error("Method not implemented.");
  }

  itemsExistByIds(ids: number[]): Promise<number[]> {
    return itemService.itemsExistByIds(ids);
  }
}

export { ItemPrismaRepository };
