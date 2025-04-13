import * as ucio from "@/domain/usecase/ucio/user";
import { UserEntity } from "../../../../domain/entity/user";
import { UserRepositoryInterface } from "../../../../domain/usecase/repository/user";
import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcryptjs";

class UserPrismaRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async checkUserByEmailExists(email: string, id?: number): Promise<boolean> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    return user && user.id !== id;
  }

  async createUser(req: ucio.CreateUserUseCaseRequest): Promise<UserEntity> {
    const user = await this.prisma.users.create({
      data: {
        name: req.name,
        office: req.office,
        email: req.email,
        password: req.password,
      },
    });

    return user
      ? new UserEntity(user.id, user.name, user.office, user.email, null)
      : null;
  }

  async login(req: ucio.LoginUseCaseRequest): Promise<UserEntity> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: req.email,
      },
    });

    if (user && compareSync(req.password, user.password)) {
      delete user.password;

      return user
        ? new UserEntity(user.id, user.name, user.office, user.email, null)
        : null;
    }

    return null;
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.prisma.users.findFirst({
      where: {
        id,
      },
    });

    return user
      ? new UserEntity(user.id, user.name, user.office, user.email, null)
      : null;
  }

  async updateUser(req: ucio.UpdateUserUseCaseRequest) {
    const user = await this.prisma.users.update({
      where: {
        id: req.id,
      },
      data: {
        name: req.name,
        office: req.office,
      },
    });

    return user
      ? new UserEntity(user.id, user.name, user.office, user.email, null)
      : null;
  }

  async deleteUser(req: ucio.DeleteUserUseCaseRequest) {
    await this.prisma.users.delete({
      where: {
        id: req.id,
      },
    });
  }
}

export { UserPrismaRepository };
