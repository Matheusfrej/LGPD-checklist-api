import * as userService from "@/internal/database/postgresql/user";
import * as userInterface from "@/domain/usecase/repository/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../../domain/entity/user";
import { encrypt, verifyToken } from "../../internal/crypto/jwt/jwt";

class CreateUserUseCaseRepository
  implements userInterface.CreateUserUseCaseRepositoryInterface
{
  async createUser(
    user: userUcio.CreateUserUseCaseRequest,
  ): Promise<UserEntity> {
    return await userService.createUser(user);
  }
}

class LoginUseCaseRepository
  implements userInterface.LoginUseCaseRepositoryInterface
{
  async login(req: userUcio.LoginUseCaseRequest): Promise<UserEntity> {
    return await userService.login(req);
  }

  createToken(id: number): string {
    return encrypt(id);
  }
}

class VerifyTokenUseCaseRepository
  implements userInterface.VerifyTokenUseCaseRepositoryInterface
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verifyToken(token: string): any {
    return verifyToken(token);
  }

  createToken(id: number): string {
    return encrypt(id);
  }

  getUser(id: number): Promise<UserEntity> {
    return userService.getUser(id);
  }
}

export {
  CreateUserUseCaseRepository,
  LoginUseCaseRepository,
  VerifyTokenUseCaseRepository,
};
