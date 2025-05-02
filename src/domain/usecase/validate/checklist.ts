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
import { validateWithZod, zodNumberSchema, zodStringSchema } from "./utils";
import {
  answerTypeArray,
  severityDegreeTypeArray,
} from "../../entity/checklistItem";
import { ItemRepositoryInterface } from "../repository/item";
import { LawRepositoryInterface } from "../repository/law";
import { DeviceRepositoryInterface } from "../repository/device";

const itemsZodValidation = z
  .object({
    id: zodNumberSchema("Id do item"),
    answer: z.enum(answerTypeArray).optional(),
    severityDegree: z.enum(severityDegreeTypeArray).optional(),
    userComment: zodStringSchema("userComment").optional(),
  })
  .refine(
    (item) => {
      return !(
        item.answer === "Não" && !(item.severityDegree && item.userComment)
      );
    },
    {
      message:
        "Para resposta não, é obrigatório ter grau de severidade e comentário do usuário",
      path: ["answer"],
    },
  )
  .array()
  .nonempty({
    message: "Items não pode ser um array vazio.",
  });

class CreateChecklistUseCaseValidate implements ValidateInterface {
  private systemRepository: SystemRepositoryInterface;
  private userRepository: UserRepositoryInterface;
  private itemRepository: ItemRepositoryInterface;
  private lawRepository: LawRepositoryInterface;
  private deviceRepository: DeviceRepositoryInterface;

  private validationSchema = z.object({
    userId: zodNumberSchema("UserId"),
    systemId: zodNumberSchema("SystemId"),
    tokenUserId: zodNumberSchema("Id do token"),
    items: itemsZodValidation,
    laws: zodNumberSchema("laws").array().nonempty({
      message: "Laws não pode ser um array vazio.",
    }),
    devices: zodNumberSchema("devices").array().nonempty({
      message: "Devices não pode ser um array vazio.",
    }),
  });

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
    itemRepository: ItemRepositoryInterface,
    lawRepository: LawRepositoryInterface,
    deviceRepository: DeviceRepositoryInterface,
  ) {
    this.systemRepository = systemRepository;
    this.userRepository = userRepository;
    this.itemRepository = itemRepository;
    this.lawRepository = lawRepository;
    this.deviceRepository = deviceRepository;
  }

  async validate(req: CreateChecklistUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        if (!(await this.userRepository.getUser(req.userId))) {
          return "O usuário informado não existe.";
        }

        const system = await this.systemRepository.getSystem(req.systemId);

        const items = await this.itemRepository.itemsExistByIds(
          req.items.map((i) => i.id),
        );

        if (items.length)
          return "Os seguintes ids de item não existem: " + items.join(", ");

        const laws = await this.lawRepository.existByIds(req.laws);

        if (laws.length)
          return "Os seguintes ids de leis não existem: " + laws.join(", ");

        const devices = await this.deviceRepository.existByIds(req.devices);

        if (devices.length)
          return (
            "Os seguintes ids de dispositivos não existem: " +
            devices.join(", ")
          );

        if (!system) return "O sistema informado não existe.";

        if (req.tokenUserId !== req.userId || system.userId !== req.tokenUserId)
          return NO_PERMISSION_MESSAGE;

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
  private itemRepository: ItemRepositoryInterface;
  private lawRepository: LawRepositoryInterface;
  private deviceRepository: DeviceRepositoryInterface;

  private validationSchema = z.object({
    id: zodNumberSchema("Id"),
    systemId: zodNumberSchema("SystemId"),
    tokenUserId: zodNumberSchema("Id do token"),
    items: itemsZodValidation,
    laws: zodNumberSchema("laws").array().nonempty({
      message: "Laws não pode ser um array vazio.",
    }),
    devices: zodNumberSchema("devices").array().nonempty({
      message: "Devices não pode ser um array vazio.",
    }),
  });

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
    itemRepository: ItemRepositoryInterface,
    lawRepository: LawRepositoryInterface,
    deviceRepository: DeviceRepositoryInterface,
  ) {
    this.checklistRepository = checklistRepository;
    this.systemRepository = systemRepository;
    this.itemRepository = itemRepository;
    this.lawRepository = lawRepository;
    this.deviceRepository = deviceRepository;
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

        const items = await this.itemRepository.itemsExistByIds(
          req.items.map((i) => i.id),
        );

        if (items.length)
          return "Os seguintes ids de item não existem: " + items.join(", ");

        const laws = await this.lawRepository.existByIds(req.laws);

        if (laws.length)
          return "Os seguintes ids de leis não existem: " + laws.join(", ");

        const devices = await this.deviceRepository.existByIds(req.devices);

        if (devices.length)
          return (
            "Os seguintes ids de dispositivos não existem: " +
            devices.join(", ")
          );

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
