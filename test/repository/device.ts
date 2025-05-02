import { DeviceEntity } from "../../src/domain/entity/device";
import { DeviceRepositoryInterface } from "../../src/domain/usecase/repository/device";
import { CreateDeviceUseCaseRequest } from "../../src/domain/usecase/ucio/device";

// eslint-disable-next-line prettier/prettier
export class DeviceInMemoryRepository implements DeviceRepositoryInterface {
  public items: DeviceEntity[] = [];
  private counter = 0;

  async create(req: CreateDeviceUseCaseRequest): Promise<DeviceEntity> {
    this.counter += 1;

    const item = new DeviceEntity(this.counter, req.name);

    this.items.push(item);

    return item;
  }

  async existByIds(ids: number[]): Promise<number[]> {
    return ids.filter((id) => !this.items.find((item) => item.id === id));
  }
}
