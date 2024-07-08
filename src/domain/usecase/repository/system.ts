import { SystemEntity } from "../../entity/system";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../ucio/system";

interface SystemRepositoryInterface {
  createSystem(req: CreateSystemUseCaseRequest): Promise<SystemEntity>;
  listSystemsByUserId(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<SystemEntity[]>;
  getSystem(req: GetSystemUseCaseRequest): Promise<SystemEntity>;
  deleteSystem(req: DeleteSystemUseCaseRequest): Promise<void>;
  updateSystem(req: UpdateSystemUseCaseRequest): Promise<void>;
}

export { SystemRepositoryInterface };
