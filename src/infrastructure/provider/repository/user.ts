import * as userService from "@/internal/database/postgresql/user";
import * as ucio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../../domain/entity/user";
import { UserRepositoryInterface } from "../../../domain/usecase/repository/user";

class UserPrismaRepository implements UserRepositoryInterface {
  async checkUserByEmailExists(email: string, id?: number): Promise<boolean> {
    return await userService.checkUserByEmailExists(email, id);
  }

  async createUser(user: ucio.CreateUserUseCaseRequest): Promise<UserEntity> {
    return await userService.createUser(user);
  }

  async login(req: ucio.LoginUseCaseRequest): Promise<UserEntity> {
    return await userService.login(req);
  }

  getUser(id: number): Promise<UserEntity> {
    return userService.getUser(id);
  }

  async updateUser(req: ucio.UpdateUserUseCaseRequest) {
    return userService.updateUser(req);
  }

  deleteUser(req: ucio.DeleteUserUseCaseRequest) {
    return userService.deleteUser(req.id);
  }
}

export { UserPrismaRepository };
