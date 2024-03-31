import { compareSync } from "bcryptjs";
import { UserEntity } from "../../../../domain/entity/user";
import {
  CreateUserUseCaseRequest,
  LoginUseCaseRequest,
  UpdateUserUseCaseRequest,
} from "../../../../domain/usecase/ucio/user";
import { prisma } from "../../connection/prisma";

async function createUser(data: CreateUserUseCaseRequest): Promise<UserEntity> {
  const user = await prisma.users.create({
    data: {
      name: data.name,
      office: data.office,
      email: data.email,
      password: data.password,
    },
  });

  return user
    ? new UserEntity(user.id, user.name, user.office, user.email, null)
    : null;
}

async function getUser(id: number): Promise<UserEntity> {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  return user
    ? new UserEntity(user.id, user.name, user.office, user.email, null)
    : null;
}

async function updateUser(req: UpdateUserUseCaseRequest): Promise<UserEntity> {
  const user = await prisma.users.update({
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

async function deleteUser(id: number): Promise<void> {
  await prisma.users.delete({
    where: {
      id,
    },
  });
}

async function checkUserByEmailExists(
  email: string,
  id: number,
): Promise<boolean> {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  return user && user.id !== id;
}

async function login(req: LoginUseCaseRequest): Promise<UserEntity> {
  const user = await prisma.users.findFirst({
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

export {
  createUser,
  checkUserByEmailExists,
  login,
  getUser,
  updateUser,
  deleteUser,
};
