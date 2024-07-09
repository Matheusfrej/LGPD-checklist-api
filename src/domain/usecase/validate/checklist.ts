import { NO_PERMISSION_MESSAGE } from "../../../domain/entity/error";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  GetChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../domain/usecase/ucio/checklist";
import { ChecklistRepositoryInterface } from "../repository/checklist";
import { SystemRepositoryInterface } from "../repository/system";
import { UserRepositoryInterface } from "../repository/user";
import { checkEmpty } from "./validate";

class CreateChecklistUseCaseValidate {
  private systemRepository: SystemRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.systemRepository = systemRepository;
    this.userRepository = userRepository;
  }

  async validate(req: CreateChecklistUseCaseRequest): Promise<string> {
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
    if (!(await this.userRepository.getUser(req.userId))) {
      return "O usuário informado não existe.";
    }

    const system = await this.systemRepository.getSystem(req.systemId);

    if (!system) {
      return "O sistema informado não existe.";
    }

    if (req.tokenUserId !== req.userId || system.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class GetChecklistUseCaseValidate {
  private checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.checklistRepository = checklistRepository;
  }

  async validate(req: GetChecklistUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }

    const checklist = await this.checklistRepository.getChecklist(req.id);

    if (!checklist) {
      return "O checklist não foi encontrado.";
    }

    if (checklist.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class DeleteChecklistUseCaseValidate {
  private checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.checklistRepository = checklistRepository;
  }

  async validate(req: DeleteChecklistUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }

    const checklist = await this.checklistRepository.getChecklist(req.id);

    if (!checklist) {
      return "O checklist não foi encontrado.";
    }

    if (checklist.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class UpdateChecklistUseCaseValidate {
  private checklistRepository: ChecklistRepositoryInterface;
  private systemRepository: SystemRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
  ) {
    this.checklistRepository = checklistRepository;
    this.systemRepository = systemRepository;
  }

  async validate(req: UpdateChecklistUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }

    const checklist = await this.checklistRepository.getChecklist(req.id);

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

    const system = await this.systemRepository.getSystem(req.systemId);

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

class ListChecklistsByUserIdUseCaseValidate {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: ListChecklistsByUserIdUseCaseRequest): Promise<string> {
    if (checkEmpty(req.userId)) {
      return "O id do usuário não pode ser vazio.";
    }

    if (!(await this.userRepository.getUser(req.userId))) {
      return "O usuário informado não existe.";
    }

    if (req.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class ListChecklistsBySystemIdUseCaseValidate {
  private systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.systemRepository = systemRepository;
  }

  async validate(req: ListChecklistsBySystemIdUseCaseRequest): Promise<string> {
    if (checkEmpty(req.systemId)) {
      return "O id do sistema não pode ser vazio.";
    }

    const system = await this.systemRepository.getSystem(req.systemId);

    if (!system) {
      return "O sistema não foi encontrado.";
    }

    if (system.userId !== req.tokenUserId) {
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
  ListChecklistsByUserIdUseCaseValidate,
  ListChecklistsBySystemIdUseCaseValidate,
};
