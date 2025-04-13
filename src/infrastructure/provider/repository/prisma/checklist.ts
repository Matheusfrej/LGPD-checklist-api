import * as checklistService from "@/internal/database/postgresql/checklist";
import { ChecklistEntity } from "../../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
} from "../../../../domain/usecase/ucio/checklist";
import { ChecklistRepositoryInterface } from "../../../../domain/usecase/repository/checklist";
import { ChecklistItemEntity } from "../../../../domain/entity/checklistItem";
import { runInTransaction } from "../../../internal/database/postgresql/common";

class ChecklistPrismaRepository implements ChecklistRepositoryInterface {
  async runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return await runInTransaction(fn);
  }

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

  async getItemsFromChecklist(id: number): Promise<ChecklistItemEntity[]> {
    return await checklistService.getItemsFromChecklist(id);
  }

  async insertItemsFromChecklist(
    id: number,
    items: ChecklistItemEntity[],
  ): Promise<void> {
    return await checklistService.insertItemsInChecklist(id, items);
  }

  async removeItemsFromChecklist(
    id: number,
    itemsIds: number[],
  ): Promise<void> {
    return await checklistService.removeItemsFromChecklist(id, itemsIds);
  }

  async updateItemFromChecklist(
    id: number,
    item: ChecklistItemEntity,
  ): Promise<void> {
    return await checklistService.updateItemFromChecklist(id, item);
  }
}

export { ChecklistPrismaRepository };
