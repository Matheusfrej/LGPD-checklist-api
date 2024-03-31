import {
  CreateUserUseCaseRequest,
  DeleteUserUseCaseRequest,
  GetUserUseCaseRequest,
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

interface GetUserUseCaseValidateInterface {
  getUser(req: GetUserUseCaseRequest): string;
}

interface DeleteUserUseCaseValidateInterface {
  deleteUser(req: DeleteUserUseCaseRequest): Promise<string>;
}

export {
  CreateUserUseCaseValidateInterface,
  LoginUseCaseValidateInterface,
  VerifyTokenUseCaseValidateInterface,
  UpdateUserUseCaseValidateInterface,
  GetUserUseCaseValidateInterface,
  DeleteUserUseCaseValidateInterface,
};
