import { ValidateInterface } from ".";
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
import { checkEmpty } from "./utils";

class CreateChecklistUseCaseValidate implements ValidateInterface {
  private systemRepository: SystemRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.systemRepository = systemRepository;
    this.userRepository = userRepository;
  }

  async validate(req: CreateChecklistUseCaseRequest): Promise<string | null> {
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

class GetChecklistUseCaseValidate implements ValidateInterface {
  private checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.checklistRepository = checklistRepository;
  }

  async validate(req: GetChecklistUseCaseRequest): Promise<string | null> {
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

class DeleteChecklistUseCaseValidate implements ValidateInterface {
  private checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.checklistRepository = checklistRepository;
  }

  async validate(req: DeleteChecklistUseCaseRequest): Promise<string | null> {
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

class UpdateChecklistUseCaseValidate implements ValidateInterface {
  private checklistRepository: ChecklistRepositoryInterface;
  private systemRepository: SystemRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
  ) {
    this.checklistRepository = checklistRepository;
    this.systemRepository = systemRepository;
  }

  async validate(req: UpdateChecklistUseCaseRequest): Promise<string | null> {
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

class ListChecklistsByUserIdUseCaseValidate implements ValidateInterface {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<string | null> {
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

class ListChecklistsBySystemIdUseCaseValidate implements ValidateInterface {
  private systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.systemRepository = systemRepository;
  }

  async validate(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<string | null> {
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
