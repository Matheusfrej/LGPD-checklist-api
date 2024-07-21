import * as checklistService from "@/internal/database/postgresql/checklist";
import { ChecklistEntity } from "../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../domain/usecase/ucio/checklist";
import { ChecklistRepositoryInterface } from "../../../domain/usecase/repository/checklist";

class ChecklistPrismaRepository implements ChecklistRepositoryInterface {
  async createChecklist(
    req: CreateChecklistUseCaseRequest,
  ): Promise<ChecklistEntity> {
    return await checklistService.createChecklist(req);
  }

  async getChecklist(id: number): Promise<ChecklistEntity> {
    return await checklistService.getChecklist(id);
  }

  async deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<void> {
    await checklistService.deleteChecklist(req.id);
  }

  async updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<void> {
    return await checklistService.updateChecklist(req);
  }

  async listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    return await checklistService.listChecklistsByUserId(req.userId);
  }

  async listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    return await checklistService.listChecklistsBySystemId(req.systemId);
  }
}

export { ChecklistPrismaRepository };
