import { DeviceEntity } from "../../../../domain/entity/device";
import { DeviceRepositoryInterface } from "../../../../domain/usecase/repository/device";
import { CreateDeviceUseCaseRequest } from "../../../../domain/usecase/ucio/device";
import { PrismaRepository } from "./repository";
import { Prisma } from "@prisma/client";

export class DevicePrismaRepository
  extends PrismaRepository
  implements DeviceRepositoryInterface
{
  protected withTransaction(tx: Prisma.TransactionClient): this {
    return new DevicePrismaRepository(tx) as this;
  }

  create(req: CreateDeviceUseCaseRequest): Promise<DeviceEntity> {
    throw new Error("Method not implemented." + req);
  }

  async existByIds(ids: number[]): Promise<number[]> {
    const items = await this.prisma.devices.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.filter((id) => !items.find((item) => item.id === id));
  }

  async list(): Promise<DeviceEntity[]> {
    const devices = await this.prisma.devices.findMany({});
    return devices.map((Device) => new DeviceEntity(Device.id, Device.name));
  }
}
