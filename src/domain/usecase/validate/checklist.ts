import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  GetChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
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

interface ListChecklistsByUserIdUseCaseValidateInterface {
  listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<string>;
}

interface ListChecklistsBySystemIdUseCaseValidateInterface {
  listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<string>;
}

export {
  CreateChecklistUseCaseValidateInterface,
  GetChecklistUseCaseValidateInterface,
  DeleteChecklistUseCaseValidateInterface,
  UpdateChecklistUseCaseValidateInterface,
  ListChecklistsByUserIdUseCaseValidateInterface,
  ListChecklistsBySystemIdUseCaseValidateInterface,
};
