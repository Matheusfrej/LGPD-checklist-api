import { Systems } from "@prisma/client";
import { SystemEntity } from "@/domain/entity/system";
import { prisma } from "../../connection/prisma";
import {
  CreateSystemUseCaseRequest,
  UpdateSystemUseCaseRequest,
} from "../../../../domain/usecase/ucio/system";

async function createSystem(
  req: CreateSystemUseCaseRequest,
): Promise<SystemEntity> {
  const system = await prisma.systems.create({
    data: {
      name: req.name,
      description: req.description,
      userId: req.userId,
    },
  });

  return new SystemEntity(
    system.id,
    system.name,
    system.description,
    system.userId,
  );
}

async function listSystemsByUserId(userId: number): Promise<SystemEntity[]> {
  const systems = await prisma.systems.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return systems.map(
    (system: Systems) =>
      new SystemEntity(
        system.id,
        system.name,
        system.description,
        system.userId,
      ),
  );
}

async function getSystem(id: number): Promise<SystemEntity> {
  const system = await prisma.systems.findUnique({
    where: {
      id,
    },
  });

  return system
    ? new SystemEntity(
        system.id,
        system.name,
        system.description,
        system.userId,
      )
    : null;
}

async function deleteSystem(id: number): Promise<void> {
  await prisma.systems.delete({
    where: {
      id,
    },
  });
}

async function updateSystem(req: UpdateSystemUseCaseRequest): Promise<void> {
  await prisma.systems.update({
    where: {
      id: req.id,
    },
    data: {
      name: req.name,
      description: req.description,
    },
  });
}

export {
  createSystem,
  getSystem,
  listSystemsByUserId,
  deleteSystem,
  updateSystem,
};
