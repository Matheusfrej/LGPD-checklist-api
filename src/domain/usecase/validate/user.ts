import * as z from "zod";
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
import { validateWithZod, zodNumberSchema, zodStringSchema } from "./utils";
import { ValidateInterface } from ".";

class CreateUserUseCaseValidate implements ValidateInterface {
  private userRepository: UserRepositoryInterface;
  private validationSchema = z.object({
    name: zodStringSchema("Nome de usuário", 1),
    office: zodStringSchema("Função/cargo", 1),
    email: zodStringSchema("Email", 1).email(
      "Insira o email no formato correto.",
    ),
    password: zodStringSchema("Senha", 6).regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
      "A senha deve ter pelo menos um caractere maiúsculo, um minúsculo, um número e um caractere especial (#?!@$%^&*-).",
    ),
  });

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: CreateUserUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (await this.userRepository.checkUserByEmailExists(req.email)) {
          return "O email informado já existe.";
        }

        return null;
      },
    );
  }
}

class LoginUseCaseValidate implements ValidateInterface {
  private validationSchema = z.object({
    email: zodStringSchema("Email", 1).email(
      "Insira o email no formato correto.",
    ),
    password: zodStringSchema("Senha", 1),
  });

  async validate(req: LoginUseCaseRequest): Promise<string | null> {
    return await validateWithZod(() => this.validationSchema.parse(req));
  }
}

class VerifyTokenUseCaseValidate implements ValidateInterface {
  private validationSchema = z.object({
    token: zodStringSchema("Token", 1),
  });

  async validate(req: VerifyTokenUseCaseRequest): Promise<string | null> {
    return await validateWithZod(() => this.validationSchema.parse(req));
  }
}

class UpdateUserUseCaseValidate implements ValidateInterface {
  private userRepository: UserRepositoryInterface;
  private validationSchema = z.object({
    name: zodStringSchema("Nome de usuário", 1),
    office: zodStringSchema("Função/cargo", 1),
    id: zodNumberSchema("Id"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: UpdateUserUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (req.tokenUserId !== req.id) {
          return NO_PERMISSION_MESSAGE;
        }

        if (!(await this.userRepository.getUser(req.id))) {
          return "O usuário informado não existe";
        }

        return null;
      },
    );
  }
}

class GetUserUseCaseValidate implements ValidateInterface {
  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
  });

  async validate(req: GetUserUseCaseRequest): Promise<string | null> {
    return await validateWithZod(() => this.validationSchema.parse(req));
  }
}

class DeleteUserUseCaseValidate implements ValidateInterface {
  private userRepository: UserRepositoryInterface;
  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: DeleteUserUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (!(await this.userRepository.getUser(req.id))) {
          return "O usuário informado não existe";
        }

        if (req.tokenUserId !== req.id) {
          return NO_PERMISSION_MESSAGE;
        }
        return null;
      },
    );
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
