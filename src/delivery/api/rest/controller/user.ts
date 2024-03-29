import * as userUseCase from "@/domain/usecase/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import * as userValidate from "@/infrastructure/provider/validate/user";
import * as userRepository from "@/infrastructure/provider/repository/user";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { NextFunction, Request, Response } from "express";

class CreateUserController {
  async createUser(req: Request, res: Response) {
    const { name, office, email, password } = req.body;

    const ucReq = new userUcio.CreateUserUseCaseRequest(
      name,
      office,
      email,
      password,
    );

    const validate = new userValidate.CreateUserUseCaseValidate();
    const repository = new userRepository.CreateUserUseCaseRepository();
    const usecase = new userUseCase.CreateUserUseCase(validate, repository);

    const ucRes = await usecase.createUser(ucReq);

    if (!ucRes.error) {
      new SuccessResponse().success(res, ucRes.user);
    } else {
      new InternalServerErrorResponse().internalServerError(res, ucRes.error);
    }
  }
}

class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const ucReq = new userUcio.LoginUseCaseRequest(email, password);

    const validate = new userValidate.LoginUseCaseValidate();
    const repository = new userRepository.LoginUseCaseRepository();
    const usecase = new userUseCase.LoginUseCase(validate, repository);

    const ucRes = await usecase.login(ucReq);

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

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    const ucReq = new userUcio.VerifyTokenUseCaseRequest(token);

    const validate = new userValidate.VerifyTokenUseCaseValidate();
    const repository = new userRepository.VerifyTokenUseCaseRepository();
    const usecase = new userUseCase.VerifyTokenUseCase(validate, repository);

    const ucRes = await usecase.verifyToken(ucReq);

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

export { CreateUserController, LoginController, VerifyTokenController };
