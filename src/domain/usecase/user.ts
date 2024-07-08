import * as userValidateInterface from "./validate/user";
import * as userUcioInterface from "./ucio/user";
import { genSaltSync, hashSync } from "bcryptjs";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
  newInternalServerError,
  newPreConditionalError,
} from "../entity/error";
import { UserRepositoryInterface } from "./repository/user";

class CreateUserUseCase {
  public validate: userValidateInterface.CreateUserUseCaseValidate;
  public repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.CreateUserUseCaseValidate(
      repository,
    );
    this.repository = repository;
  }

  async execute(
    req: userUcioInterface.CreateUserUseCaseRequest,
  ): Promise<userUcioInterface.CreateUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const salt = genSaltSync(11);
        const passwordEncrypt = hashSync(req.password, salt);
        req.password = passwordEncrypt;

        const userResp = await this.repository.createUser(req);

        return new userUcioInterface.CreateUserUseCaseResponse(userResp, null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new userUcioInterface.CreateUserUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new userUcioInterface.CreateUserUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class LoginUseCase {
  public validate: userValidateInterface.LoginUseCaseValidate;
  public repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.LoginUseCaseValidate();
    this.repository = repository;
  }

  async execute(
    req: userUcioInterface.LoginUseCaseRequest,
  ): Promise<userUcioInterface.LoginUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const userResp = await this.repository.login(req);

        if (userResp) {
          const token = this.repository.createToken(userResp.id);

          return new userUcioInterface.LoginUseCaseResponse(
            userResp,
            token,
            null,
          );
        }

        return new userUcioInterface.LoginUseCaseResponse(
          null,
          null,
          newPreConditionalError("E-mail e/ou Senha incorretos."),
        );
      }

      console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
      return new userUcioInterface.LoginUseCaseResponse(
        null,
        null,
        newPreConditionalError(messageError),
      );
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new userUcioInterface.LoginUseCaseResponse(
        null,
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class VerifyTokenUseCase {
  public validate: userValidateInterface.VerifyTokenUseCaseValidate;
  public repository: UserRepositoryInterface;
  public req: userUcioInterface.VerifyTokenUseCaseRequest;

  constructor(repository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.VerifyTokenUseCaseValidate();
    this.repository = repository;
  }

  async execute(
    req: userUcioInterface.VerifyTokenUseCaseRequest,
  ): Promise<userUcioInterface.VerifyTokenUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const userIsValid = await this.repository.verifyToken(req.token);

        if (userIsValid === "jwt expired" || userIsValid === "invalid token")
          return new userUcioInterface.VerifyTokenUseCaseResponse(
            null,
            null,
            newPreConditionalError("Sua sessão expirou"),
          );

        const user = await this.repository.getUser(userIsValid.id);

        if (user) {
          const newToken = await this.repository.createToken(user.id);

          return new userUcioInterface.VerifyTokenUseCaseResponse(
            user,
            newToken,
            null,
          );
        } else {
          return new userUcioInterface.VerifyTokenUseCaseResponse(
            null,
            null,
            newPreConditionalError(
              "Houve um erro com sua sessão, por favor, faça login novamente",
            ),
          );
        }
      } else {
        return new userUcioInterface.VerifyTokenUseCaseResponse(
          null,
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (err) {
      return new userUcioInterface.VerifyTokenUseCaseResponse(
        null,
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class UpdateUserUseCase {
  public validate: userValidateInterface.UpdateUserUseCaseValidate;
  public repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.UpdateUserUseCaseValidate(
      repository,
    );
    this.repository = repository;
  }

  async execute(
    req: userUcioInterface.UpdateUserUseCaseRequest,
  ): Promise<userUcioInterface.UpdateUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.repository.updateUser(req);

        return new userUcioInterface.UpdateUserUseCaseResponse(null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new userUcioInterface.UpdateUserUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new userUcioInterface.UpdateUserUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class GetUserUseCase {
  public validate: userValidateInterface.GetUserUseCaseValidate;
  public repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.GetUserUseCaseValidate();
    this.repository = repository;
  }

  async execute(
    req: userUcioInterface.GetUserUseCaseRequest,
  ): Promise<userUcioInterface.GetUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const user = await this.repository.getUser(req.id);

        if (user) {
          return new userUcioInterface.GetUserUseCaseResponse(user, null);
        } else {
          return new userUcioInterface.GetUserUseCaseResponse(
            user,
            newPreConditionalError("Usuário não encontrado"),
          );
        }
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new userUcioInterface.GetUserUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new userUcioInterface.GetUserUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class DeleteUserUseCase {
  public validate: userValidateInterface.DeleteUserUseCaseValidate;
  public repository: UserRepositoryInterface;

  constructor(repository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.DeleteUserUseCaseValidate(
      repository,
    );
    this.repository = repository;
  }

  async execute(
    req: userUcioInterface.DeleteUserUseCaseRequest,
  ): Promise<userUcioInterface.DeleteUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.repository.deleteUser(req);

        return new userUcioInterface.DeleteUserUseCaseResponse(null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new userUcioInterface.DeleteUserUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new userUcioInterface.DeleteUserUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

export {
  CreateUserUseCase,
  LoginUseCase,
  VerifyTokenUseCase,
  UpdateUserUseCase,
  GetUserUseCase,
  DeleteUserUseCase,
};
