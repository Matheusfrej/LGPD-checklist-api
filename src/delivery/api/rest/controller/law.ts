import { Request, Response } from "express";
import * as useCase from "@/domain/usecase/law";
import { Controller } from "./controller";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";

export class ListLawsController extends Controller {
  async execute(req: Request, res: Response) {
    const lawRepository = this.factory.makeLawRepository();

    const usecase = new useCase.ListLawsUseCase(lawRepository);

    const ucRes = await usecase.execute();

    if (!ucRes.error) {
      new SuccessResponse().success(res, { laws: ucRes.laws });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}
