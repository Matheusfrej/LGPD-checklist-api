import * as systemUseCase from "@/domain/usecase/system";
import * as systemUcio from "@/domain/usecase/ucio/system";
import * as systemValidate from "@/infrastructure/provider/validate/system";
import * as systemRepository from "@/infrastructure/provider/repository/system";
import { Request, Response } from "express";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";

class CreateSystemController {
  async createSystem(req: Request, res: Response) {
    const { name, description, userId, tokenUserId } = req.body;

    const ucReq = new systemUcio.CreateSystemUseCaseRequest(
      name,
      description,
      userId,
      tokenUserId,
    );

    const validate = new systemValidate.CreateSystemUseCaseValidate();
    const repository = new systemRepository.CreateSystemUseCaseRepository();
    const usecase = new systemUseCase.CreateSystemUseCase(validate, repository);

    const ucRes = await usecase.createSystem(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { system: ucRes.system });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class ListSystemsByUserIdController {
  async listSystemsByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new systemUcio.ListSystemsByUserIdUseCaseRequest(
      tokenUserId,
      +userId,
    );

    const validate = new systemValidate.ListSystemsByUserIdUseCaseValidate();
    const repository =
      new systemRepository.ListSystemsByUserIdUseCaseRepository();
    const usecase = new systemUseCase.ListSystemsByUserIdUseCase(
      validate,
      repository,
    );

    const ucRes = await usecase.listSystemsByUserId(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { systems: ucRes.systems });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class GetSystemController {
  async getSystem(req: Request, res: Response) {
    const { id } = req.params;

    const ucReq = new systemUcio.GetSystemUseCaseRequest(+id);

    const validate = new systemValidate.GetSystemUseCaseValidate();
    const repository = new systemRepository.GetSystemUseCaseRepository();
    const usecase = new systemUseCase.GetSystemUseCase(validate, repository);

    const ucRes = await usecase.getSystem(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { system: ucRes.system });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class DeleteSystemController {
  async deleteSystem(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new systemUcio.DeleteSystemUseCaseRequest(+id, tokenUserId);

    const validate = new systemValidate.DeleteSystemUseCaseValidate();
    const repository = new systemRepository.DeleteSystemUseCaseRepository();
    const usecase = new systemUseCase.DeleteSystemUseCase(validate, repository);

    const ucRes = await usecase.deleteSystem(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class UpdateSystemController {
  async updateSystem(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId, name, description } = req.body;

    const ucReq = new systemUcio.UpdateSystemUseCaseRequest(
      +id,
      name,
      description,
      tokenUserId,
    );

    const validate = new systemValidate.UpdateSystemUseCaseValidate();
    const repository = new systemRepository.UpdateSystemUseCaseRepository();
    const usecase = new systemUseCase.UpdateSystemUseCase(validate, repository);

    const ucRes = await usecase.updateSystem(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

export {
  CreateSystemController,
  ListSystemsByUserIdController,
  GetSystemController,
  DeleteSystemController,
  UpdateSystemController,
};
