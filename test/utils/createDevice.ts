import { PrismaClient } from "@prisma/client";
import { CreateDeviceUseCaseRequest } from "../domain/usecase/ucio/device";

export const createDevice = async (
  prisma: PrismaClient,
  req: CreateDeviceUseCaseRequest = {
    name: "Sensor IoT",
  },
) => {
  return await prisma.devices.create({
    data: {
      name: req.name,
    },
  });
};
