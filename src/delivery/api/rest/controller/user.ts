import * as userUseCase from "@/domain/usecase/user";
import * as userUcio from "@/domain/usecase/ucio/user";
import * as userValidate from "@/infrastructure/provider/validate/user";
import * as userRepository from "@/infrastructure/provider/repository/user";
import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "../response/response";
import { Request, Response } from "express";

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

export { CreateUserController };
