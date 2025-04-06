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

        return new ucio.CreateSystemUseCaseResponse(systemResp, null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new ucio.CreateSystemUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new ucio.CreateSystemUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
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

        return new ucio.ListSystemsByUserIdUseCaseResponse(systemsResp, null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new ucio.ListSystemsByUserIdUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new ucio.ListSystemsByUserIdUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
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
          return new ucio.GetSystemUseCaseResponse(system, null);
        } else {
          return new ucio.GetSystemUseCaseResponse(
            null,
            newPreConditionalError("Sistema não encontrado"),
          );
        }
      } else {
        return new ucio.GetSystemUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new ucio.GetSystemUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
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

        return new ucio.DeleteSystemUseCaseResponse(null);
      } else {
        return new ucio.DeleteSystemUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new ucio.DeleteSystemUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
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

        return new ucio.UpdateSystemUseCaseResponse(null);
      } else {
        return new ucio.UpdateSystemUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(error);
      return new ucio.UpdateSystemUseCaseResponse(
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
