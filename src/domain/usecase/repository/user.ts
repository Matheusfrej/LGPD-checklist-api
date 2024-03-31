import { UserEntity } from "../../entity/user";
import {
  CreateUserUseCaseRequest,
  DeleteUserUseCaseRequest,
  GetUserUseCaseRequest,
  LoginUseCaseRequest,
  UpdateUserUseCaseRequest,
} from "../ucio/user";

interface CreateUserUseCaseRepositoryInterface {
  createUser(req: CreateUserUseCaseRequest): Promise<UserEntity>;
}

interface LoginUseCaseRepositoryInterface {
  login(req: LoginUseCaseRequest): Promise<UserEntity>;

  createToken(id: number): string;
}

interface VerifyTokenUseCaseRepositoryInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verifyToken(token: string): any;

  createToken(id: number): string;

  getUser(id: number): Promise<UserEntity>;
}

interface UpdateUserUseCaseRepositoryInterface {
  updateUser(req: UpdateUserUseCaseRequest): Promise<UserEntity>;
}

interface GetUserUseCaseRepositoryInterface {
  getUser(req: GetUserUseCaseRequest): Promise<UserEntity>;
}

interface DeleteUserUseCaseRepositoryInterface {
  deleteUser(req: DeleteUserUseCaseRequest): Promise<void>;
}

export {
  CreateUserUseCaseRepositoryInterface,
  LoginUseCaseRepositoryInterface,
  VerifyTokenUseCaseRepositoryInterface,
  UpdateUserUseCaseRepositoryInterface,
  GetUserUseCaseRepositoryInterface,
  DeleteUserUseCaseRepositoryInterface,
};
