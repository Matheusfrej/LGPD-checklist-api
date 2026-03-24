import { PrismaClient } from "@prisma/client";
import { CreateSectionUseCaseRequest } from "../../src/domain/usecase/ucio/section";

export const createSection = async (
  prisma: PrismaClient,
  req: CreateSectionUseCaseRequest = {
    name: "Sobre transparência de Dados",
  },
) => {
  return await prisma.sections.create({
    data: {
      name: req.name,
    },
  });
};
