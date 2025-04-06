import * as validate from "./validate/user";
import * as ucio from "./ucio/user";
import bcrypt from "bcryptjs";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  TAG_INTERNAL_SERVER_ERROR,
  TAG_PRE_CONDITIONAL_ERROR,
  newInternalServerError,
  newPreConditionalError,
} from "../entity/error";
import { UserRepositoryInterface } from "./repository/user";
import { AuthRepositoryInterface } from "./repository/auth";
const { genSaltSync, hashSync } = bcrypt;

class CreateUserUseCase {
  public validate: validate.CreateUserUseCaseValidate;
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new validate.CreateUserUseCaseValidate(userRepository);
    this.userRepository = userRepository;
  }

  async execute(
    req: ucio.CreateUserUseCaseRequest,
  ): Promise<ucio.CreateUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const salt = genSaltSync(11);
        const passwordEncrypt = hashSync(req.password, salt);
        req.password = passwordEncrypt;

        const userResp = await this.userRepository.createUser(req);

        return new ucio.CreateUserUseCaseResponse(userResp, null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new ucio.CreateUserUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new ucio.CreateUserUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class LoginUseCase {
  public validate: validate.LoginUseCaseValidate;
  public userRepository: UserRepositoryInterface;
  public authRepository: AuthRepositoryInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    authRepository: AuthRepositoryInterface,
  ) {
    this.validate = new validate.LoginUseCaseValidate();
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  async execute(
    req: ucio.LoginUseCaseRequest,
  ): Promise<ucio.LoginUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const userResp = await this.userRepository.login(req);

        if (userResp) {
          const token = this.authRepository.createToken(userResp.id);

          return new ucio.LoginUseCaseResponse(userResp, token, null);
        }

        console.log(
          `${TAG_PRE_CONDITIONAL_ERROR} E-mail e/ou Senha incorretos.`,
        );
        return new ucio.LoginUseCaseResponse(
          null,
          null,
          newPreConditionalError("E-mail e/ou Senha incorretos."),
        );
      }

      console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
      return new ucio.LoginUseCaseResponse(
        null,
        null,
        newPreConditionalError(messageError),
      );
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new ucio.LoginUseCaseResponse(
        null,
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class VerifyTokenUseCase {
  public validate: validate.VerifyTokenUseCaseValidate;
  public userRepository: UserRepositoryInterface;
  public authRepository: AuthRepositoryInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    authRepository: AuthRepositoryInterface,
  ) {
    this.validate = new validate.VerifyTokenUseCaseValidate();
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  async execute(
    req: ucio.VerifyTokenUseCaseRequest,
  ): Promise<ucio.VerifyTokenUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const userIsValid = await this.authRepository.verifyToken(req.token);

        if (typeof userIsValid === "string") {
          console.log(`${TAG_PRE_CONDITIONAL_ERROR} Sua sessão expirou`);
          return new ucio.VerifyTokenUseCaseResponse(
            null,
            null,
            newPreConditionalError("Sua sessão expirou"),
          );
        }

        const user = await this.userRepository.getUser(userIsValid.id);

        if (user) {
          const newToken = await this.authRepository.createToken(user.id);

          return new ucio.VerifyTokenUseCaseResponse(user, newToken, null);
        } else {
          console.log(
            `${TAG_PRE_CONDITIONAL_ERROR} Houve um erro com sua sessão, por favor, faça login novamente`,
          );
          return new ucio.VerifyTokenUseCaseResponse(
            null,
            null,
            newPreConditionalError(
              "Houve um erro com sua sessão, por favor, faça login novamente",
            ),
          );
        }
      } else {
        return new ucio.VerifyTokenUseCaseResponse(
          null,
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (err) {
      return new ucio.VerifyTokenUseCaseResponse(
        null,
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class UpdateUserUseCase {
  public validate: validate.UpdateUserUseCaseValidate;
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new validate.UpdateUserUseCaseValidate(userRepository);
    this.userRepository = userRepository;
  }

  async execute(
    req: ucio.UpdateUserUseCaseRequest,
  ): Promise<ucio.UpdateUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.userRepository.updateUser(req);

        return new ucio.UpdateUserUseCaseResponse(null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new ucio.UpdateUserUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new ucio.UpdateUserUseCaseResponse(
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class GetUserUseCase {
  public validate: validate.GetUserUseCaseValidate;
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new validate.GetUserUseCaseValidate();
    this.userRepository = userRepository;
  }

  async execute(
    req: ucio.GetUserUseCaseRequest,
  ): Promise<ucio.GetUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const user = await this.userRepository.getUser(req.id);

        if (user) {
          return new ucio.GetUserUseCaseResponse(user, null);
        } else {
          console.log(`${TAG_PRE_CONDITIONAL_ERROR} Usuário não encontrado`);
          return new ucio.GetUserUseCaseResponse(
            user,
            newPreConditionalError("Usuário não encontrado"),
          );
        }
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new ucio.GetUserUseCaseResponse(
          null,
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new ucio.GetUserUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

class DeleteUserUseCase {
  public validate: validate.DeleteUserUseCaseValidate;
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new validate.DeleteUserUseCaseValidate(userRepository);
    this.userRepository = userRepository;
  }

  async execute(
    req: ucio.DeleteUserUseCaseRequest,
  ): Promise<ucio.DeleteUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.userRepository.deleteUser(req);

        return new ucio.DeleteUserUseCaseResponse(null);
      } else {
        console.log(`${TAG_PRE_CONDITIONAL_ERROR} ${messageError}`);
        return new ucio.DeleteUserUseCaseResponse(
          newPreConditionalError(messageError),
        );
      }
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new ucio.DeleteUserUseCaseResponse(
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
