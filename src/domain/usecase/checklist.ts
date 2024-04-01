import * as checklistValidateInterface from "../usecase/validate/checklist";
import * as checklistRepositoryInterface from "../usecase/repository/checklist";
import * as checklistUcioInterface from "../usecase/ucio/checklist";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  newInternalServerError,
  newPreConditionalError,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
} from "../entity/error";

class CreateChecklistUseCase {
  public validate: checklistValidateInterface.CreateChecklistUseCaseValidateInterface;
  public repository: checklistRepositoryInterface.CreateChecklistUseCaseRepositoryInterface;

  constructor(
    validate: checklistValidateInterface.CreateChecklistUseCaseValidateInterface,
    repository: checklistRepositoryInterface.CreateChecklistUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async createChecklist(
    req: checklistUcioInterface.CreateChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.CreateChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.createChecklist(req);

      if (!messageError) {
        const checklistResp = await this.repository.createChecklist(req);

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
  public validate: checklistValidateInterface.GetChecklistUseCaseValidateInterface;
  public repository: checklistRepositoryInterface.GetChecklistUseCaseRepositoryInterface;

  constructor(
    validate: checklistValidateInterface.GetChecklistUseCaseValidateInterface,
    repository: checklistRepositoryInterface.GetChecklistUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async getChecklist(
    req: checklistUcioInterface.GetChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.GetChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.getChecklist(req);

      if (!messageError) {
        const checklist = await this.repository.getChecklist(req);

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
  public validate: checklistValidateInterface.DeleteChecklistUseCaseValidateInterface;
  public repository: checklistRepositoryInterface.DeleteChecklistUseCaseRepositoryInterface;

  constructor(
    validate: checklistValidateInterface.DeleteChecklistUseCaseValidateInterface,
    repository: checklistRepositoryInterface.DeleteChecklistUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async deleteChecklist(
    req: checklistUcioInterface.DeleteChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.DeleteChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.deleteChecklist(req);
      if (!messageError) {
        await this.repository.deleteChecklist(req);

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
  public validate: checklistValidateInterface.UpdateChecklistUseCaseValidateInterface;
  public repository: checklistRepositoryInterface.UpdateChecklistUseCaseRepositoryInterface;

  constructor(
    validate: checklistValidateInterface.UpdateChecklistUseCaseValidateInterface,
    repository: checklistRepositoryInterface.UpdateChecklistUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async updateChecklist(
    req: checklistUcioInterface.UpdateChecklistUseCaseRequest,
  ): Promise<checklistUcioInterface.UpdateChecklistUseCaseResponse> {
    try {
      const messageError = await this.validate.updateChecklist(req);

      if (!messageError) {
        await this.repository.updateChecklist(req);

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

export {
  CreateChecklistUseCase,
  GetChecklistUseCase,
  DeleteChecklistUseCase,
  UpdateChecklistUseCase,
};
