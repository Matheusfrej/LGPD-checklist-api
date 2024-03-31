import * as systemInterface from "@/domain/usecase/validate/system";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../../domain/usecase/ucio/system";
import { checkEmpty } from "./validate";
import { getUser } from "../../internal/database/postgresql/user";
import { getSystem } from "../../internal/database/postgresql/system";
import { NO_PERMISSION_MESSAGE } from "../../../domain/entity/error";

class CreateSystemUseCaseValidate
  implements systemInterface.CreateSystemUseCaseValidateInterface
{
  async createSystem(req: CreateSystemUseCaseRequest): Promise<string> {
    if (checkEmpty(req.name)) {
      return "O nome não pode ser vazio.";
    }
    if (checkEmpty(req.description)) {
      return "A descrição não pode ser vazia.";
    }
    if (checkEmpty(req.userId)) {
      return "O id do usuário não pode ser vazio.";
    }
    if (!(await getUser(req.userId))) {
      return "O usuário informado não existe.";
    }
    if (req.tokenUserId !== req.userId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class ListSystemsByUserIdUseCaseValidate
  implements systemInterface.ListSystemsByUserIdUseCaseValidateInterface
{
  async listSystemsByUserId(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<string> {
    if (checkEmpty(req.userId)) {
      return "O id do usuário não pode ser vazio.";
    }
    if (!(await getUser(req.userId))) {
      return "O usuário informado não existe.";
    }
    if (req.tokenUserId !== req.userId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class GetSystemUseCaseValidate
  implements systemInterface.GetSystemUseCaseValidateInterface
{
  getSystem(req: GetSystemUseCaseRequest): string {
    if (checkEmpty(req.id)) {
      return "O id do sistema não pode ser vazio.";
    }

    return null;
  }
}

class DeleteSystemUseCaseValidate
  implements systemInterface.DeleteSystemUseCaseValidateInterface
{
  async deleteSystem(req: DeleteSystemUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id do sistema não pode ser vazio.";
    }

    const system = await getSystem(req.id);

    if (!system) {
      return "O sistema informado não existe.";
    }

    if (system.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class UpdateSystemUseCaseValidate
  implements systemInterface.UpdateSystemUseCaseValidateInterface
{
  async updateSystem(req: UpdateSystemUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id do sistema não pode ser vazio.";
    }
    if (checkEmpty(req.name)) {
      return "O nome do sistema não pode ser vazio.";
    }
    if (checkEmpty(req.description)) {
      return "A descrição do sistema não pode ser vazia.";
    }

    const system = await getSystem(req.id);

    if (!system) {
      return "O sistema informado não existe.";
    }

    if (system.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

export {
  CreateSystemUseCaseValidate,
  ListSystemsByUserIdUseCaseValidate,
  GetSystemUseCaseValidate,
  DeleteSystemUseCaseValidate,
  UpdateSystemUseCaseValidate,
};
