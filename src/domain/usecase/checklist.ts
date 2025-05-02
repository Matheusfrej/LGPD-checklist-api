import * as validate from "../usecase/validate/checklist";
import * as ucio from "../usecase/ucio/checklist";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  newInternalServerError,
  newPreConditionalError,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
} from "../entity/error";
import { ChecklistRepositoryInterface } from "./repository/checklist";
import { SystemRepositoryInterface } from "./repository/system";
import { UserRepositoryInterface } from "./repository/user";
import { ItemRepositoryInterface } from "./repository/item";
import { ChecklistItemEntity } from "../entity/checklistItem";
import { ItemEntity } from "../entity/item";
import { LawRepositoryInterface } from "./repository/law";
import { DeviceRepositoryInterface } from "./repository/device";

class CreateChecklistUseCase {
  public validate: validate.CreateChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
    itemRepository: ItemRepositoryInterface,
    lawRepository: LawRepositoryInterface,
    deviceRepository: DeviceRepositoryInterface,
  ) {
    this.validate = new validate.CreateChecklistUseCaseValidate(
      systemRepository,
      userRepository,
      itemRepository,
      lawRepository,
      deviceRepository,
    );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: ucio.CreateChecklistUseCaseRequest,
  ): Promise<ucio.CreateChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklist = await this.checklistRepository.createChecklist(req);

        return {
          checklist,
          error: null,
        };
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return {
          checklist: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return {
        checklist: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

class GetChecklistUseCase {
  public validate: validate.GetChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.validate = new validate.GetChecklistUseCaseValidate(
      checklistRepository,
    );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: ucio.GetChecklistUseCaseRequest,
  ): Promise<ucio.GetChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklist = await this.checklistRepository.getChecklist(req.id);

        if (checklist) {
          return {
            checklist,
            error: null,
          };
        } else {
          return {
            checklist: null,
            error: newPreConditionalError("Checklist não encontrada"),
          };
        }
      } else {
        return {
          checklist: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(error);
      return {
        checklist: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

class DeleteChecklistUseCase {
  public validate: validate.DeleteChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.validate = new validate.DeleteChecklistUseCaseValidate(
      checklistRepository,
    );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: ucio.DeleteChecklistUseCaseRequest,
  ): Promise<ucio.DeleteChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);
      if (!messageError) {
        await this.checklistRepository.deleteChecklist(req);

        return {
          error: null,
        };
      } else {
        return {
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(error);

      return {
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

class UpdateChecklistUseCase {
  public validate: validate.UpdateChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
    itemRepository: ItemRepositoryInterface,
    lawRepository: LawRepositoryInterface,
    deviceRepository: DeviceRepositoryInterface,
  ) {
    this.validate = new validate.UpdateChecklistUseCaseValidate(
      checklistRepository,
      systemRepository,
      itemRepository,
      lawRepository,
      deviceRepository,
    );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: ucio.UpdateChecklistUseCaseRequest,
  ): Promise<ucio.UpdateChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        // Transação
        await this.checklistRepository.runInTransaction(async (repo) => {
          await this.updateItems(req, repo);

          await this.updateLaws(req, repo);
          await this.updateDevices(req, repo);

          // Atualiza o resto dos campos
          await repo.updateChecklist(req);
        });

        return {
          error: null,
        };
      } else {
        return {
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(error);

      return {
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }

  async updateItems(
    req: ucio.UpdateChecklistUseCaseRequest,
    repo: ChecklistRepositoryInterface,
  ) {
    const currentItems = await repo.getItems(req.id);

    const currentIds = currentItems.map((item) => item.item.id);
    const newItemsIds = req.items.map((item) => item.id);

    const itemsToDelete = currentIds.filter((id) => !newItemsIds.includes(id));
    const itemsToCreate = req.items.filter(
      (item) => !currentIds.includes(item.id),
    );
    const itemsToUpdate = req.items.filter((item) =>
      currentIds.includes(item.id),
    );

    if (itemsToDelete.length) await repo.removeItems(req.id, itemsToDelete);

    if (itemsToCreate.length)
      await repo.insertItems(
        req.id,
        itemsToCreate.map(
          (item) =>
            new ChecklistItemEntity(
              null,
              new ItemEntity(item.id, null, null, null, null, null, null),
              item.answer,
              item.severityDegree,
              item.userComment,
            ),
        ),
      );

    for (const item of itemsToUpdate)
      await repo.updateItem(
        req.id,
        new ChecklistItemEntity(
          null,
          new ItemEntity(item.id, null, null, null, null, null, null),
          item.answer,
          item.severityDegree,
          item.userComment,
        ),
      );
  }

  async updateLaws(
    req: ucio.UpdateChecklistUseCaseRequest,
    repo: ChecklistRepositoryInterface,
  ) {
    const currentItems = await repo.getLaws(req.id);

    const currentIds = currentItems.map((item) => item.id);
    const newItemsIds = req.laws;

    const itemsToDelete = currentIds.filter((id) => !newItemsIds.includes(id));
    const itemsToCreate = req.laws.filter((item) => !currentIds.includes(item));

    if (itemsToDelete.length) await repo.removeLaws(req.id, itemsToDelete);

    if (itemsToCreate.length) await repo.insertLaws(req.id, itemsToCreate);
  }

  async updateDevices(
    req: ucio.UpdateChecklistUseCaseRequest,
    repo: ChecklistRepositoryInterface,
  ) {
    const currentItems = await repo.getDevices(req.id);

    const currentIds = currentItems.map((item) => item.id);
    const newItemsIds = req.devices;

    const itemsToDelete = currentIds.filter((id) => !newItemsIds.includes(id));
    const itemsToCreate = req.devices.filter(
      (item) => !currentIds.includes(item),
    );
    if (itemsToDelete.length) await repo.removeDevices(req.id, itemsToDelete);

    if (itemsToCreate.length) await repo.insertDevices(req.id, itemsToCreate);
  }
}

class ListChecklistsByUserIdUseCase {
  public validate: validate.ListChecklistsByUserIdUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.validate = new validate.ListChecklistsByUserIdUseCaseValidate(
      userRepository,
    );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: ucio.ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ucio.ListChecklistsByUserIdUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklists =
          await this.checklistRepository.listChecklistsByUserId(req);

        return {
          checklists,
          error: null,
        };
      } else {
        return {
          checklists: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(error);

      return {
        checklists: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

class ListChecklistsBySystemIdUseCase {
  public validate: validate.ListChecklistsBySystemIdUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
  ) {
    this.validate = new validate.ListChecklistsBySystemIdUseCaseValidate(
      systemRepository,
    );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: ucio.ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ucio.ListChecklistsBySystemIdUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklists =
          await this.checklistRepository.listChecklistsBySystemId(req);

        return {
          checklists,
          error: null,
        };
      } else {
        return {
          checklists: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(error);

      return {
        checklists: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

export {
  CreateChecklistUseCase,
  GetChecklistUseCase,
  DeleteChecklistUseCase,
  UpdateChecklistUseCase,
  ListChecklistsByUserIdUseCase,
  ListChecklistsBySystemIdUseCase,
};
