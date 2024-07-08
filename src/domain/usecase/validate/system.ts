import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../../domain/usecase/ucio/system";
import { checkEmpty } from "./validate";
import { NO_PERMISSION_MESSAGE } from "../../../domain/entity/error";
import { UserRepositoryInterface } from "../repository/user";
import { SystemRepositoryInterface } from "../repository/system";

class CreateSystemUseCaseValidate {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: CreateSystemUseCaseRequest): Promise<string> {
    if (checkEmpty(req.name)) {
      return "O nome não pode ser vazio.";
    }
    if (checkEmpty(req.description)) {
      return "A descrição não pode ser vazia.";
    }
    if (checkEmpty(req.userId)) {
      return "O id do usuário não pode ser vazio.";
    }
    if (!(await this.userRepository.getUser(req.userId))) {
      return "O usuário informado não existe.";
    }
    if (req.tokenUserId !== req.userId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class ListSystemsByUserIdUseCaseValidate {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: ListSystemsByUserIdUseCaseRequest): Promise<string> {
    if (checkEmpty(req.userId)) {
      return "O id do usuário não pode ser vazio.";
    }
    if (!(await this.userRepository.getUser(req.userId))) {
      return "O usuário informado não existe.";
    }
    if (req.tokenUserId !== req.userId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class GetSystemUseCaseValidate {
  validate(req: GetSystemUseCaseRequest): string {
    if (checkEmpty(req.id)) {
      return "O id do sistema não pode ser vazio.";
    }

    return null;
  }
}

class DeleteSystemUseCaseValidate {
  private systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.systemRepository = systemRepository;
  }

  async validate(req: DeleteSystemUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id do sistema não pode ser vazio.";
    }

    const system = await this.systemRepository.getSystem(req);

    if (!system) {
      return "O sistema informado não existe.";
    }

    if (system.userId !== req.tokenUserId) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class UpdateSystemUseCaseValidate {
  private systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.systemRepository = systemRepository;
  }

  async validate(req: UpdateSystemUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id do sistema não pode ser vazio.";
    }
    if (checkEmpty(req.name)) {
      return "O nome do sistema não pode ser vazio.";
    }
    if (checkEmpty(req.description)) {
      return "A descrição do sistema não pode ser vazia.";
    }

    const system = await this.systemRepository.getSystem(req);

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
