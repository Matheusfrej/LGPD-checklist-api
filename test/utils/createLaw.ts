import { PrismaClient } from "@prisma/client";
import { CreateLawUseCaseRequest } from "../../src/domain/usecase/ucio/law";

export const createLaw = async (
  prisma: PrismaClient,
  req: CreateLawUseCaseRequest = {
    name: "LGPD",
  },
) => {
  return await prisma.laws.create({
    data: {
      name: req.name,
    },
  });
};
