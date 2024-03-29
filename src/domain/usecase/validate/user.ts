import {
  CreateUserUseCaseRequest,
  LoginUseCaseRequest,
  VerifyTokenUseCaseRequest,
} from "../ucio/user";

interface CreateUserUseCaseValidateInterface {
  createUser(user: CreateUserUseCaseRequest): Promise<string>;
}

interface LoginUseCaseValidateInterface {
  login(req: LoginUseCaseRequest): string;
}

interface VerifyTokenUseCaseValidateInterface {
  verifyToken(req: VerifyTokenUseCaseRequest): string;
}

export {
  CreateUserUseCaseValidateInterface,
  LoginUseCaseValidateInterface,
  VerifyTokenUseCaseValidateInterface,
};
