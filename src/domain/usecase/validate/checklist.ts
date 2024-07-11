import * as z from "zod";
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
import {
  isNonEmptyJson,
  validateWithZod,
  zodBooleanSchema,
  zodNumberSchema,
} from "./utils";
import { Json } from "../../@types";

class CreateChecklistUseCaseValidate implements ValidateInterface {
  private systemRepository: SystemRepositoryInterface;
  private userRepository: UserRepositoryInterface;
  private validationSchema = z.object({
    userId: zodNumberSchema("UserId"),
    systemId: zodNumberSchema("SystemId"),
    tokenUserId: zodNumberSchema("Id do token"),
    isGeneral: zodBooleanSchema("isGeneral").refine((val) => val === true, {
      message: "isGeneral não pode ser falso.",
    }),
    isIot: zodBooleanSchema("isIot"),
    checklistData: z.custom<Json>(isNonEmptyJson, {
      message: "checklistData não podem ser vazio e deve ser no formato JSON",
    }),
  });

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.systemRepository = systemRepository;
    this.userRepository = userRepository;
  }

  async validate(req: CreateChecklistUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (!(await this.userRepository.getUser(req.userId))) {
          return "O usuário informado não existe.";
        }

        const system = await this.systemRepository.getSystem(req.systemId);

        if (!system) {
          return "O sistema informado não existe.";
        }

        if (
          req.tokenUserId !== req.userId ||
          system.userId !== req.tokenUserId
        ) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

class GetChecklistUseCaseValidate implements ValidateInterface {
  private checklistRepository: ChecklistRepositoryInterface;
  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.checklistRepository = checklistRepository;
  }

  async validate(req: GetChecklistUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        const checklist = await this.checklistRepository.getChecklist(req.id);

        if (!checklist) {
          return "O checklist não foi encontrado.";
        }

        if (checklist.userId !== req.tokenUserId) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

class DeleteChecklistUseCaseValidate implements ValidateInterface {
  private checklistRepository: ChecklistRepositoryInterface;
  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.checklistRepository = checklistRepository;
  }

  async validate(req: DeleteChecklistUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        const checklist = await this.checklistRepository.getChecklist(req.id);

        if (!checklist) {
          return "O checklist não foi encontrado.";
        }

        if (checklist.userId !== req.tokenUserId) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

class UpdateChecklistUseCaseValidate implements ValidateInterface {
  private checklistRepository: ChecklistRepositoryInterface;
  private systemRepository: SystemRepositoryInterface;
  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
    userId: zodNumberSchema("UserId"),
    systemId: zodNumberSchema("SystemId"),
    tokenUserId: zodNumberSchema("Id do token"),
    isGeneral: zodBooleanSchema("isGeneral").refine((val) => val === true, {
      message: "isGeneral não pode ser falso.",
    }),
    isIot: zodBooleanSchema("isIot"),
    checklistData: z.custom<Json>(isNonEmptyJson, {
      message: "checklistData não podem ser vazio e deve ser no formato JSON",
    }),
  });

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
  ) {
    this.checklistRepository = checklistRepository;
    this.systemRepository = systemRepository;
  }

  async validate(req: UpdateChecklistUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        const checklist = await this.checklistRepository.getChecklist(req.id);

        if (!checklist) {
          return "O checklist não foi encontrado.";
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
      },
    );
  }
}

class ListChecklistsByUserIdUseCaseValidate implements ValidateInterface {
  private userRepository: UserRepositoryInterface;
  private validationSchema = z.object({
    userId: zodNumberSchema("UserId"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async validate(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (!(await this.userRepository.getUser(req.userId))) {
          return "O usuário informado não existe.";
        }

        if (req.userId !== req.tokenUserId) {
          return NO_PERMISSION_MESSAGE;
        }

        return null;
      },
    );
  }
}

class ListChecklistsBySystemIdUseCaseValidate implements ValidateInterface {
  private systemRepository: SystemRepositoryInterface;
  private validationSchema = z.object({
    systemId: zodNumberSchema("SystemId"),
    tokenUserId: zodNumberSchema("Id do token"),
  });

  constructor(systemRepository: SystemRepositoryInterface) {
    this.systemRepository = systemRepository;
  }

  async validate(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        const system = await this.systemRepository.getSystem(req.systemId);

        if (!system) {
          return "O sistema não foi encontrado.";
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
  CreateChecklistUseCaseValidate,
  GetChecklistUseCaseValidate,
  DeleteChecklistUseCaseValidate,
  UpdateChecklistUseCaseValidate,
  ListChecklistsByUserIdUseCaseValidate,
  ListChecklistsBySystemIdUseCaseValidate,
};
