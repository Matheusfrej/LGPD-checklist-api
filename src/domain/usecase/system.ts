import * as systemValidateInterface from "../usecase/validate/system";
import * as systemUcioInterface from "../usecase/ucio/system";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  newInternalServerError,
  newPreConditionalError,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
} from "../entity/error";
import { SystemRepositoryInterface } from "./repository/system";
import { UserRepositoryInterface } from "./repository/user";

class CreateSystemUseCase {
  public validate: systemValidateInterface.CreateSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.validate = new systemValidateInterface.CreateSystemUseCaseValidate(
      userRepository,
    );
    this.systemRepository = systemRepository;
  }

  async execute(
    req: systemUcioInterface.CreateSystemUseCaseRequest,
  ): Promise<systemUcioInterface.CreateSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const systemResp = await this.systemRepository.createSystem(req);

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
  public validate: systemValidateInterface.ListSystemsByUserIdUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.validate =
      new systemValidateInterface.ListSystemsByUserIdUseCaseValidate(
        userRepository,
      );
    this.systemRepository = systemRepository;
  }

  async execute(
    req: systemUcioInterface.ListSystemsByUserIdUseCaseRequest,
  ): Promise<systemUcioInterface.ListSystemsByUserIdUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const systemsResp =
          await this.systemRepository.listSystemsByUserId(req);

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
  public validate: systemValidateInterface.GetSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.validate = new systemValidateInterface.GetSystemUseCaseValidate();
    this.systemRepository = systemRepository;
  }

  async execute(
    req: systemUcioInterface.GetSystemUseCaseRequest,
  ): Promise<systemUcioInterface.GetSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const system = await this.systemRepository.getSystem(req.id);

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
  public validate: systemValidateInterface.DeleteSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.validate = new systemValidateInterface.DeleteSystemUseCaseValidate(
      systemRepository,
    );
    this.systemRepository = systemRepository;
  }

  async execute(
    req: systemUcioInterface.DeleteSystemUseCaseRequest,
  ): Promise<systemUcioInterface.DeleteSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);
      if (!messageError) {
        await this.systemRepository.deleteSystem(req);

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
  public validate: systemValidateInterface.UpdateSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.validate = new systemValidateInterface.UpdateSystemUseCaseValidate(
      systemRepository,
    );
    this.systemRepository = systemRepository;
  }

  async execute(
    req: systemUcioInterface.UpdateSystemUseCaseRequest,
  ): Promise<systemUcioInterface.UpdateSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.systemRepository.updateSystem(req);

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
