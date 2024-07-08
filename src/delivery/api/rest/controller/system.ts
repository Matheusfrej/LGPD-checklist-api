import * as systemUseCase from "@/domain/usecase/system";
import * as systemUcio from "@/domain/usecase/ucio/system";
import { Request, Response } from "express";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { SystemPrismaRepository } from "../../../../infrastructure/provider/repository/system";
import { UserPrismaRepository } from "../../../../infrastructure/provider/repository/user";

class CreateSystemController {
  async execute(req: Request, res: Response) {
    const { name, description, userId, tokenUserId } = req.body;

    const ucReq = new systemUcio.CreateSystemUseCaseRequest(
      name,
      description,
      userId,
      tokenUserId,
    );

    const systemRepository = new SystemPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const usecase = new systemUseCase.CreateSystemUseCase(
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

class ListSystemsByUserIdController {
  async execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new systemUcio.ListSystemsByUserIdUseCaseRequest(
      tokenUserId,
      +userId,
    );

    const systemRepository = new SystemPrismaRepository();
    const userRepository = new UserPrismaRepository();
    const usecase = new systemUseCase.ListSystemsByUserIdUseCase(
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

class GetSystemController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    const ucReq = new systemUcio.GetSystemUseCaseRequest(+id);

    const systemRepository = new SystemPrismaRepository();
    const usecase = new systemUseCase.GetSystemUseCase(systemRepository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { system: ucRes.system });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class DeleteSystemController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new systemUcio.DeleteSystemUseCaseRequest(+id, tokenUserId);

    const systemRepository = new SystemPrismaRepository();
    const usecase = new systemUseCase.DeleteSystemUseCase(systemRepository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class UpdateSystemController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId, name, description } = req.body;

    const ucReq = new systemUcio.UpdateSystemUseCaseRequest(
      +id,
      name,
      description,
      tokenUserId,
    );

    const systemRepository = new SystemPrismaRepository();
    const usecase = new systemUseCase.UpdateSystemUseCase(systemRepository);

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
