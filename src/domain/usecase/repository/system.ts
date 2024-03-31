import { SystemEntity } from "../../entity/system";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../ucio/system";

interface CreateSystemUseCaseRepositoryInterface {
  createSystem(req: CreateSystemUseCaseRequest): Promise<SystemEntity>;
}

interface ListSystemsByUserIdUseCaseRepositoryInterface {
  listSystemsByUserId(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<SystemEntity[]>;
}

interface GetSystemUseCaseRepositoryInterface {
  getSystem(req: GetSystemUseCaseRequest): Promise<SystemEntity>;
}

interface DeleteSystemUseCaseRepositoryInterface {
  deleteSystem(req: DeleteSystemUseCaseRequest): Promise<void>;
}

interface UpdateSystemUseCaseRepositoryInterface {
  updateSystem(req: UpdateSystemUseCaseRequest): Promise<void>;
}

export {
  CreateSystemUseCaseRepositoryInterface,
  ListSystemsByUserIdUseCaseRepositoryInterface,
  GetSystemUseCaseRepositoryInterface,
  DeleteSystemUseCaseRepositoryInterface,
  UpdateSystemUseCaseRepositoryInterface,
};
