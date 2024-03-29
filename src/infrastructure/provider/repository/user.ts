import * as userService from "@/internal/database/postgresql/user";
import * as userInterface from "@/domain/usecase/repository/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../../domain/entity/user";

class CreateUserUseCaseRepository
  implements userInterface.CreateUserUseCaseRepositoryInterface
{
  async createUser(
    user: userUcio.CreateUserUseCaseRequest,
  ): Promise<UserEntity> {
    return await userService.createUser(user);
  }
}

export { CreateUserUseCaseRepository };
