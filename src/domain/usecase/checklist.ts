import * as checklistValidateInterface from "../usecase/validate/checklist";
import * as checklistUcioInterface from "../usecase/ucio/checklist";
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

class CreateChecklistUseCase {
  public validate: checklistValidateInterface.CreateChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.validate =
      new checklistValidateInterface.CreateChecklistUseCaseValidate(
        systemRepository,
        userRepository,
      );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: checklistUcioInterface.CreateChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.CreateChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklistResp =
          await this.checklistRepository.createChecklist(req);

        return new checklistUcioInterface.CreateChecklistUseCaseResponse(
          checklistResp,
          null,
        );
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new checklistUcioInterface.CreateChecklistUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new checklistUcioInterface.CreateChecklistUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class GetChecklistUseCase {
  public validate: checklistValidateInterface.GetChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.validate = new checklistValidateInterface.GetChecklistUseCaseValidate(
      checklistRepository,
    );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: checklistUcioInterface.GetChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.GetChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklist = await this.checklistRepository.getChecklist(req.id);

        if (checklist) {
          return new checklistUcioInterface.GetChecklistUseCaseResponse(
            checklist,
            null,
          );
        } else {
          return new checklistUcioInterface.GetChecklistUseCaseResponse(
            null,
            newPreConditionalError("Checklist não encontrada"),
          );
        }
      } else {
        return new checklistUcioInterface.GetChecklistUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new checklistUcioInterface.GetChecklistUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class DeleteChecklistUseCase {
  public validate: checklistValidateInterface.DeleteChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(checklistRepository: ChecklistRepositoryInterface) {
    this.validate =
      new checklistValidateInterface.DeleteChecklistUseCaseValidate(
        checklistRepository,
      );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: checklistUcioInterface.DeleteChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.DeleteChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);
      if (!messageError) {
        await this.checklistRepository.deleteChecklist(req);

        return new checklistUcioInterface.DeleteChecklistUseCaseResponse(null);
      } else {
        return new checklistUcioInterface.DeleteChecklistUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new checklistUcioInterface.DeleteChecklistUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class UpdateChecklistUseCase {
  public validate: checklistValidateInterface.UpdateChecklistUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
  ) {
    this.validate =
      new checklistValidateInterface.UpdateChecklistUseCaseValidate(
        checklistRepository,
        systemRepository,
      );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: checklistUcioInterface.UpdateChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.UpdateChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.checklistRepository.updateChecklist(req);

        return new checklistUcioInterface.UpdateChecklistUseCaseResponse(null);
      } else {
        return new checklistUcioInterface.UpdateChecklistUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new checklistUcioInterface.UpdateChecklistUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class ListChecklistsByUserIdUseCase {
  public validate: checklistValidateInterface.ListChecklistsByUserIdUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.validate =
      new checklistValidateInterface.ListChecklistsByUserIdUseCaseValidate(
        userRepository,
      );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: checklistUcioInterface.ListChecklistsByUserIdUseCaseRequest,
  ): Promise<checklistUcioInterface.ListChecklistsByUserIdUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklists =
          await this.checklistRepository.listChecklistsByUserId(req);

        return new checklistUcioInterface.ListChecklistsByUserIdUseCaseResponse(
          checklists,
          null,
        );
      } else {
        return new checklistUcioInterface.ListChecklistsByUserIdUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new checklistUcioInterface.ListChecklistsByUserIdUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class ListChecklistsBySystemIdUseCase {
  public validate: checklistValidateInterface.ListChecklistsBySystemIdUseCaseValidate;
  public checklistRepository: ChecklistRepositoryInterface;

  constructor(
    checklistRepository: ChecklistRepositoryInterface,
    systemRepository: SystemRepositoryInterface,
  ) {
    this.validate =
      new checklistValidateInterface.ListChecklistsBySystemIdUseCaseValidate(
        systemRepository,
      );
    this.checklistRepository = checklistRepository;
  }

  async execute(
    req: checklistUcioInterface.ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<checklistUcioInterface.ListChecklistsBySystemIdUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const checklists =
          await this.checklistRepository.listChecklistsBySystemId(req);

        return new checklistUcioInterface.ListChecklistsBySystemIdUseCaseResponse(
          checklists,
          null,
        );
      } else {
        return new checklistUcioInterface.ListChecklistsBySystemIdUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new checklistUcioInterface.ListChecklistsBySystemIdUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
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
