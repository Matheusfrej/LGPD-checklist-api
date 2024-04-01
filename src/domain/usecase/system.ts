import * as systemValidateInterface from "../usecase/validate/system";
import * as systemRepositoryInterface from "../usecase/repository/system";
import * as systemUcioInterface from "../usecase/ucio/system";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  newInternalServerError,
  newPreConditionalError,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
} from "../entity/error";

class CreateSystemUseCase {
  public validate: systemValidateInterface.CreateSystemUseCaseValidateInterface;
  public repository: systemRepositoryInterface.CreateSystemUseCaseRepositoryInterface;

  constructor(
    validate: systemValidateInterface.CreateSystemUseCaseValidateInterface,
    repository: systemRepositoryInterface.CreateSystemUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async createSystem(
    req: systemUcioInterface.CreateSystemUseCaseRequest,
  ): Promise<systemUcioInterface.CreateSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.createSystem(req);

      if (!messageError) {
        const systemResp = await this.repository.createSystem(req);

        return new systemUcioInterface.CreateSystemUseCaseResponse(
          systemResp,
          null,
        );
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new systemUcioInterface.CreateSystemUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new systemUcioInterface.CreateSystemUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class ListSystemsByUserIdUseCase {
  public validate: systemValidateInterface.ListSystemsByUserIdUseCaseValidateInterface;
  public repository: systemRepositoryInterface.ListSystemsByUserIdUseCaseRepositoryInterface;

  constructor(
    validate: systemValidateInterface.ListSystemsByUserIdUseCaseValidateInterface,
    repository: systemRepositoryInterface.ListSystemsByUserIdUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async listSystemsByUserId(
    req: systemUcioInterface.ListSystemsByUserIdUseCaseRequest,
  ): Promise<systemUcioInterface.ListSystemsByUserIdUseCaseResponse> {
    try {
      const messageError = await this.validate.listSystemsByUserId(req);

      if (!messageError) {
        const systemsResp = await this.repository.listSystemsByUserId(req);

        return new systemUcioInterface.ListSystemsByUserIdUseCaseResponse(
          systemsResp,
          null,
        );
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new systemUcioInterface.ListSystemsByUserIdUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new systemUcioInterface.ListSystemsByUserIdUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class GetSystemUseCase {
  public validate: systemValidateInterface.GetSystemUseCaseValidateInterface;
  public repository: systemRepositoryInterface.GetSystemUseCaseRepositoryInterface;

  constructor(
    validate: systemValidateInterface.GetSystemUseCaseValidateInterface,
    repository: systemRepositoryInterface.GetSystemUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async getSystem(
    req: systemUcioInterface.GetSystemUseCaseRequest,
  ): Promise<systemUcioInterface.GetSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.getSystem(req);

      if (!messageError) {
        const system = await this.repository.getSystem(req);

        if (system) {
          return new systemUcioInterface.GetSystemUseCaseResponse(system, null);
        } else {
          return new systemUcioInterface.GetSystemUseCaseResponse(
            null,
            newPreConditionalError("Sistema não encontrado"),
          );
        }
      } else {
        return new systemUcioInterface.GetSystemUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new systemUcioInterface.GetSystemUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class DeleteSystemUseCase {
  public validate: systemValidateInterface.DeleteSystemUseCaseValidateInterface;
  public repository: systemRepositoryInterface.DeleteSystemUseCaseRepositoryInterface;

  constructor(
    validate: systemValidateInterface.DeleteSystemUseCaseValidateInterface,
    repository: systemRepositoryInterface.DeleteSystemUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async deleteSystem(
    req: systemUcioInterface.DeleteSystemUseCaseRequest,
  ): Promise<systemUcioInterface.DeleteSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.deleteSystem(req);
      if (!messageError) {
        await this.repository.deleteSystem(req);

        return new systemUcioInterface.DeleteSystemUseCaseResponse(null);
      } else {
        return new systemUcioInterface.DeleteSystemUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new systemUcioInterface.DeleteSystemUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class UpdateSystemUseCase {
  public validate: systemValidateInterface.UpdateSystemUseCaseValidateInterface;
  public repository: systemRepositoryInterface.UpdateSystemUseCaseRepositoryInterface;

  constructor(
    validate: systemValidateInterface.UpdateSystemUseCaseValidateInterface,
    repository: systemRepositoryInterface.UpdateSystemUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async updateSystem(
    req: systemUcioInterface.UpdateSystemUseCaseRequest,
  ): Promise<systemUcioInterface.UpdateSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.updateSystem(req);

      if (!messageError) {
        await this.repository.updateSystem(req);

        return new systemUcioInterface.UpdateSystemUseCaseResponse(null);
      } else {
        return new systemUcioInterface.UpdateSystemUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new systemUcioInterface.UpdateSystemUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

export {
  CreateSystemUseCase,
  ListSystemsByUserIdUseCase,
  GetSystemUseCase,
  DeleteSystemUseCase,
  UpdateSystemUseCase,
};
