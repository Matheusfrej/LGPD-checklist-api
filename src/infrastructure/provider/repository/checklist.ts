import * as checklistInterface from "@/domain/usecase/repository/checklist";
import * as checklistService from "@/internal/database/postgresql/checklist";
import { ChecklistEntity } from "../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  GetChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../domain/usecase/ucio/checklist";

class CreateChecklistUseCaseRepository
  implements checklistInterface.CreateChecklistUseCaseRepositoryInterface
{
  async createChecklist(
    req: CreateChecklistUseCaseRequest,
  ): Promise<ChecklistEntity> {
    return await checklistService.createChecklist(req);
  }
}

class GetChecklistUseCaseRepository
  implements checklistInterface.GetChecklistUseCaseRepositoryInterface
{
  async getChecklist(
    req: GetChecklistUseCaseRequest,
  ): Promise<ChecklistEntity> {
    return await checklistService.getChecklist(req.id);
  }
}

class DeleteChecklistUseCaseRepository
  implements checklistInterface.DeleteChecklistUseCaseRepositoryInterface
{
  async deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<void> {
    await checklistService.deleteChecklist(req.id);
  }
}

class UpdateChecklistUseCaseRepository
  implements checklistInterface.UpdateChecklistUseCaseRepositoryInterface
{
  async updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<void> {
    return await checklistService.updateChecklist(req);
  }
}

class ListChecklistsByUserIdUseCaseRepository
  implements
    checklistInterface.ListChecklistsByUserIdUseCaseRepositoryInterface
{
  async listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    return await checklistService.listChecklistsByUserId(req.userId);
  }
}

class ListChecklistsBySystemIdUseCaseRepository
  implements
    checklistInterface.ListChecklistsBySystemIdUseCaseRepositoryInterface
{
  async listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    return await checklistService.listChecklistsBySystemId(req.systemId);
  }
}

export {
  CreateChecklistUseCaseRepository,
  GetChecklistUseCaseRepository,
  DeleteChecklistUseCaseRepository,
  UpdateChecklistUseCaseRepository,
  ListChecklistsByUserIdUseCaseRepository,
  ListChecklistsBySystemIdUseCaseRepository,
};
