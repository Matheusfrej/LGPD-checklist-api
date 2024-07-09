import { ChecklistEntity } from "../../entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../ucio/checklist";

interface ChecklistRepositoryInterface {
  createChecklist(req: CreateChecklistUseCaseRequest): Promise<ChecklistEntity>;
  getChecklist(id: number): Promise<ChecklistEntity>;
  deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<void>;
  updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<void>;
  listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ChecklistEntity[]>;
  listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ChecklistEntity[]>;
}

export { ChecklistRepositoryInterface };
