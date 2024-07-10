/* eslint-disable @typescript-eslint/no-unused-vars */
import * as userUcio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../src/domain/entity/user";
import { compareSync } from "bcryptjs";
import { UserRepositoryInterface } from "../domain/usecase/repository/user";

class UserInMemoryRepository implements UserRepositoryInterface {
  public items: UserEntity[] = [];
  private counter = 0;

  async checkUserByEmailExists(email: string, id: number): Promise<boolean> {
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

  async getUser(id: number): Promise<UserEntity> {
    const user: UserEntity = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  updateUser(req: userUcio.UpdateUserUseCaseRequest): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }

  deleteUser(req: userUcio.DeleteUserUseCaseRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { UserInMemoryRepository };
