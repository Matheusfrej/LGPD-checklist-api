import * as useCase from "@/domain/usecase/system";
import * as ucio from "@/domain/usecase/ucio/system";
import { Request, Response } from "express";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { Controller } from "./controller";

class CreateSystemController extends Controller {
  async execute(req: Request, res: Response) {
    const { name, description, userId, tokenUserId } = req.body;

    const ucReq = new ucio.CreateSystemUseCaseRequest(
      name,
      description,
      userId,
      tokenUserId,
    );

    const systemRepository = this.factory.makeSystemRepository();
    const userRepository = this.factory.makeUserRepository();
    const usecase = new useCase.CreateSystemUseCase(
      systemRepository,
      userRepository,
    );

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { system: ucRes.system });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class ListSystemsByUserIdController extends Controller {
  async execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new ucio.ListSystemsByUserIdUseCaseRequest(
      tokenUserId,
      +userId,
    );

    const systemRepository = this.factory.makeSystemRepository();
    const userRepository = this.factory.makeUserRepository();
    const usecase = new useCase.ListSystemsByUserIdUseCase(
      systemRepository,
      userRepository,
    );

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { systems: ucRes.systems });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class GetSystemController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    const ucReq = new ucio.GetSystemUseCaseRequest(+id);

    const systemRepository = this.factory.makeSystemRepository();
    const usecase = new useCase.GetSystemUseCase(systemRepository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { system: ucRes.system });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class DeleteSystemController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new ucio.DeleteSystemUseCaseRequest(+id, tokenUserId);

    const systemRepository = this.factory.makeSystemRepository();
    const usecase = new useCase.DeleteSystemUseCase(systemRepository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class UpdateSystemController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId, name, description } = req.body;

    const ucReq = new ucio.UpdateSystemUseCaseRequest(
      +id,
      name,
      description,
      tokenUserId,
    );

    const systemRepository = this.factory.makeSystemRepository();
    const usecase = new useCase.UpdateSystemUseCase(systemRepository);

    const ucRes = await usecase.execute(ucReq);

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
