import * as systemInterface from "@/domain/usecase/repository/system";
import * as systemService from "@/internal/database/postgresql/system";
import { SystemEntity } from "@/domain/entity/system";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../../domain/usecase/ucio/system";

class CreateSystemUseCaseRepository
  implements systemInterface.CreateSystemUseCaseRepositoryInterface
{
  async createSystem(req: CreateSystemUseCaseRequest): Promise<SystemEntity> {
    return await systemService.createSystem(req);
  }
}

class ListSystemsByUserIdUseCaseRepository
  implements systemInterface.ListSystemsByUserIdUseCaseRepositoryInterface
{
  async listSystemsByUserId(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<SystemEntity[]> {
    return await systemService.listSystemsByUserId(req.userId);
  }
}

class GetSystemUseCaseRepository
  implements systemInterface.GetSystemUseCaseRepositoryInterface
{
  async getSystem(req: GetSystemUseCaseRequest): Promise<SystemEntity> {
    return await systemService.getSystem(req.id);
  }
}

class DeleteSystemUseCaseRepository
  implements systemInterface.DeleteSystemUseCaseRepositoryInterface
{
  async deleteSystem(req: DeleteSystemUseCaseRequest): Promise<void> {
    await systemService.deleteSystem(req.id);
  }
}

class UpdateSystemUseCaseRepository
  implements systemInterface.UpdateSystemUseCaseRepositoryInterface
{
  async updateSystem(req: UpdateSystemUseCaseRequest): Promise<void> {
    return await systemService.updateSystem(req);
  }
}

export {
  CreateSystemUseCaseRepository,
  ListSystemsByUserIdUseCaseRepository,
  GetSystemUseCaseRepository,
  UpdateSystemUseCaseRepository,
  DeleteSystemUseCaseRepository,
};
