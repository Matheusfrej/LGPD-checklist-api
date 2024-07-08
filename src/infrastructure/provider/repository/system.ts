import * as systemService from "@/internal/database/postgresql/system";
import { SystemEntity } from "@/domain/entity/system";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../../domain/usecase/ucio/system";
import { SystemRepositoryInterface } from "../../../domain/usecase/repository/system";

class SystemPrismaRepository implements SystemRepositoryInterface {
  async createSystem(req: CreateSystemUseCaseRequest): Promise<SystemEntity> {
    return await systemService.createSystem(req);
  }

  async listSystemsByUserId(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<SystemEntity[]> {
    return await systemService.listSystemsByUserId(req.userId);
  }

  async getSystem(req: GetSystemUseCaseRequest): Promise<SystemEntity> {
    return await systemService.getSystem(req.id);
  }

  async deleteSystem(req: DeleteSystemUseCaseRequest): Promise<void> {
    await systemService.deleteSystem(req.id);
  }

  async updateSystem(req: UpdateSystemUseCaseRequest): Promise<void> {
    return await systemService.updateSystem(req);
  }
}

export { SystemPrismaRepository };
