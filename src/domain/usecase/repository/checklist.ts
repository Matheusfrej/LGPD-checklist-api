import { ChecklistEntity } from "../../entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  GetChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../ucio/checklist";

interface CreateChecklistUseCaseRepositoryInterface {
  createChecklist(req: CreateChecklistUseCaseRequest): Promise<ChecklistEntity>;
}

interface GetChecklistUseCaseRepositoryInterface {
  getChecklist(req: GetChecklistUseCaseRequest): Promise<ChecklistEntity>;
}

interface DeleteChecklistUseCaseRepositoryInterface {
  deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<void>;
}

interface UpdateChecklistUseCaseRepositoryInterface {
  updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<void>;
}

interface ListChecklistsByUserIdUseCaseRepositoryInterface {
  listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ChecklistEntity[]>;
}

interface ListChecklistsBySystemIdUseCaseRepositoryInterface {
  listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ChecklistEntity[]>;
}

export {
  CreateChecklistUseCaseRepositoryInterface,
  GetChecklistUseCaseRepositoryInterface,
  DeleteChecklistUseCaseRepositoryInterface,
  UpdateChecklistUseCaseRepositoryInterface,
  ListChecklistsByUserIdUseCaseRepositoryInterface,
  ListChecklistsBySystemIdUseCaseRepositoryInterface,
};
