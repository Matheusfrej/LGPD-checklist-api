import { ItemEntity } from "../../src/domain/entity/item";
import { ItemRepositoryInterface } from "../../src/domain/usecase/repository/item";
import {
  CreateItemUseCaseRequest,
  ListItemsUseCaseRequest,
} from "../../src/domain/usecase/ucio/item";
import { LawEntity } from "../../src/domain/entity/law";
import { DeviceEntity } from "../../src/domain/entity/device";
import { SectionEntity } from "../../src/domain/entity/section";

export class ItemInMemoryRepository implements ItemRepositoryInterface {
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
      req.sectionId,
      new SectionEntity(req.sectionId, null),
      req.lawsIds.map((id) => new LawEntity(id, null)),
      req.devicesIds.map((id) => new DeviceEntity(id, null)),
    );

    this.items.push(item);

    return item;
  }

  async itemsExistByIds(ids: number[]): Promise<number[]> {
    return ids.filter((id) => !this.items.find((item) => item.id === id));
  }

  async list(req: ListItemsUseCaseRequest): Promise<ItemEntity[]> {
    return this.items.filter((item) => {
      // Deve ter alguma law com ID presente em req.laws
      const hasMatchingLaw =
        req.laws?.length > 0
          ? item.laws.some((law) => req.laws.includes(law.id))
          : true;

      // Lógica de devices:
      const hasMatchingDevice =
        req.devices?.length > 0
          ? item.devices.length === 0 ||
            item.devices.some((device) => req.devices.includes(device.id))
          : item.devices.length === 0;

      return hasMatchingLaw && hasMatchingDevice;
    });
  }
}
