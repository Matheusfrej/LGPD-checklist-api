import * as userInterface from "@/domain/usecase/repository/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../src/domain/entity/user";
import { compareSync } from "bcryptjs";

class UserInMemoryRepository
  implements
    userInterface.LoginUseCaseRepositoryInterface,
    userInterface.CreateUserUseCaseRepositoryInterface
{
  public items: UserEntity[] = [];
  private counter = 0;

  async checkUserByEmailExists(email: string, id: number): Promise<boolean> {
    const user = this.items.find((item) => item.email === email);

    return user && user.id !== id;
  }

  async createUser(
    user: userUcio.CreateUserUseCaseRequest,
  ): Promise<UserEntity> {
    const newUser: UserEntity = {
      id: this.counter + 1,
      name: user.name,
      email: user.email,
      office: user.office,
      password: user.password,
    };
    this.counter += 1;

    this.items.push(newUser);

    return newUser;
  }

  async login(user: userUcio.LoginUseCaseRequest): Promise<UserEntity> {
    const userFound = this.items.find((item) => item.email === user.email);

    if (userFound && compareSync(user.password, userFound.password)) {
      delete userFound.password;

      return userFound
        ? new UserEntity(
            userFound.id,
            userFound.name,
            userFound.office,
            userFound.email,
            null,
          )
        : null;
    }

    return null;
  }

  createToken(id: number): string {
    return `${id}`;
  }
}

export { UserInMemoryRepository };
