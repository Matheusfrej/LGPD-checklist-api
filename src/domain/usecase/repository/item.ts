import { ItemEntity } from "../../entity/item";
import {
  CreateItemUseCaseRequest,
  ListItemsUseCaseRequest,
} from "../ucio/item";

interface ItemRepositoryInterface {
  items?: ItemEntity[];

  createItem(req: CreateItemUseCaseRequest): Promise<ItemEntity>;
  itemsExistByIds(ids: number[]): Promise<number[]>;
  list(req: ListItemsUseCaseRequest): Promise<ItemEntity[]>;
}

export { ItemRepositoryInterface };
