import { DeviceEntity } from "../../entity/device";
import { CreateDeviceUseCaseRequest } from "../ucio/device";

export interface DeviceRepositoryInterface {
  items?: DeviceEntity[];

  create(req: CreateDeviceUseCaseRequest): Promise<DeviceEntity>;
  existByIds(ids: number[]): Promise<number[]>;
  list(): Promise<DeviceEntity[]>;
}
