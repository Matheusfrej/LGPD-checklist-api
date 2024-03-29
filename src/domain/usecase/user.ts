/* eslint-disable @typescript-eslint/no-explicit-any */
import * as userRepositoryInterface from "./repository/user";
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

class CreateUserUseCase {
  public validate: userValidateInterface.CreateUserUseCaseValidateInterface;
  public repository: userRepositoryInterface.CreateUserUseCaseRepositoryInterface;

  constructor(
    validate: userValidateInterface.CreateUserUseCaseValidateInterface,
    repository: userRepositoryInterface.CreateUserUseCaseRepositoryInterface,
  ) {
    this.validate = validate;
    this.repository = repository;
  }

  async createUser(
    req: userUcioInterface.CreateUserUseCaseRequest,
  ): Promise<userUcioInterface.CreateUserUseCaseResponse> {
    try {
      const messageError = await this.validate.createUser(req);

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
    } catch (error: any) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return new userUcioInterface.CreateUserUseCaseResponse(
        null,
        newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      );
    }
  }
}

export { CreateUserUseCase };
