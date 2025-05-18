import { PrismaClient } from "@prisma/client";
import { CreateItemUseCaseRequest } from "../../src/domain/usecase/ucio/item";

export const createItem = async (
  prisma: PrismaClient,
  req: CreateItemUseCaseRequest = {
    code: "I-01",
    itemDesc: "itemDesc",
    recommendations: "recommendations",
    isMandatory: true,
    lawsIds: [1],
    devicesIds: [1],
  },
) => {
  return await prisma.items.create({
    data: {
      code: req.code,
      itemDesc: req.itemDesc,
      recommendations: req.recommendations,
      isMandatory: req.isMandatory,
      laws: {
        connect: req.lawsIds.map((id) => ({ id })),
      },
      devices: {
        connect: req.devicesIds.map((id) => ({ id })),
      },
    },
  });
};
