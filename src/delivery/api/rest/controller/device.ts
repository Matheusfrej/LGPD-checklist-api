import { Request, Response } from "express";
import * as useCase from "@/domain/usecase/device";
import { Controller } from "./controller";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";

export class ListDevicesController extends Controller {
  async execute(req: Request, res: Response) {
    const deviceRepository = this.factory.makeDeviceRepository();
    const usecase = new useCase.ListDevicesUseCase(deviceRepository);
    const ucRes = await usecase.execute();

    if (!ucRes.error) {
      new SuccessResponse().success(res, { devices: ucRes.devices });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}
