import { SystemEntity } from "../../entity/system";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../ucio/system";

interface SystemRepositoryInterface {
  items?: SystemEntity[];

  createSystem(req: CreateSystemUseCaseRequest): Promise<SystemEntity>;
  listSystemsByUserId(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<SystemEntity[]>;
  getSystem(id: number): Promise<SystemEntity>;
  deleteSystem(req: DeleteSystemUseCaseRequest): Promise<void>;
  updateSystem(req: UpdateSystemUseCaseRequest): Promise<void>;
}

export { SystemRepositoryInterface };
