import {
  CreateUserUseCaseRepositoryInterface,
  DeleteUserUseCaseRepositoryInterface,
  UpdateUserUseCaseRepositoryInterface,
} from "../repository/user";
import {
  CreateUserUseCaseRequest,
  DeleteUserUseCaseRequest,
  GetUserUseCaseRequest,
  LoginUseCaseRequest,
  UpdateUserUseCaseRequest,
  VerifyTokenUseCaseRequest,
} from "../ucio/user";

interface CreateUserUseCaseValidateInterface {
  createUser(
    repository: CreateUserUseCaseRepositoryInterface,
    user: CreateUserUseCaseRequest,
  ): Promise<string>;
}

interface LoginUseCaseValidateInterface {
  login(req: LoginUseCaseRequest): string;
}

interface VerifyTokenUseCaseValidateInterface {
  verifyToken(req: VerifyTokenUseCaseRequest): string;
}

interface UpdateUserUseCaseValidateInterface {
  updateUser(
    repository: UpdateUserUseCaseRepositoryInterface,
    req: UpdateUserUseCaseRequest,
  ): Promise<string>;
}

interface GetUserUseCaseValidateInterface {
  getUser(req: GetUserUseCaseRequest): string;
}

interface DeleteUserUseCaseValidateInterface {
  deleteUser(
    repository: DeleteUserUseCaseRepositoryInterface,
    req: DeleteUserUseCaseRequest,
  ): Promise<string>;
}

export {
  CreateUserUseCaseValidateInterface,
  LoginUseCaseValidateInterface,
  VerifyTokenUseCaseValidateInterface,
  UpdateUserUseCaseValidateInterface,
  GetUserUseCaseValidateInterface,
  DeleteUserUseCaseValidateInterface,
};
