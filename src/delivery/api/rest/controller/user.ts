import * as useCase from "@/domain/usecase/user";
import * as ucio from "@/domain/usecase/ucio/user";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { NextFunction, Request, Response } from "express";
import { Controller } from "./controller";
import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";

class CreateUserController extends Controller {
  async execute(req: Request, res: Response) {
    const { name, office, email, password } = req.body;

    const ucReq: ucio.CreateUserUseCaseRequest = {
      name,
      office,
      email,
      password,
    };

    const repository = this.factory.makeUserRepository();
    const usecase = new useCase.CreateUserUseCase(repository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { user: ucRes.user });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class LoginController extends Controller {
  async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    const ucReq: ucio.LoginUseCaseRequest = {
      email,
      password,
    };

    const userRepository = this.factory.makeUserRepository();
    const authRepository = this.factory.makeAuthRepository();
    const usecase = new useCase.LoginUseCase(userRepository, authRepository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, {
        user: ucRes.user,
        token: ucRes.token,
      });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class VerifyTokenController extends Controller {
  private isMiddleware: boolean;

  constructor(isMiddleware: boolean, factory: RepositoryFactory) {
    super(factory);
    this.isMiddleware = isMiddleware;
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    const ucReq: ucio.VerifyTokenUseCaseRequest = {
      token,
    };

    const userRepository = this.factory.makeUserRepository();
    const authRepository = this.factory.makeAuthRepository();
    const usecase = new useCase.VerifyTokenUseCase(
      userRepository,
      authRepository,
    );

    const ucRes = await usecase.execute(ucReq);

    this.checkIfItIsMiddleware(req, res, next, ucRes);
  }

  checkIfItIsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
    ucRes: ucio.VerifyTokenUseCaseResponse,
  ) {
    if (this.isMiddleware) {
      if (!ucRes.error) {
        req.body.tokenUserId = ucRes.user.id;
        next();
      } else {
        new InternalServerErrorResponse().internalServerError(res, ucRes.error);
      }
    } else {
      if (!ucRes.error) {
        new SuccessResponse().success(res, {
          user: ucRes.user,
          token: ucRes.token,
        });
      } else {
        new InternalServerErrorResponse().internalServerError(res, ucRes.error);
      }
    }
  }
}

class UpdateUserController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId, name, office } = req.body;

    const ucReq: ucio.UpdateUserUseCaseRequest = {
      tokenUserId,
      id: +id,
      name,
      office,
    };
    /* 
    const ucReq = new ucio.UpdateUserUseCaseRequest(
      tokenUserId,
      +id,
      name,
      office,
    ); */

    const repository = this.factory.makeUserRepository();
    const usecase = new useCase.UpdateUserUseCase(repository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class GetUserController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    const ucReq: ucio.GetUserUseCaseRequest = { id: +id };

    const repository = this.factory.makeUserRepository();
    const usecase = new useCase.GetUserUseCase(repository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { user: ucRes.user });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class DeleteUserController extends Controller {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq: ucio.DeleteUserUseCaseRequest = {
      tokenUserId,
      id: +id,
    };

    const repository = this.factory.makeUserRepository();
    const usecase = new useCase.DeleteUserUseCase(repository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

export {
  CreateUserController,
  LoginController,
  VerifyTokenController,
  UpdateUserController,
  GetUserController,
  DeleteUserController,
};
