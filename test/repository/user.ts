import * as userUcio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../src/domain/entity/user";
import { compareSync } from "bcryptjs";
import { UserRepositoryInterface } from "../../src/domain/usecase/repository/user";

class UserInMemoryRepository implements UserRepositoryInterface {
  public items: UserEntity[] = [];
  private counter = 0;

  async checkUserByEmailExists(email: string, id?: number): Promise<boolean> {
    const user = this.items.find((item) => item.email === email);

    return user && user.id !== id;
  }

  async createUser(
    user: userUcio.CreateUserUseCaseRequest,
  ): Promise<UserEntity> {
    const newUser = new UserEntity(
      this.counter + 1,
      user.name,
      user.office,
      user.email,
      user.password,
    );
    this.counter += 1;

    this.items.push(newUser);

    return newUser;
  }

  async login(user: userUcio.LoginUseCaseRequest): Promise<UserEntity> {
    const userFound = this.items.find((item) => item.email === user.email);

    if (userFound && compareSync(user.password, userFound.password)) {
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

  async getUser(id: number): Promise<UserEntity> {
    const user: UserEntity = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async updateUser(
    req: userUcio.UpdateUserUseCaseRequest,
  ): Promise<UserEntity> {
    const index = this.items.findIndex((item) => item.id === req.id);

    if (index === -1) {
      return null;
    }

    this.items[index].name = req.name;
    this.items[index].office = req.office;

    return this.items[index];
  }

  async deleteUser(req: userUcio.DeleteUserUseCaseRequest): Promise<void> {
    this.items = this.items.filter((item) => item.id !== req.id);
  }
}

export { UserInMemoryRepository };
