import * as userInterface from "@/domain/usecase/repository/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../domain/entity/user";

class CreateUserUseCaseInMemoryRepository
  implements userInterface.CreateUserUseCaseRepositoryInterface
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
}

export { CreateUserUseCaseInMemoryRepository };
