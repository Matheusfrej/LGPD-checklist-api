import { ItemEntity } from "../../entity/item";
import { CreateItemUseCaseRequest } from "../ucio/item";

interface ItemRepositoryInterface {
  items?: ItemEntity[];

  createItem(req: CreateItemUseCaseRequest): Promise<ItemEntity>;
  itemsExistByIds(ids: number[]): Promise<number[]>;
}

export { ItemRepositoryInterface };
