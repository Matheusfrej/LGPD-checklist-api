import { SystemEntity } from "@/domain/entity/system";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../../../domain/usecase/ucio/system";
import { SystemRepositoryInterface } from "../../../../domain/usecase/repository/system";
import { PrismaRepository } from "./repository";

class SystemPrismaRepository
  extends PrismaRepository
  implements SystemRepositoryInterface
{
  async createSystem(req: CreateSystemUseCaseRequest): Promise<SystemEntity> {
    const system = await this.prisma.systems.create({
      data: {
        name: req.name,
        description: req.description,
        userId: req.userId,
      },
    });

    return new SystemEntity(
      system.id,
      system.name,
      system.description,
      system.userId,
    );
  }

  async listSystemsByUserId(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<SystemEntity[]> {
    const systems = await this.prisma.systems.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return systems.map(
      (system) =>
        new SystemEntity(
          system.id,
          system.name,
          system.description,
          system.userId,
        ),
    );
  }

  async getSystem(id: number): Promise<SystemEntity> {
    const system = await this.prisma.systems.findUnique({
      where: {
        id,
      },
    });

    return system
      ? new SystemEntity(
          system.id,
          system.name,
          system.description,
          system.userId,
        )
      : null;
  }

  async deleteSystem(req: DeleteSystemUseCaseRequest): Promise<void> {
    await this.prisma.systems.delete({
      where: {
        id: req.id,
      },
    });
  }

  async updateSystem(req: UpdateSystemUseCaseRequest): Promise<void> {
    await this.prisma.systems.update({
      where: {
        id: req.id,
      },
      data: {
        name: req.name,
        description: req.description,
      },
    });
  }
}

export { SystemPrismaRepository };
