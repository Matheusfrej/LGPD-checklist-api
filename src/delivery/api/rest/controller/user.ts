import * as userUseCase from "@/domain/usecase/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { NextFunction, Request, Response } from "express";
import { UserPrismaRepository } from "../../../../infrastructure/provider/repository/user";
import { AuthJWTRepository } from "../../../../infrastructure/provider/repository/auth";

class CreateUserController {
  async execute(req: Request, res: Response) {
    const { name, office, email, password } = req.body;

    const ucReq = new userUcio.CreateUserUseCaseRequest(
      name,
      office,
      email,
      password,
    );

    const repository = new UserPrismaRepository();
    const usecase = new userUseCase.CreateUserUseCase(repository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { user: ucRes.user });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class LoginController {
  async execute(req: Request, res: Response) {
    const { email, password } = req.body;

    const ucReq = new userUcio.LoginUseCaseRequest(email, password);

    const userRepository = new UserPrismaRepository();
    const authRepository = new AuthJWTRepository();
    const usecase = new userUseCase.LoginUseCase(
      userRepository,
      authRepository,
    );

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

class VerifyTokenController {
  private isMiddleware: boolean;

  constructor(isMiddleware: boolean) {
    this.isMiddleware = isMiddleware;
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    const ucReq = new userUcio.VerifyTokenUseCaseRequest(token);

    const userRepository = new UserPrismaRepository();
    const authRepository = new AuthJWTRepository();
    const usecase = new userUseCase.VerifyTokenUseCase(
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
    ucRes: userUcio.VerifyTokenUseCaseResponse,
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

class UpdateUserController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId, name, office } = req.body;

    const ucReq = new userUcio.UpdateUserUseCaseRequest(
      tokenUserId,
      +id,
      name,
      office,
    );

    const repository = new UserPrismaRepository();
    const usecase = new userUseCase.UpdateUserUseCase(repository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, undefined);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class GetUserController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    const ucReq = new userUcio.GetUserUseCaseRequest(+id);

    const repository = new UserPrismaRepository();
    const usecase = new userUseCase.GetUserUseCase(repository);

    const ucRes = await usecase.execute(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, { user: ucRes.user });
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class DeleteUserController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { tokenUserId } = req.body;

    const ucReq = new userUcio.DeleteUserUseCaseRequest(tokenUserId, +id);

    const repository = new UserPrismaRepository();
    const usecase = new userUseCase.DeleteUserUseCase(repository);

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
