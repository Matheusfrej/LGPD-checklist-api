import * as userService from "@/internal/database/postgresql/user";
import * as userInterface from "@/domain/usecase/repository/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../../domain/entity/user";
import { encrypt, verifyToken } from "../../internal/crypto/jwt/jwt";

class CreateUserUseCaseRepository
  implements userInterface.CreateUserUseCaseRepositoryInterface
{
  async checkUserByEmailExists(email: string, id: number): Promise<boolean> {
    return await userService.checkUserByEmailExists(email, id);
  }

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

class UpdateUserUseCaseRepository
  implements userInterface.UpdateUserUseCaseRepositoryInterface
{
  async getUser(id: number): Promise<UserEntity> {
    return userService.getUser(id);
  }

  async updateUser(req: userUcio.UpdateUserUseCaseRequest) {
    return userService.updateUser(req);
  }
}

class GetUserUseCaseRepository
  implements userInterface.GetUserUseCaseRepositoryInterface
{
  getUser(req: userUcio.GetUserUseCaseRequest) {
    return userService.getUser(req.id);
  }
}

class DeleteUserUseCaseRepository
  implements userInterface.DeleteUserUseCaseRepositoryInterface
{
  async getUser(id: number): Promise<UserEntity> {
    return userService.getUser(id);
  }

  deleteUser(req: userUcio.DeleteUserUseCaseRequest) {
    return userService.deleteUser(req.id);
  }
}

export {
  CreateUserUseCaseRepository,
  LoginUseCaseRepository,
  VerifyTokenUseCaseRepository,
  UpdateUserUseCaseRepository,
  GetUserUseCaseRepository,
  DeleteUserUseCaseRepository,
};
