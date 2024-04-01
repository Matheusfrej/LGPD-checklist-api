import * as checklistInterface from "@/domain/usecase/validate/checklist";
import { NO_PERMISSION_MESSAGE } from "../../../domain/entity/error";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  GetChecklistUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../domain/usecase/ucio/checklist";
import { checkEmpty } from "./validate";
import { getUser } from "../../internal/database/postgresql/user";
import { getSystem } from "../../internal/database/postgresql/system";
import { getChecklist } from "../../internal/database/postgresql/checklist";

class CreateChecklistUseCaseValidate
  implements checklistInterface.CreateChecklistUseCaseValidateInterface
{
  async createChecklist(req: CreateChecklistUseCaseRequest): Promise<string> {
    if (checkEmpty(req.userId)) {
      return "O id do usuário não pode ser vazio.";
    }
    if (checkEmpty(req.systemId)) {
      return "O id do sistema não pode ser vazio.";
    }
    if (checkEmpty(req.checklistData)) {
      return "Os dados do checklist não podem ser vazios.";
    }
    if (req.isGeneral === false) {
      return "isGeneral não pode ser falso.";
    }
    if (!(await getUser(req.userId))) {
      return "O usuário informado não existe.";
    }

    const system = await getSystem(req.systemId);

    if (!system) {
      return "O sistema informado não existe.";
    }

    if (req.tokenUserId !== req.userId || system.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class GetChecklistUseCaseValidate
  implements checklistInterface.GetChecklistUseCaseValidateInterface
{
  async getChecklist(req: GetChecklistUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }

    const checklist = await getChecklist(req.id);

    if (!checklist) {
      return "O checklist não foi encontrado.";
    }

    if (checklist.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class DeleteChecklistUseCaseValidate
  implements checklistInterface.DeleteChecklistUseCaseValidateInterface
{
  async deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }

    const checklist = await getChecklist(req.id);

    if (!checklist) {
      return "O checklist não foi encontrado.";
    }

    if (checklist.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class UpdateChecklistUseCaseValidate
  implements checklistInterface.UpdateChecklistUseCaseValidateInterface
{
  async updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }

    const checklist = await getChecklist(req.id);

    if (!checklist) {
      return "O checklist não foi encontrado.";
    }

    if (checkEmpty(req.systemId)) {
      return "O id do sistema não pode ser vazio.";
    }
    if (checkEmpty(req.checklistData)) {
      return "Os dados do checklist não podem ser vazios.";
    }
    if (req.isGeneral === false) {
      return "isGeneral não pode ser falso.";
    }

    const system = await getSystem(req.systemId);

    if (!system) {
      return "O sistema não foi encontrado.";
    }

    if (
      checklist.userId !== req.tokenUserId ||
      system.userId !== req.tokenUserId
    ) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

export {
  CreateChecklistUseCaseValidate,
  GetChecklistUseCaseValidate,
  DeleteChecklistUseCaseValidate,
  UpdateChecklistUseCaseValidate,
};
