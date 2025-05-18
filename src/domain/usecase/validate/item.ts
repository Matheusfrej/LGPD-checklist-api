import * as z from "zod";
import { validateWithZod, zodNumberSchema } from "./utils";
import { ValidateInterface } from ".";
import { ListItemsUseCaseRequest } from "../ucio/item";
import { LawRepositoryInterface } from "../repository/law";
import { DeviceRepositoryInterface } from "../repository/device";

export class ListItemsUseCaseValidate implements ValidateInterface {
  private lawRepository: LawRepositoryInterface;
  private deviceRepository: DeviceRepositoryInterface;
  private validationSchema = z.object({
    laws: zodNumberSchema("laws").array().nonempty({
      message: "Laws não pode ser um array vazio.",
    }),
    devices: zodNumberSchema("devices").array(),
  });

  constructor(
    lawRepository: LawRepositoryInterface,
    deviceRepository: DeviceRepositoryInterface,
  ) {
    this.lawRepository = lawRepository;
    this.deviceRepository = deviceRepository;
  }

  async validate(req: ListItemsUseCaseRequest): Promise<string | null> {
    return await validateWithZod(
      () => this.validationSchema.parse(req),
      async () => {
        const laws = await this.lawRepository.existByIds(req.laws);

        if (laws.length)
          return "Os seguintes ids de leis não existem: " + laws.join(", ");

        const devices = await this.deviceRepository.existByIds(req.devices);

        if (devices.length)
          return (
            "Os seguintes ids de dispositivos não existem: " +
            devices.join(", ")
          );

        return null;
      },
    );
  }
}
