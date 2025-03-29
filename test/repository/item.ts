import { ItemEntity } from "../../src/domain/entity/item";
import { ItemRepositoryInterface } from "../../src/domain/usecase/repository/item";
import { CreateItemUseCaseRequest } from "../../src/domain/usecase/ucio/item";

class ItemInMemoryRepository implements ItemRepositoryInterface {
  public items: ItemEntity[] = [];
  private counter = 0;

  async createItem(req: CreateItemUseCaseRequest): Promise<ItemEntity> {
    this.counter += 1;

    const item = new ItemEntity(
      this.counter,
      req.code,
      req.itemDesc,
      req.recommendations,
      req.isMandatory,
      [],
      [],
    );

    this.items.push(item);

    return item;
  }

  async itemsExistByIds(ids: number[]): Promise<number[]> {
    return ids.filter((id) => !this.items.find((item) => item.id === id));
  }
}

export { ItemInMemoryRepository };
