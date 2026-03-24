import * as validate from "../usecase/validate/system";
import * as ucio from "../usecase/ucio/system";
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
  public validate: validate.CreateSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.validate = new validate.CreateSystemUseCaseValidate(userRepository);
    this.systemRepository = systemRepository;
  }

  async execute(
    req: ucio.CreateSystemUseCaseRequest,
  ): Promise<ucio.CreateSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const systemResp = await this.systemRepository.createSystem(req);
        return {
          system: systemResp,
          error: null,
        };
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return {
          system: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return {
        system: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

class ListSystemsByUserIdUseCase {
  public validate: validate.ListSystemsByUserIdUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(
    systemRepository: SystemRepositoryInterface,
    userRepository: UserRepositoryInterface,
  ) {
    this.validate = new validate.ListSystemsByUserIdUseCaseValidate(
      userRepository,
    );
    this.systemRepository = systemRepository;
  }

  async execute(
    req: ucio.ListSystemsByUserIdUseCaseRequest,
  ): Promise<ucio.ListSystemsByUserIdUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const systemsResp =
          await this.systemRepository.listSystemsByUserId(req);
        return {
          systems: systemsResp,
          error: null,
        };
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return {
          systems: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return {
        systems: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

class GetSystemUseCase {
  public validate: validate.GetSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.validate = new validate.GetSystemUseCaseValidate();
    this.systemRepository = systemRepository;
  }

  async execute(
    req: ucio.GetSystemUseCaseRequest,
  ): Promise<ucio.GetSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const system = await this.systemRepository.getSystem(req.id);

        if (system) {
          return {
            system,
            error: null,
          };
        } else {
          return {
            system: null,
            error: newPreConditionalError("Sistema não encontrado"),
          };
        }
      } else {
        return {
          system: null,
          error: newPreConditionalError(messageError),
        };
      }
    } catch (error) {
      console.log(error);
      return {
        system: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}

class DeleteSystemUseCase {
  public validate: validate.DeleteSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.validate = new validate.DeleteSystemUseCaseValidate(systemRepository);
    this.systemRepository = systemRepository;
  }

  async execute(
    req: ucio.DeleteSystemUseCaseRequest,
  ): Promise<ucio.DeleteSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);
      if (!messageError) {
        await this.systemRepository.deleteSystem(req);
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

class UpdateSystemUseCase {
  public validate: validate.UpdateSystemUseCaseValidate;
  public systemRepository: SystemRepositoryInterface;

  constructor(systemRepository: SystemRepositoryInterface) {
    this.validate = new validate.UpdateSystemUseCaseValidate(systemRepository);
    this.systemRepository = systemRepository;
  }

  async execute(
    req: ucio.UpdateSystemUseCaseRequest,
  ): Promise<ucio.UpdateSystemUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.systemRepository.updateSystem(req);
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

export {
  CreateSystemUseCase,
  ListSystemsByUserIdUseCase,
  GetSystemUseCase,
  DeleteSystemUseCase,
  UpdateSystemUseCase,
};
