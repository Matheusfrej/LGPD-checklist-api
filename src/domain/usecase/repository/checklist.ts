import { ChecklistEntity } from "../../entity/checklist";
import { ChecklistItemEntity } from "../../entity/checklistItem";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
} from "../ucio/checklist";

interface ChecklistRepositoryInterface {
  items?: ChecklistEntity[];

  createChecklist(req: CreateChecklistUseCaseRequest): Promise<ChecklistEntity>;
  getChecklist(id: number): Promise<ChecklistEntity>;
  deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<void>;
  listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ChecklistEntity[]>;
  listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ChecklistEntity[]>;
  getItemsFromChecklist(id: number): Promise<ChecklistItemEntity[]>;
  insertItemsFromChecklist(
    id: number,
    items: ChecklistItemEntity[],
  ): Promise<void>;
  removeItemsFromChecklist(id: number, itemsIds: number[]): Promise<void>;
  updateItemFromChecklist(id: number, item: ChecklistItemEntity): Promise<void>;

  runInTransaction<T>(fn: () => Promise<T>): Promise<T>;
}

export { ChecklistRepositoryInterface };
