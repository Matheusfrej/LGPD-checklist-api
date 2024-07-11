import * as z from "zod";
import {
  CreateSystemUseCaseRequest,
  DeleteSystemUseCaseRequest,
  GetSystemUseCaseRequest,
  ListSystemsByUserIdUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../../domain/usecase/ucio/system";
import { validateWithZod, zodNumberSchema, zodStringSchema } from "./utils";
import { NO_PERMISSION_MESSAGE } from "../../../domain/entity/error";
import { UserRepositoryInterface } from "../repository/user";
import { SystemRepositoryInterface } from "../repository/system";
import { ValidateInterface } from ".";

class CreateSystemUseCaseValidate implements ValidateInterface {
  private userRepository: UserRepositoryInterface;
  private validationSchema = z.object({
    name: zodStringSchema("Nome", 1),
    description: zodStringSchema("Descrição", 1),
    userId: zodNumberSchema("UserId"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(req: CreateSystemUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (!(await this.userRepository.getUser(req.userId))) {
          return "O usuário informado não existe.";
        }
        if (req.tokenUserId !== req.userId) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

class ListSystemsByUserIdUseCaseValidate implements ValidateInterface {
  private userRepository: UserRepositoryInterface;
  private validationSchema = z.object({
    userId: zodNumberSchema("UserId"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(
    req: ListSystemsByUserIdUseCaseRequest,
  ): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (!(await this.userRepository.getUser(req.userId))) {
          return "O usuário informado não existe.";
        }
        if (req.tokenUserId !== req.userId) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

class GetSystemUseCaseValidate implements ValidateInterface {
  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
  });

  async validate(req: GetSystemUseCaseRequest): Promise<string | null> {
    return await validateWithZod(() => this.validationSchema.parse(req));
  }
}

class DeleteSystemUseCaseValidate implements ValidateInterface {
  private systemRepository: SystemRepositoryInterface;
  private validationSchema = z.object({
    userId: zodNumberSchema("UserId"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(systemRepository: SystemRepositoryInterface) {
    this.systemRepository = systemRepository;
  }

  async validate(req: DeleteSystemUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        const system = await this.systemRepository.getSystem(req.id);

        if (!system) {
          return "O sistema informado não existe.";
        }

        if (system.userId !== req.tokenUserId) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

class UpdateSystemUseCaseValidate implements ValidateInterface {
  private systemRepository: SystemRepositoryInterface;
  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
    name: zodStringSchema("Nome", 1),
    description: zodStringSchema("Descrição", 1),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(systemRepository: SystemRepositoryInterface) {
    this.systemRepository = systemRepository;
  }

  async validate(req: UpdateSystemUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        const system = await this.systemRepository.getSystem(req.id);

        if (!system) {
          return "O sistema informado não existe.";
        }

        if (system.userId !== req.tokenUserId) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

export {
  CreateSystemUseCaseValidate,
  ListSystemsByUserIdUseCaseValidate,
  GetSystemUseCaseValidate,
  DeleteSystemUseCaseValidate,
  UpdateSystemUseCaseValidate,
};
