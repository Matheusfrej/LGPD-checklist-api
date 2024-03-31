import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../usecase/ucio/system";

interface CreateSystemUseCaseValidateInterface {
  createSystem(req: CreateSystemUseCaseRequest): Promise<string>;
}

interface ListSystemsByUserIdUseCaseValidateInterface {
  listSystemsByUserId(req: ListSystemsByUserIdUseCaseRequest): Promise<string>;
}

interface GetSystemUseCaseValidateInterface {
  getSystem(req: GetSystemUseCaseRequest): string;
}

interface DeleteSystemUseCaseValidateInterface {
  deleteSystem(req: DeleteSystemUseCaseRequest): Promise<string>;
}

interface UpdateSystemUseCaseValidateInterface {
  updateSystem(req: UpdateSystemUseCaseRequest): Promise<string>;
}

export {
  CreateSystemUseCaseValidateInterface,
  ListSystemsByUserIdUseCaseValidateInterface,
  GetSystemUseCaseValidateInterface,
  DeleteSystemUseCaseValidateInterface,
  UpdateSystemUseCaseValidateInterface,
};
