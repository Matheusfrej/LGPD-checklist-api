import { ChecklistEntity } from "../../entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  GetChecklistUseCaseRequest,
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

export {
  CreateChecklistUseCaseRepositoryInterface,
  GetChecklistUseCaseRepositoryInterface,
  DeleteChecklistUseCaseRepositoryInterface,
  UpdateChecklistUseCaseRepositoryInterface,
};
