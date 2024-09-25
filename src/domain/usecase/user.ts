import * as userValidateInterface from "./validate/user";
import * as userUcioInterface from "./ucio/user";
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
  public validate: userValidateInterface.CreateUserUseCaseValidate;
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.CreateUserUseCaseValidate(
      userRepository,
    );
    this.userRepository = userRepository;
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

        const userResp = await this.userRepository.createUser(req);

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
  public userRepository: UserRepositoryInterface;
  public authRepository: AuthRepositoryInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    authRepository: AuthRepositoryInterface,
  ) {
    this.validate = new userValidateInterface.LoginUseCaseValidate();
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  async execute(
    req: userUcioInterface.LoginUseCaseRequest,
  ): Promise<userUcioInterface.LoginUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const userResp = await this.userRepository.login(req);

        if (userResp) {
          const token = this.authRepository.createToken(userResp.id);

          return new userUcioInterface.LoginUseCaseResponse(
            userResp,
            token,
            null,
          );
        }

        console.log(
          `${TAG_PRE_CONDITIONAL_ERROR} E-mail e/ou Senha incorretos.`,
        );
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
  public userRepository: UserRepositoryInterface;
  public authRepository: AuthRepositoryInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    authRepository: AuthRepositoryInterface,
  ) {
    this.validate = new userValidateInterface.VerifyTokenUseCaseValidate();
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  async execute(
    req: userUcioInterface.VerifyTokenUseCaseRequest,
  ): Promise<userUcioInterface.VerifyTokenUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const userIsValid = await this.authRepository.verifyToken(req.token);

        if (typeof userIsValid === "string") {
          console.log(`${TAG_PRE_CONDITIONAL_ERROR} Sua sessão expirou`);
          return new userUcioInterface.VerifyTokenUseCaseResponse(
            null,
            null,
            newPreConditionalError("Sua sessão expirou"),
          );
        }

        const user = await this.userRepository.getUser(userIsValid.id);

        if (user) {
          const newToken = await this.authRepository.createToken(user.id);

          return new userUcioInterface.VerifyTokenUseCaseResponse(
            user,
            newToken,
            null,
          );
        } else {
          console.log(
            `${TAG_PRE_CONDITIONAL_ERROR} Houve um erro com sua sessão, por favor, faça login novamente`,
          );
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
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.UpdateUserUseCaseValidate(
      userRepository,
    );
    this.userRepository = userRepository;
  }

  async execute(
    req: userUcioInterface.UpdateUserUseCaseRequest,
  ): Promise<userUcioInterface.UpdateUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.userRepository.updateUser(req);

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
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.GetUserUseCaseValidate();
    this.userRepository = userRepository;
  }

  async execute(
    req: userUcioInterface.GetUserUseCaseRequest,
  ): Promise<userUcioInterface.GetUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        const user = await this.userRepository.getUser(req.id);

        if (user) {
          return new userUcioInterface.GetUserUseCaseResponse(user, null);
        } else {
          console.log(`${TAG_PRE_CONDITIONAL_ERROR} Usuário não encontrado`);
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
  public userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.validate = new userValidateInterface.DeleteUserUseCaseValidate(
      userRepository,
    );
    this.userRepository = userRepository;
  }

  async execute(
    req: userUcioInterface.DeleteUserUseCaseRequest,
  ): Promise<userUcioInterface.DeleteUserUseCaseResponse> {
    try {
      const messageError = await this.validate.validate(req);

      if (!messageError) {
        await this.userRepository.deleteUser(req);

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
