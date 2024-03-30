import {
  CreateUserUseCaseRequest,
  LoginUseCaseRequest,
  UpdateUserUseCaseRequest,
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

interface UpdateUserUseCaseValidateInterface {
  updateUser(req: UpdateUserUseCaseRequest): Promise<string>;
}

export {
  CreateUserUseCaseValidateInterface,
  LoginUseCaseValidateInterface,
  VerifyTokenUseCaseValidateInterface,
  UpdateUserUseCaseValidateInterface,
};
