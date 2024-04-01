import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  GetChecklistUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../ucio/checklist";

interface CreateChecklistUseCaseValidateInterface {
  createChecklist(req: CreateChecklistUseCaseRequest): Promise<string>;
}

interface GetChecklistUseCaseValidateInterface {
  getChecklist(req: GetChecklistUseCaseRequest): Promise<string>;
}

interface DeleteChecklistUseCaseValidateInterface {
  deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<string>;
}

interface UpdateChecklistUseCaseValidateInterface {
  updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<string>;
}

export {
  CreateChecklistUseCaseValidateInterface,
  GetChecklistUseCaseValidateInterface,
  DeleteChecklistUseCaseValidateInterface,
  UpdateChecklistUseCaseValidateInterface,
};
