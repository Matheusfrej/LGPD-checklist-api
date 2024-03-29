import { UserEntity } from "../../../../domain/entity/user";
import { CreateUserUseCaseRequest } from "../../../../domain/usecase/ucio/user";
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

export { createUser, checkUserByEmailExists };
