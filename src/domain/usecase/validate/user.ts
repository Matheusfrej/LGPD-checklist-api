import { NO_PERMISSION_MESSAGE } from "../../entity/error";
import { UserRepositoryInterface } from "../repository/user";
import {
  CreateUserUseCaseRequest,
  DeleteUserUseCaseRequest,
  GetUserUseCaseRequest,
  LoginUseCaseRequest,
  UpdateUserUseCaseRequest,
  VerifyTokenUseCaseRequest,
} from "../ucio/user";
import { checkEmpty, validateEmail, validatePassword } from "./validate";

class CreateUserUseCaseValidate {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: CreateUserUseCaseRequest): Promise<string> {
    if (checkEmpty(req.name)) {
      return "O nome do usuário não pode ser vazio.";
    }

    if (checkEmpty(req.office)) {
      return "A função/cargo não pode ser vazia";
    }

    if (checkEmpty(req.email)) {
      return "O email não pode ser vazio.";
    }

    if (checkEmpty(req.password)) {
      return "A senha não pode ser vazia.";
    }

    if (!validateEmail(req.email)) {
      return "Insira o email no formato correto.";
    }

    if (req.password.length < 6) {
      return "A senha deve ter no mínimo 6 caracteres";
    }

    if (!validatePassword(req.password)) {
      return "A senha deve ter pelo menos um caractere maiúsculo, um minúsculo, um número e um caractere especial (#?!@$%^&*-)";
    }

    if (await this.userRepository.checkUserByEmailExists(req.email, null)) {
      return "O email informado já existe.";
    }

    return null;
  }
}

class LoginUseCaseValidate {
  validate(req: LoginUseCaseRequest): string {
    if (checkEmpty(req.email)) {
      return "O email não pode ser vazio.";
    }

    if (checkEmpty(req.password)) {
      return "A senha não pode ser vazia.";
    }

    return null;
  }
}

class VerifyTokenUseCaseValidate {
  validate(req: VerifyTokenUseCaseRequest): string {
    if (checkEmpty(req.token)) {
      return "O token não pode ser vazio.";
    }

    return null;
  }
}

class UpdateUserUseCaseValidate {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: UpdateUserUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }
    if (checkEmpty(req.name)) {
      return "O nome não pode ser vazio.";
    }
    if (checkEmpty(req.office)) {
      return "O cargo/função não pode ser vazio.";
    }
    if (!(await this.userRepository.getUser(req.id))) {
      return "O usuário informado não existe";
    }
    if (req.tokenUserId !== req.id) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

class GetUserUseCaseValidate {
  validate(req: GetUserUseCaseRequest): string {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }

    return null;
  }
}

class DeleteUserUseCaseValidate {
  private userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: DeleteUserUseCaseRequest): Promise<string> {
    if (checkEmpty(req.id)) {
      return "O id não pode ser vazio.";
    }
    if (!(await this.userRepository.getUser(req.id))) {
      return "O usuário informado não existe";
    }
    if (req.tokenUserId !== req.id) {
      return NO_PERMISSION_MESSAGE;
    }

    return null;
  }
}

export {
  CreateUserUseCaseValidate,
  LoginUseCaseValidate,
  VerifyTokenUseCaseValidate,
  UpdateUserUseCaseValidate,
  GetUserUseCaseValidate,
  DeleteUserUseCaseValidate,
};
